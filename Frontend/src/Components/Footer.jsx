import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-gray-300 border-t border-slate-800 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-white">
            Student Tracking Platform
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            Manage students, attendance, marks, and academic records efficiently.
          </p>
        </div>

        <div className="flex gap-6 text-sm">
          <Link to="/" className="hover:text-indigo-400 transition">
            Home
          </Link>
          <Link to="/students" className="hover:text-indigo-400 transition">
            Students
          </Link>
          <Link to="/attendance" className="hover:text-indigo-400 transition">
            Attendance
          </Link>
          <Link to="/reports" className="hover:text-indigo-400 transition">
            Reports
          </Link>
        </div>

        <div className="text-sm text-gray-400 text-center md:text-right">
          <p>© {new Date().getFullYear()} Student Tracking Platform</p>
          <p>All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;