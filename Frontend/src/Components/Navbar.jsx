import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-indigo-700 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold">
          Student Tracker
        </Link>

        <div className="flex gap-6 items-center">
          <Link to="/" className="hover:text-yellow-300 transition">
            Dashboard
          </Link>

          <Link to="/students" className="hover:text-yellow-300 transition">
            Students
          </Link>

          <Link to="/courses" className="hover:text-yellow-300 transition">
            Courses
          </Link>

          <Link to="/analytics" className="hover:text-yellow-300 transition">
            Analytics
          </Link>

          <Link to="/reports" className="hover:text-yellow-300 transition">
            Reports
          </Link>

          <Link
            to="/profile"
            className="bg-white text-indigo-700 px-3 py-1.5 rounded-full text-sm font-semibold hover:bg-gray-100 transition"
          >
            Profile
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;