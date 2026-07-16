import DashboardCard from "../components/DashboardCard";
import { useNavigate } from "react-router-dom"; 


const Dashboard = () => {
    const navigate = useNavigate(); // <-- ye hook

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6 md:p-10">
      
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Dashboard
        </h1>
        <p className="text-slate-500 mt-2">Welcome back! Here's what's happening today</p>
      </div>

      {/* Stats Cards */}
      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 mb-10">
        <DashboardCard 
          title="Students" 
          value="04" 
          color="bg-gradient-to-br from-blue-500 to-blue-600" 
          icon="👨‍🎓"
        />
        <DashboardCard 
          title="Faculty" 
          value="85" 
          color="bg-gradient-to-br from-green-500 to-emerald-600" 
          icon="👩‍🏫"
        />
        <DashboardCard 
          title="Attendance" 
          value="92%" 
          color="bg-gradient-to-br from-yellow-500 to-orange-500" 
          icon="📊"
        />
        <DashboardCard 
          title="Departments" 
          value="10" 
          color="bg-gradient-to-br from-pink-500 to-rose-600" 
          icon="🏛️"
        />
      </div>

      {/* Quick Actions Section */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <button  onClick={() => navigate('/add-student')}  
 className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-xl transition">
            + Add Student
          </button>
          <button  onClick={() => navigate('/add-course')}  
 className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-xl transition">
            + Add Course
          </button>
          <button  onClick={() => navigate('/mark-attendance')} 
 className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 px-4 rounded-xl transition">
            Mark Attendance
          </button>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;