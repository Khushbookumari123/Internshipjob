module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define('Course', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    code: { type: DataTypes.STRING, unique: true }, // <-- ye add karo
    instructor: { type: DataTypes.STRING },
    duration: { type: DataTypes.STRING },
  }, {
    tableName: 'courses',
    timestamps: false,
  });

  return Course;
};
