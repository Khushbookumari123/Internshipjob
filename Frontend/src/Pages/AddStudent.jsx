import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:8012/api"; //  backend URL

const AddStudent = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    roll: "",
    email: "",
    course: "",
    phone: "",
    department: ""
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let newErrors = {};
    if(!formData.name) newErrors.name = "Name required";
    if(!formData.roll) newErrors.roll = "Roll no required";
    if(!formData.email) newErrors.email = "Email required";
    else if(!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email invalid";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if(!validate()) return;

    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/students`, formData);
      console.log("Student Added:", res.data);
      alert("Student Added Successfully!");
      navigate('/students'); // submit ke baad student list pe
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Error adding student");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6 md:p-10">
      
      {/* Header with Back Button */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-800">Add New Student</h1>
          <p className="text-slate-500 mt-1">Fill the details to register a student</p>
        </div>
        <button 
          onClick={() => navigate('/students')}
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold px-5 py-2 rounded-xl transition"
        >
          ← Back to Students
        </button>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-3xl">
        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
          
          {/* Name */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Full Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter student name"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          {/* Roll No */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Roll Number *</label>
            <input
              type="text"
              name="roll"
              value={formData.roll}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. 21CS001"
            />
            {errors.roll && <p className="text-red-500 text-sm mt-1">{errors.roll}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="student@email.com"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="9876543210"
            />
          </div>

          {/* Department */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Department</label>
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Department</option>
              <option value="CSE">Computer Science</option>
              <option value="IT">Information Technology</option>
              <option value="ECE">Electronics</option>
              <option value="ME">Mechanical</option>
            </select>
          </div>

          {/* Course */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Course</label>
            <input
              type="text"
              name="course"
              value={formData.course}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. B.Tech CSE"
            />
          </div>

          {/* Submit Button - Full Width */}
          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Saving..." : "+ Save Student"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddStudent;