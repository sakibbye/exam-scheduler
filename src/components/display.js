import React, { useState } from "react";

function Scheduler() {
  const [exams, setExams] = useState(() => {
    const storedExams = localStorage.getItem("exams");
    return storedExams ? JSON.parse(storedExams) : [];
  });

  const [teachers, setTeachers] = useState(() => {
    const storedTeachers = localStorage.getItem("teachers");
    return storedTeachers ? JSON.parse(storedTeachers) : [];
  });

  const [schedule, setSchedule] = useState([]);

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const scheduleExams = () => {
    const teacherList = JSON.parse(localStorage.getItem("teachers"));
    const examList = exams.slice();

    // Shuffle the exam list
    shuffle(examList);

    // Divide the teacher list into groups of 5
    const teacherGroups = [];
    while (teacherList.length > 0) {
      teacherGroups.push(teacherList.splice(0, 5));
    }

    // Shuffle the teacher groups
    shuffle(teacherGroups);

    // Assign teachers to exams
    const examSchedule = examList.map((exam) => {
      const teachers = [];
      for (let i = 0; i < 5; i++) {
        const teacherGroup = teacherGroups[i % teacherGroups.length];
        const teacherIndex = Math.floor(Math.random() * teacherGroup.length);
        const teacher = teacherGroup[teacherIndex];
        teachers.push(teacher);
      }
      return { exam, teachers };
    });

    setSchedule(examSchedule);
  };

  return (
    <div>
      <h2>Scheduler</h2>
      <button onClick={scheduleExams}>Schedule</button>
      <ul>
        {schedule.map(({ exam, teachers }, index) => (
          <li key={index}>
            <div>Exam: {exam.name}</div>
            <div>Date: {exam.date}</div>
            <div>Time: {exam.time}</div>
            <div>
              Invigilators:{" "}
              {teachers.map((teacher) => teacher.name).join(", ")}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};


export default Scheduler;
