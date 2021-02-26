module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    Id: DataTypes.STRING,
    Email: DataTypes.STRING,
    Username: DataTypes.STRING,
    Password: DataTypes.STRING,
  });
  return User;
};
