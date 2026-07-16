import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api"; // apna backend URL

const MarkAttendance = () => {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [course, setCourse] = useState("");
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [loading, setLoading] = useState(false);

  // Courses load karo
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get(`${API_URL}/courses`);
        setCourses(res.data);
        if(res.data.length > 0) setCourse(res.data[0]._id);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCourses();
  }, []);

  // Course ya Date change hone par students + old attendance load
  useEffect(() => {
    if(!course) return;
    const fetchData = async () => {
      setLoading(true);
      try {
        const [stuRes, attRes] = await Promise.all([
          axios.get(`${API_URL}/students?course=${course}`),
          axios.get(`${API_URL}/attendance?date=${date}&course=${course}`)
        ]);
        setStudents(stuRes.data);
        setAttendance(attRes.data || {});
      } catch (err) {
        console.log(err);
        setStudents([]);
      }
      setLoading(false);
    };
    fetchData();
  }, [course, date]);

  const markAttendance = (studentId, status) => {
    setAttendance({...attendance, [studentId]: status });
  };

  const handleSubmit = async () => {
    try {
      await axios.post(`${API_URL}/attendance`, { date, course, attendance });
      alert("Attendance Saved Successfully!");
    } catch (err) {
      alert("Error saving attendance");
      console.log(err);
    }
  };

  const presentCount = Object.values(attendance).filter(s => s === 'present').length;
  const absentCount = Object.values(attendance).filter(s => s === 'absent').length;

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white p-6 rounded-2xl shadow-lg mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Mark Attendance</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Course</label>
            <select
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              className="w-full border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
            >
              {courses.map(c => (
                <option key={c._id} value={c._id}>{c.courseCode} - {c.courseName}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex gap-4 mb-4">
          <div className="bg-green-100 text-green-700 px-4 py-2 rounded-lg font-semibold">Present: {presentCount}</div>
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded-lg font-semibold">Absent: {absentCount}</div>
          <div className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-semibold">Total: {students.length}</div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Student List</h2>

        {loading? <p>Loading...</p> : (
          <div className="space-y-3">
            {students.length === 0? <p className="text-gray-500">No students in this course</p> :
              students.map((student) => (
                <div key={student._id} className="flex items-center justify-between border-b pb-3">
                  <div>
                    <p className="font-semibold text-gray-800">{student.name}</p>
                    <p className="text-sm text-gray-500">Roll: {student.rollNo}</p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => markAttendance(student._id, 'present')}
                      className={`px-4 py-2 rounded-lg font-semibold transition ${
                        attendance[student._id] === 'present'? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-green-100'
                      }`}
                    >
                      Present
                    </button>
                    <button
                      onClick={() => markAttendance(student._id, 'absent')}
                      className={`px-4 py-2 rounded-lg font-semibold transition ${
                        attendance[student._id] === 'absent'? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-red-100'
                      }`}
                    >
                      Absent
                    </button>
                  </div>
                </div>
              ))
            }
          </div>
        )}

        <button
          onClick={handleSubmit}
          className="w-full mt-6 bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
        >
          Save Attendance
        </button>
      </div>
    </div>
  );
};

export default MarkAttendance;