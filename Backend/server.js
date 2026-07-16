const express = require('express');
const cors = require('cors');
const { initialize, dbDialect } = require('./config/database');

const app = express();
const port = process.env.PORT || 8012;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Internship Job API is running' });
});

initialize()
  .then(() => {
    console.log(`${dbDialect.toUpperCase()} connected and tables synced`);

    // All Routes
    app.use('/api/students', require('./routes/students'));
    app.use('/api/courses', require('./routes/courses')); // <-- Course route
    app.use('/api/attendance', require('./routes/attendance'));
    app.use('/api/marks', require('./routes/marks'));
    app.use('/api/reports', require('./routes/reports'));
    app.use('/api/profile', require('./routes/profile'));
    app.use('/api/auth', require('./routes/auth'));
    app.use('/api/enroll', require('./routes/enrollment')); 

    if (require.main === module) {
      app.listen(port, () => {
        console.log(`Server listening on http://localhost:${port}`);
      });
    }
  })
  .catch((err) => {
    console.error('Database connection failed:', err.message);
    process.exit(1);
  });

module.exports = app;