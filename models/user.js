module.exports = function(sequelize, Sequelize) {
  const UserSchema = sequelize.define('User', {
      id: {
          type: Sequelize.INTEGER(20),
          primaryKey: true,
          autoIncrement: true
      },
      username: Sequelize.STRING,
      password: Sequelize.STRING,
      permission: {
          type: Sequelize.ENUM,
          values: ['read', 'write', 'execute']
      },
      editable: Sequelize.BOOLEAN,
      email: Sequelize.STRING
  }, {
      timestamp: true,
      paranoid: false,
  });

  return UserSchema;
};