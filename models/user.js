const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const User = sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        name: 'email_unique_constraint',
        msg: 'Email déjà utilisé',
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    resetPasswordToken: {
      type: DataTypes.STRING,
      allowNull: true
    },
    resetPasswordExpires: {
      type: DataTypes.DATE,
      allowNull: true
    },
    secretQuestion: {
      type: DataTypes.STRING,
      allowNull: true
    },
    secretAnswer: {
      type: DataTypes.STRING,
      allowNull: true
    },
    accountWeward: {
      type: DataTypes.STRING,
      allowNull: true
    },
    accountInsta: {
      type: DataTypes.STRING,
      allowNull: true
    },
    accountDiscord: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: "users",
    timestamps: true
  });

  User.associate = (models) => {
    User.hasMany(models.UserWewardChapter, {
      foreignKey: "idUser",
      onDelete: "CASCADE",
      as: "UserWewardChapters"
    });
  };

  return User;
};