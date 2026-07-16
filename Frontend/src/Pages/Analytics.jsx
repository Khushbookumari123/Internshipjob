const Analytics = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Analytics</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-2">Cohort GPA</h2>
          <p className="text-2xl font-bold">3.37</p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-2">Avg Attendance</h2>
          <p className="text-2xl font-bold">78%</p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-2">Top Score</h2>
          <p className="text-2xl font-bold">97.9%</p>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
