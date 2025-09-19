const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const UserWewardChapter = sequelize.define("UserWewardChapter", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    idUser: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    idWewardChapter: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    card1: { type: DataTypes.INTEGER, defaultValue: 0 },
    card2: { type: DataTypes.INTEGER, defaultValue: 0 },
    card3: { type: DataTypes.INTEGER, defaultValue: 0 },
    card4: { type: DataTypes.INTEGER, defaultValue: 0 },
    card5: { type: DataTypes.INTEGER, defaultValue: 0 },
    card6: { type: DataTypes.INTEGER, defaultValue: 0 },
    card7: { type: DataTypes.INTEGER, defaultValue: 0 },
    card8: { type: DataTypes.INTEGER, defaultValue: 0 },
    card9: { type: DataTypes.INTEGER, defaultValue: 0 },
  }, {
    tableName: "user_weward_chapters", // ⚠️ important si ta table s’appelle comme ça en BDD
    timestamps: true,
    createdAt: false,
    indexes: [
      {
        unique: true,
        fields: ["idUser", "idWewardChapter"]
      }
    ]
  });

  UserWewardChapter.associate = (models) => {
    UserWewardChapter.belongsTo(models.WewardChapter, {
      foreignKey: "idWewardChapter",
      as: "WewardChapter"
    });

    UserWewardChapter.belongsTo(models.User, {
      foreignKey: "idUser",
      as: "User"
    });
  };

  return UserWewardChapter;
};
