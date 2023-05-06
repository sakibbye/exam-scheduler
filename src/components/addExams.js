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
    <form onSubmit={handleSubmit} className="mb-3">
  <div className="mb-3">
    <label htmlFor="examName" className="form-label">Exam Name:</label>
    <input type="text" id="examName" value={examName} onChange={(e) => setExamName(e.target.value)} className="form-control" />
  </div>
  <div className="mb-3">
    <label htmlFor="examDate" className="form-label">Exam Date:</label>
    <input type="date" id="examDate" value={examDate} onChange={(e) => setExamDate(e.target.value)} className="form-control" />
  </div>
  <div className="mb-3">
    <label htmlFor="examTime" className="form-label">Exam Time:</label>
    <input type="time" id="examTime" value={examTime} onChange={(e) => setExamTime(e.target.value)} className="form-control" />
  </div>
  <button type="submit" className="btn btn-primary">Add Exam</button>
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
    
    <h2 className="mt-5">Exams</h2>
    <table className="table table-bordered table-hover">
      <thead>
        <tr>
          <th>Name</th>
          <th>Date</th>
          <th>Time</th>
        </tr>
      </thead>
      <tbody>
        {exams.map((exam, index) => (
          <tr key={index}>
            <td>{exam.name}</td>
            <td>{exam.date}</td>
            <td>{exam.time}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  
  );
}

export default ExamComponent;
