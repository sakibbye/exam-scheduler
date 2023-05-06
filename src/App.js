import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import TeacherComponent from './components/addTeachers';
import ExamComponent from './components/addExams';
import TeacherSchedule from './components/teacherExam';
import Home from './components/home';
import Layout from './components/layout';

function App() {
  return (
    <BrowserRouter>
      <Layout /> {/* Use the Layout component here */}
      <div className='container mt-5'>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/teachers' element={<TeacherComponent />} />
          <Route path='/exams' element={<ExamComponent />} />
          <Route path='/teacherschedule' element={<TeacherSchedule />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
