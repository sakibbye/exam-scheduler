import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import ExcelJS from "exceljs";


function TeacherSchedule() {
  const [exams, setExams] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [isTeacherView, setIsTeacherView] = useState(false);

  useEffect(() => {
    const storedExams = localStorage.getItem("exams");
    const storedTeachers = localStorage.getItem("teachers");
    if (storedExams && storedTeachers) {
      setExams(JSON.parse(storedExams));
      setTeachers(JSON.parse(storedTeachers));
    }
  }, []);

  function assignTeachers() {
    // sort exams by date
    const sortedExams = exams.sort((a, b) => {
      return a.date.localeCompare(b.date);
    });

    // make a copy of the teachers array
    let assignableTeachers = teachers.slice();

    // loop through each exam and assign teachers
    for (let i = 0; i < sortedExams.length; i++) {
      const exam = sortedExams[i];

      // assign teachers until there are <5 assignable teachers
      let assignedTeachers = [];
      while (assignedTeachers.length < 5 && assignableTeachers.length > 0) {
        const index = Math.floor(Math.random() * assignableTeachers.length);
        assignedTeachers.push(assignableTeachers[index]);
        assignableTeachers.splice(index, 1);
      }

      // if there are still <5 assigned teachers, replace assignableTeachers with the original array
      if (assignedTeachers.length < 5 || assignableTeachers.length < 5) {
        assignableTeachers = teachers.slice();
      }

      // add exam to the schedule with assigned teachers
      const scheduledExam = {
        name: exam.name,
        date: exam.date,
        time: exam.time,
        teachers: assignedTeachers,
      };
      setSchedule((prevSchedule) => [...prevSchedule, scheduledExam]);
    }
  }

  function handleExportExcel() {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Schedule");
  
    // add headers
    const headerRow = sheet.addRow(["Exam Name", "Date", "Time", "Teacher 1", "Teacher 2", "Teacher 3", "Teacher 4", "Teacher 5"]);
    headerRow.font = { bold: true };
    headerRow.eachCell((cell) => {
      cell.alignment = { vertical: "middle", horizontal: "center" };
      cell.border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };
    });
  
    // add data
    for (const exam of schedule) {
      const row = [exam.name, exam.date, exam.time];
      for (const teacher of exam.teachers) {
        row.push(teacher.name);
      }
      sheet.addRow(row).eachCell((cell) => {
        cell.border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };
      });
    }
  
    // adjust cell width
    sheet.columns.forEach((column) => {
      let maxLength = 0;
      column.eachCell((cell) => {
        const columnLength = cell.value ? cell.value.toString().length : 10;
        if (columnLength > maxLength) {
          maxLength = columnLength;
        }
      });
      column.width = maxLength < 10 ? 10 : maxLength + 2;
    });
  
    // download Excel file
    const filename = "Exam-schedule.xlsx";
    workbook.xlsx.writeBuffer().then((data) => {
      const blob = new Blob([data], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      link.click();
    });
  }
  

  function getAssignedExamsForTeacher(teacherName) {
    return schedule.filter((exam) => {
      return exam.teachers.some((teacher) => {
        return teacher.name === teacherName;
      });
    });
  }

  function handleExportTeachersExcel() {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Teachers");
  
    // add headers
    sheet.addRow(["Teacher Name", "Exams"]);
  
    // add data
    for (const teacher of teachers) {
      const exams = getAssignedExamsForTeacher(teacher.name).map((exam) => exam.name).join(", ");
      sheet.addRow([teacher.name, exams]).eachCell((cell) => {
        cell.border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };
      });;
    }
  
    // format headers and cells
    const headerRow = sheet.getRow(1);
    headerRow.eachCell((cell) => {
      cell.alignment = { vertical: "middle", horizontal: "center" };
      cell.border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };
    });
  
    sheet.getColumn(1).width = 40;
    sheet.getColumn(2).width = 60;
  
    sheet.eachRow((row) => {
      row.alignment = { vertical: "middle", horizontal: "left" };
      row.height = 18;
    });
  
    // download Excel file
    const filename = "teacher-schedule.xlsx";
    workbook.xlsx.writeBuffer().then((data) => {
      const blob = new Blob([data], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      link.click();
    });
  }
  
  function toggleView() {
    setIsTeacherView(!isTeacherView);
  }

  return (
    <div>
      <button className="m-5" onClick={assignTeachers}>Schedule</button>
      <button className="m-5" onClick={toggleView}>
        {isTeacherView ? "Exam View" : "Teachers View"}
      </button>
      <button className="m-5" onClick={handleExportExcel}>Download Exam Excel</button>
      <button className="m-5" onClick={handleExportTeachersExcel}>Download Teacher Excel</button>
      {isTeacherView ? (
        <ul>
          {teachers.map((teacher, index) => (
            <li key={index}>
              <h3>{teacher.name}</h3>
              <ul>
                {getAssignedExamsForTeacher(teacher.name).map((exam, index) => (
                  <li key={index}>
                    <h4>{exam.name}</h4>
                    <p>{exam.date}</p>
                    <p>{exam.time}</p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      ) : (
        <ul>
          {schedule.map((exam, index) => (
            <li key={index}>
              <h3>{exam.name}</h3>
              <p>{exam.date}</p>
              <p>{exam.time}</p>
              <ul>
                {exam.teachers.map((teacher, index) => (
                  <li key={index}>{teacher.name}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TeacherSchedule;
