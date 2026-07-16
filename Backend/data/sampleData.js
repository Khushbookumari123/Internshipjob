const students = [
  { id: 1, name: 'Rahul Kumar', department: 'Computer Science', roll: 'CS101' },
  { id: 2, name: 'Anita Sharma', department: 'Mathematics', roll: 'MA201' },
  { id: 3, name: 'Vikram Singh', department: 'Physics', roll: 'PH301' }
];

const attendance = [
  { studentId: 1, month: 'June', percent: 92 },
  { studentId: 2, month: 'June', percent: 88 },
  { studentId: 3, month: 'June', percent: 95 }
];

const marks = [
  { studentId: 1, subject: 'Math', marks: 88 },
  { studentId: 2, subject: 'Math', marks: 91 },
  { studentId: 3, subject: 'Math', marks: 85 }
];

const reports = [
  { id: 1, title: 'Monthly Attendance', description: 'Summary for June' }
];

const profile = { id: 1, name: 'Rahul Kumar', email: 'rahul@example.com', department: 'Computer Science' };

const courses = [
  { id: 1, name: 'Computer Science Engineering', code: 'CSE101', instructor: 'Dr. Amit Sharma', duration: '4 Years' },
  { id: 2, name: 'Information Technology', code: 'IT102', instructor: 'Prof. Neha Verma', duration: '4 Years' },
  { id: 3, name: 'Electronics & Communication', code: 'ECE103', instructor: 'Dr. Rajesh Kumar', duration: '4 Years' },
  { id: 4, name: 'Mechanical Engineering', code: 'ME104', instructor: 'Prof. Ankit Singh', duration: '4 Years' },
  { id: 5, name: 'Civil Engineering', code: 'CE105', instructor: 'Dr. Priya Sharma', duration: '4 Years' },
  { id: 6, name: 'Bachelor of Computer Applications', code: 'BCA106', instructor: 'Prof. Ravi Mishra', duration: '3 Years' }
];

module.exports = { students, attendance, marks, reports, profile, courses };
