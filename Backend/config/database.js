require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

const dialect = process.env.DB_DIALECT || 'sqlite';
const database = process.env.DB_NAME || 'internship_job';
const username = process.env.DB_USER || 'root';
const password = process.env.DB_PASSWORD || '';
const host = process.env.DB_HOST || 'localhost';
const port = Number(process.env.DB_PORT || 3306);
const sqliteStorage = process.env.DB_STORAGE || path.join(__dirname, '..', 'data', 'database.sqlite');

let sequelize;
if (dialect === 'sqlite') {
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: sqliteStorage,
    logging: false,
  });
} else if (dialect === 'mysql') {
  sequelize = new Sequelize(database, username, password, {
    host,
    port,
    dialect: 'mysql',
    logging: false,
  });
} else {
  throw new Error(`Unsupported DB_DIALECT '${dialect}'. Use 'sqlite' or 'mysql'.`);
}

let modelsLoaded = false;

function validateDatabaseName(name) {
  if (!/^[a-zA-Z0-9_]+$/.test(name)) {
    throw new Error('DB_NAME should contain only letters, numbers, and underscores.');
  }
}

async function createDatabaseIfNeeded() {
  if (dialect !== 'mysql') {
    return;
  }

  validateDatabaseName(database);

  const connection = await mysql.createConnection({
    host,
    port,
    user: username,
    password,
  });

  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\``);
  await connection.end();
}

function loadModels() {
  if (modelsLoaded) return;

  const modelsDir = path.join(__dirname, '..', 'Models');
  if (fs.existsSync(modelsDir)) {
    fs.readdirSync(modelsDir).forEach((file) => {
      if (file.endsWith('.js')) {
        const defineModel = require(path.join(modelsDir, file));
        if (typeof defineModel === 'function') {
          defineModel(sequelize, DataTypes);
        }
      }
    });
  }

  modelsLoaded = true;
}

function setupAssociations() {
  const { Student, Course } = sequelize.models;

  if (Student && Course) {
    Student.belongsToMany(Course, {
      through: 'StudentCourse',
      foreignKey: 'studentId',
      otherKey: 'courseId'
    });
    Course.belongsToMany(Student, {
      through: 'StudentCourse',
      foreignKey: 'courseId',
      otherKey: 'studentId'
    });
    console.log('Associations setup: Student <-> Course');
  }
}

async function seedInitialData() {
  if (sequelize.models.Student) {
    // count check hata diya. hamesha chalega
    await sequelize.models.Student.bulkCreate([
      { name: 'Rahul Kumar', department: 'Computer Science', roll: 'CS101' },
      { name: 'Anita Sharma', department: 'Mathematics', roll: 'MA201' },
      { name: 'Vikram Singh', department: 'Physics', roll: 'PH301' },
    ],{ ignoreDuplicates: true }); 
  }

  if (sequelize.models.Course) {
    // count check hata diya. naya course add hoga
    await sequelize.models.Course.bulkCreate([
      { name: 'Computer Science Engineering', code: 'CSE101', instructor: 'Dr. Amit Sharma', duration: '4 Years' },
      { name: 'Information Technology', code: 'IT102', instructor: 'Prof. Neha Verma', duration: '4 Years' },
      { name: 'Electronics & Communication', code: 'ECE103', instructor: 'Dr. Rajesh Kumar', duration: '4 Years' },
      { name: 'Robotics', code: 'ECE104', instructor: 'Dr. Rajesh Kumar', duration: '4 Years' },
      { name: 'Artificial Intelligence', code: 'AI105', instructor: 'Dr. Priya Singh', duration: '4 Years' },
      { name: 'Cyber Security', code: 'CS106', instructor: 'Dr. Mohit Jain', duration: '4 Years' } // <-- yaha aur add kar sakte ho

    ],{ ignoreDuplicates: true });
  }
}

async function initialize() {
  await createDatabaseIfNeeded();
  loadModels();
  setupAssociations();
  await sequelize.authenticate();
  await sequelize.sync({ alter: process.env.DB_SYNC_ALTER === 'true' });
  await seedInitialData();

  return sequelize;
}

module.exports = { sequelize, initialize, dbDialect: dialect };