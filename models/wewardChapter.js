const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const WewardChapter = sequelize.define("WewardChapter", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    en: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fr: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isVintage: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    isEphemeral: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    tableName: "weward_chapters",
    timestamps: true,
    updatedAt: false,
  });

  WewardChapter.associate = (models) => {
    WewardChapter.hasMany(models.UserWewardChapter, {
      foreignKey: "idWewardChapter",
      as: "UserWewardChapters"
    });
  };

  return WewardChapter;
};