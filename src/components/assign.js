import React, { useState } from 'react';

function AddTeacherForm({ handleAddTeacher }) {
  const [teacherName, setTeacherName] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    handleAddTeacher({ name: teacherName });
    setTeacherName('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="teacherName">Teacher Name:</label>
        <input type="text" id="teacherName" value={teacherName} onChange={(e) => setTeacherName(e.target.value)} />
      </div>
      <button type="submit">Add Teacher</button>
    </form>
  );
}

function TeacherComponent() {
  const [teachers, setTeachers] = useState(() => {
    const storedTeachers = localStorage.getItem('teachers');
    console.log(JSON.parse(storedTeachers))
    return storedTeachers ? JSON.parse(storedTeachers) : [];
  });

  const handleAddTeacher = (teacher) => {
    setTeachers((prevTeachers) => [...prevTeachers, teacher]);
  };

  React.useEffect(() => {
    localStorage.setItem('teachers', JSON.stringify(teachers));
  }, [teachers]);

  return (
    <div>
      <h2>Add Teacher</h2>
      <AddTeacherForm handleAddTeacher={handleAddTeacher} />
      <h2>Teachers</h2>
      <ul>
        {teachers.map((teacher, index) => (
          <li key={index}>
            <div>Name: {teacher.name}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TeacherComponent;
