import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./Pages/Dashboard";
import Students from "./Pages/Students";
import Attendance from "./Pages/Attendance";
import Marks from "./Pages/Marks";
import Reports from "./Pages/Reports";
import Profile from "./Pages/Profile";
import Login from "./Pages/Login";
import Courses from "./Pages/Courses";
import Gradebook from "./Pages/Gradebook";
import Analytics from "./Pages/Analytics";
import AddStudent from "./pages/AddStudent"; 
import AddCourse from "./pages/AddCourse";
import MarkAttendance from "./pages/MarkAttendance"; 



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/students" element={<Students />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/gradebook" element={<Gradebook />} />
          <Route path="/analytics" element={<Analytics />} />
                    <Route path="/attendance" element={<MarkAttendance />} /> {/* <-- yaha connect hai */}

          <Route path="/mark-attendance" element={<MarkAttendance />} />
          <Route path="/marks" element={<Marks />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/add-student" element={<AddStudent />} />
          <Route path="/add-course" element={<AddCourse />} />


        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;