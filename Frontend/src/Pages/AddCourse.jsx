import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // 1. axios import

const API_URL = "http://localhost:8012/api"; // 2. backend url

const AddCourse = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // 3. loading state
  const [formData, setFormData] = useState({
    courseCode: "",
    courseName: "",
    department: "",
    credits: "",
    faculty: "",
    duration: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.courseCode) newErrors.courseCode = "Course Code required";
    if (!formData.courseName) newErrors.courseName = "Course Name required";
    if (!formData.department) newErrors.department = "Department required";
    if (!formData.credits) newErrors.credits = "Credits required";
    if (!formData.faculty) newErrors.faculty = "Faculty required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => { // 4. async banaya
    e.preventDefault();
    if (validate()) {
      setLoading(true);
      try {
        const res = await axios.post(`${API_URL}/courses`, formData); // 5. API call
        console.log("Course Data:", res.data);
        alert("Course Added Successfully!");
        navigate("/courses");
      } catch (err) {
        alert(err.response?.data?.error || "Error adding course");
        console.log(err);
      }
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">+ Add New Course</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Course Code */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Course Code</label>
          <input
            type="text"
            name="courseCode"
            value={formData.courseCode}
            onChange={handleChange}
            placeholder="Ex: CS101"
            className="w-full border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
          />
          {errors.courseCode && <p className="text-red-500 text-xs mt-1">{errors.courseCode}</p>}
        </div>

        {/* Course Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Course Name</label>
          <input
            type="text"
            name="courseName"
            value={formData.courseName}
            onChange={handleChange}
            placeholder="Ex: Data Structures"
            className="w-full border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
          />
          {errors.courseName && <p className="text-red-500 text-xs mt-1">{errors.courseName}</p>}
        </div>

        {/* Department */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="w-full border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
          >
            <option value="">Select Department</option>
            <option value="CSE">Computer Science</option>
            <option value="ECE">Electronics</option>
            <option value="ME">Mechanical</option>
            <option value="CE">Civil</option>
          </select>
          {errors.department && <p className="text-red-500 text-xs mt-1">{errors.department}</p>}
        </div>

        {/* Credits */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Credits</label>
          <input
            type="number"
            name="credits"
            value={formData.credits}
            onChange={handleChange}
            placeholder="Ex: 4"
            className="w-full border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
          />
          {errors.credits && <p className="text-red-500 text-xs mt-1">{errors.credits}</p>}
        </div>

        {/* Faculty */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Faculty Incharge</label>
          <input
            type="text"
            name="faculty"
            value={formData.faculty}
            onChange={handleChange}
            placeholder="Ex: Dr. Sharma"
            className="w-full border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
          />
          {errors.faculty && <p className="text-red-500 text-xs mt-1">{errors.faculty}</p>}
        </div>

        {/* Duration */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
          <input
            type="text"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            placeholder="Ex: 1 Semester"
            className="w-full border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>

        {/* Buttons */}
        <div className="md:col-span-2 flex gap-4 mt-4">
          <button
            type="submit"
            disabled={loading} // 6. loading disable
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Course"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/courses")}
            className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg font-semibold hover:bg-gray-400 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCourse;