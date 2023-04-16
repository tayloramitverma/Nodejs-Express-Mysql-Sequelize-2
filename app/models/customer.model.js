module.exports = (sequelize, Sequelize) => {
  const Customers = sequelize.define("customers", {
    email: {
      type: Sequelize.STRING
    },
    name: {
      type: Sequelize.STRING
    },
    active: {
      type: Sequelize.BOOLEAN
    }
  });

  return Customers;
};
