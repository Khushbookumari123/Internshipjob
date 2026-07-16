import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const API_URL = "http://localhost:8012/api";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_URL}/courses`);
        let data = res.data;
        // agar array ke andar array aa gaya to
        if(Array.isArray(data[0])) data = data[0]; 
        setCourses(data);
        console.log("Course Data:", data);
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    };
    fetchCourses();
  }, [location.key]);

  if(loading) return <p className="p-6">Loading...</p>

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Courses</h1>
          <p className="text-gray-600">Available courses offered by the college.</p>
        </div>
        <button 
          onClick={() => navigate('/add-course')}
          className="bg-indigo-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-indigo-700"
        >
          + Add Course
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.length === 0? (
          <p>No courses found.</p>
        ) : (
          courses.map((course, index) => ( // index ko key bana diya backup
            <div key={course.id || course.code || index} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
              <h2 className="text-xl font-bold text-indigo-600 mb-3">
                {course.name} 
              </h2>
              
              <p className="text-gray-700 mb-2">
                <span className="font-semibold">Course Code:</span> {course.code}
              </p>
              <p className="text-gray-700 mb-2">
                <span className="font-semibold">Instructor:</span> {course.instructor}
              </p>
              <p className="text-gray-700 mb-4">
                <span className="font-semibold">Duration:</span> {course.duration || 'N/A'}
              </p>

              <button className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition">
                View Details
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Courses;