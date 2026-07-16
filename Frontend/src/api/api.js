const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000';

export async function fetchStudents() {
  const res = await fetch(`${API_BASE}/api/students`);
  if (!res.ok) throw new Error('Failed to fetch students');
  return res.json();
}

export async function fetchCourses() {
  const res = await fetch(`${API_BASE}/api/courses`);
  if (!res.ok) throw new Error('Failed to fetch courses');
  return res.json();
}
