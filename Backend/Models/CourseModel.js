    module.exports = (sequelize, DataTypes) => {
      const Course = sequelize.define('Course', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING, allowNull: false },
        code: { type: DataTypes.STRING, unique: true }, 
        instructor: { type: DataTypes.STRING },
        duration: { type: DataTypes.STRING },
        department: DataTypes.STRING,
        credits: DataTypes.INTEGER,
      }, {
        tableName: 'courses',
        timestamps: false,
      });

      return Course;
    };