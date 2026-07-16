import SearchBar from "../Components/SearchBar";
import StudentTable from "../Components/StudentTable";
import { useEffect, useState } from "react";
import { fetchStudents } from "../api/api";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    fetchStudents()
      .then((data) => {
        if (mounted) setStudents(data);
      })
      .catch((err) => {
        if (mounted) setError(err.message);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => (mounted = false);
  }, []);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">

      <h1 className="text-3xl font-bold mb-6">Students</h1>

      <div className="mb-5">
        <SearchBar />
      </div>

      {loading && <p>Loading students...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && !error && <StudentTable students={students} />}

    </div>
  );
};

export default Students;
