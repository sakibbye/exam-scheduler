import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import TeacherComponent from './components/assign';
import ExamComponent from './components/form';
import Scheduler from './components/display';
import Layout from './components/layout';

function App() {
  return (
    <BrowserRouter>
      <Layout /> {/* Use the Layout component here */}
      <div className='container border border-primary rounded mt-5'>
        <Routes>
          <Route path='/teachers' element={<TeacherComponent />} />
          <Route path='/exams' element={<ExamComponent />} />
          <Route path='/schedule' element={<Scheduler />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
