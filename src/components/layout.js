import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav>
        <ul className="menu container">
          <li>
            <Link to="/exam-scheduler">Home</Link>
          </li>
          <li>
            <Link to="/exam-scheduler/teachers"> Teachers</Link>
          </li>
          <li>
            <Link to="/exam-scheduler/exams">Exams</Link>
          </li>
          <li>
            <Link to="/exam-scheduler/teacherschedule">Teacher Schedule</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;
