import React, { useState } from 'react';

function AddExamForm({ handleAddExam }) {
  const [examName, setExamName] = useState('');
  const [examDate, setExamDate] = useState('');
  const [examTime, setExamTime] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    handleAddExam({
      name: examName,
      date: examDate,
      time: examTime,
    });
    setExamName('');
    setExamDate('');
    setExamTime('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="examName">Exam Name:</label>
        <input type="text" id="examName" value={examName} onChange={(e) => setExamName(e.target.value)} />
      </div>
      <div>
        <label htmlFor="examDate">Exam Date:</label>
        <input type="date" id="examDate" value={examDate} onChange={(e) => setExamDate(e.target.value)} />
      </div>
      <div>
        <label htmlFor="examTime">Exam Time:</label>
        <input type="time" id="examTime" value={examTime} onChange={(e) => setExamTime(e.target.value)} />
      </div>
      <button type="submit">Add Exam</button>
    </form>
  );
}

function ExamComponent() {
  const [exams, setExams] = useState(() => {
    const storedExams = localStorage.getItem('exams');
    return storedExams ? JSON.parse(storedExams) : [];
  });

  const handleAddExam = (exam) => {
    setExams((prevExams) => [...prevExams, exam]);
  };

  React.useEffect(() => {
    localStorage.setItem('exams', JSON.stringify(exams));
  }, [exams]);

  return (
    <div>
      <h2>Add Exam</h2>
      <AddExamForm handleAddExam={handleAddExam} />
      <h2>Exams</h2>
      <ul>
        {exams.map((exam, index) => (
          <li key={index}>
            <div>Name: {exam.name}</div>
            <div>Date: {exam.date}</div>
            <div>Time: {exam.time}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExamComponent;
