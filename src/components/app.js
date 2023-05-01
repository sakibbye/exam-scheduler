import React, { useState } from 'react';
//import './App.css';
import Display from './display';

function Exam() {
  const [teachers, setTeachers] = useState('');
  const [dates, setDates] = useState('');
  const [times, setTimes] = useState('');
  const [assignments, setAssignments] = useState([]);

  const handleTeachersChange = (e) => {
    setTeachers(e.target.value);
  };

  const handleDatesChange = (e) => {
    setDates(e.target.value);
  };

  const handleTimesChange = (e) => {
    setTimes(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const teacherList = teachers.split(',').map((teacher) => teacher.trim());
    const dateList = dates.split(',').map((date) => date.trim());
    const timeList = times.split(',').map((time) => time.trim());

    const examCount = dateList.length;
    const invigilatorCount = teacherList.length;
    const invigilatorAssignmentCounts = new Array(invigilatorCount).fill(0);
    const assignments = [];

    for (let i = 0; i < examCount; i++) {
      const examInvigilators = [];
      const usedInvigilators = new Set();

      while (examInvigilators.length < 5) {
        const randomIndex = Math.floor(Math.random() * invigilatorCount);
        const randomInvigilator = teacherList[randomIndex];

        if (
          !usedInvigilators.has(randomInvigilator) &&
          invigilatorAssignmentCounts[randomIndex] < examCount / invigilatorCount + 2
        ) {
          examInvigilators.push(randomInvigilator);
          usedInvigilators.add(randomInvigilator);
          invigilatorAssignmentCounts[randomIndex]++;
        }
      }

      assignments.push({
        id: i,
        date: dateList[i],
        time: timeList[i],
        invigilators: examInvigilators,
      });
    }

    setAssignments(assignments);
  };

  return (
    <div className="App">
      <h1>Exam Invigilation Assignment Generator</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="handleTeachersChange">Enter Teacher Names (separated by commas):</label>
          <input type="text" value={teachers} onChange={handleTeachersChange} />
        </div>
        <div>
          <label htmlFor="handleDatesChange">Enter Exam Dates (separated by commas):</label>
          <input type="text" value={dates} onChange={handleDatesChange} />
        </div>
        <div>
          <label htmlFor="handleTimesChange">Enter Exam Times (separated by commas):</label>
          <input type="text" value={times} onChange={handleTimesChange} />
        </div>
        <button type="submit">Generate Assignments</button>
      </form>
      <Display assignments={assignments} />
    </div>
  );
}

export default Exam;
