import { NavLink } from "react-router-dom";
import { 
  FaTachometerAlt, 
  FaUserGraduate, 
  FaBook, 
  FaClipboardCheck, 
  FaChartBar, 
  FaFileAlt,
  FaChalkboardTeacher 
} from "react-icons/fa"; // <-- ye line important hai

const menuItems = [
  { label: "Dashboard", path: "/", icon: <FaTachometerAlt /> },
  { label: "Students", path: "/students", icon: <FaUserGraduate /> },
  { label: "Courses", path: "/courses", icon: <FaBook /> },
  { label: "Attendance", path: "/attendance", icon: <FaClipboardCheck /> },
  { label: "Gradebook", path: "/gradebook", icon: <FaChalkboardTeacher /> },
  { label: "Analytics", path: "/analytics", icon: <FaChartBar /> },
  { label: "Reports", path: "/reports", icon: <FaFileAlt /> },
];

const Sidebar = () => {
  return (
    <aside className="bg-slate-900 text-white w-64 min-h-screen p-5">
      <h2 className="text-xl font-bold mb-8">Menu</h2>

      <ul className="space-y-2">
        {menuItems.map((item) => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-3 transition-all ${
                  isActive ? "bg-indigo-600 text-white" : "hover:bg-slate-700 text-gray-300"
                }`
              }
            >
              {item.icon}  {/* <-- yaha direct icon daal diya */}
              <span className="font-medium">{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;