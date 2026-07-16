const DashboardCard = ({ title, value, color, icon }) => {
  return (
    <div className={`rounded-2xl shadow-lg p-6 ${color} text-white hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer`}>
      
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold opacity-90">
          {title}
        </h3>
        {icon && <div className="text-3xl">{icon}</div>}
      </div>

      <h1 className="text-4xl font-extrabold">
        {value}
      </h1>

    </div>
  );
};

export default DashboardCard;