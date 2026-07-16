const StudentTable = ({ students = [] }) => {
  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow">

      <table className="w-full">

        <thead className="bg-indigo-600 text-white">

          <tr>

            <th className="p-3">ID</th>
            <th>Name</th>
            <th>Department</th>
            <th>Roll</th>

          </tr>

        </thead>

        <tbody>
          {students.length === 0 && (
            <tr>
              <td colSpan={4} className="p-4 text-center text-gray-500">
                No students found.
              </td>
            </tr>
          )}

          {students.map((s) => (
            <tr key={s.id} className="text-center border-b">
              <td className="p-4">{s.id}</td>
              <td>{s.name}</td>
              <td>{s.department}</td>
              <td>{s.roll || '-'}</td>
            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
};

export default StudentTable;