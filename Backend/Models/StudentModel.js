module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define('Student', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    department: { type: DataTypes.STRING },
        roll: { type: DataTypes.STRING, unique: true }, // <-- ye add kiya

  }, {
    tableName: 'students',
    timestamps: false,
  });

  return Student;
};
