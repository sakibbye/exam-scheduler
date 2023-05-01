import React, { useEffect, useState } from 'react';

function Scheduler() {
  const [teachers, setTeachers] = useState([]);
  const [exams, setExams] = useState([]);

  useEffect(() => {
    // Get teacher and exam data from local storage
    const storedTeachers = JSON.parse(localStorage.getItem('teachers'));
    const storedExams = JSON.parse(localStorage.getItem('exams'));

    if (storedTeachers && Array.isArray(storedTeachers)) {
      setTeachers(storedTeachers);
    }

    if (storedExams && Array.isArray(storedExams)) {
      setExams(storedExams);
    }
  }, []);

  const assignInvigilators = () => {
    const invigilators = {};
    const teacherDuties = {};
  
    // Initialize teacherDuties object with 0 duties for each teacher
    for (const teacher of teachers) {
      teacherDuties[teacher.id] = 0;
    }
  
    // Iterate over each exam and assign invigilators
    for (const exam of exams) {
      let assigned = 0;
      invigilators[exam.name] = [];
  
      // Iterate over teachers and assign to exam
      for (const teacher of teachers) {
        const hasOverlappingDuties = invigilators[exam.name].some(
          (assignedTeacher) =>
            assignedTeacher.dutyDate === exam.date && assignedTeacher.dutyTime === exam.time
        );
  
        if (!hasOverlappingDuties && teacherDuties[teacher.id] < Math.ceil(exams.length / teachers.length)) {
          invigilators[exam.name].push({ teacher: teacher.name, dutyDate: exam.date, dutyTime: exam.time });
          assigned++;
          teacherDuties[teacher.id]++;
        }
  
        if (assigned >= 5) {
          break;
        }
      }
    }
  
    return invigilators;
  };
  

  const handleSchedule = () => {
    const invigilators = assignInvigilators();
    const invigilatorList = [];
  
    for (const examName in invigilators) {
      const examInvigilators = invigilators[examName];
  
      invigilatorList.push(
        <li key={examName}>
          <h3>{examName}</h3>
          <ul>
            {examInvigilators.map((invigilator, index) => (
              <li key={index}>
                {invigilator.teacher} - {invigilator.dutyDate}, {invigilator.dutyTime}
              </li>
            ))}
          </ul>
        </li>
      );
    }
  
    return (
      <div>
        <h2>Invigilators</h2>
        <ul>{invigilatorList}</ul>
      </div>
    );
  };

  return (
    <div>
      <h2>Scheduler</h2>
      {handleSchedule()}
    </div>
  );
}

export default Scheduler;
