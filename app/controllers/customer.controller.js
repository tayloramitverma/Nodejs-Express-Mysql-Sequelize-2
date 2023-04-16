const db = require("../models");
const Customers = db.customers;
const Op = db.Sequelize.Op;

// Create and Save a new customer
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Customers
  const customer = {
    name: req.body.name,
    email: req.body.email,
    active: req.body.active ? req.body.active : false
  };

  // Save Customers in the database
  Customers.create(customer)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the customer."
      });
    });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  Customers.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers."
      });
    });
};

// Find a single customer with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Customers.findByPk(id, { include: ["tutorials"] })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving customer with id=" + id
      });
    });
};

// Update a customer by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Customers.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Customer was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update customer with id=${id}. Maybe customer was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating customer with id=" + id
      });
    });
};

// Delete a customer with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Customers.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Customer was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Customer with id=${id}. Maybe customer was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete customer with id=" + id
      });
    });
};

// Delete all customer from the database.
exports.deleteAll = (req, res) => {
  Customers.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} customers were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all customers."
      });
    });
};

// find all published customer
exports.findAllPublished = (req, res) => {
  Customers.findAll({ where: { active: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers."
      });
    });
};
