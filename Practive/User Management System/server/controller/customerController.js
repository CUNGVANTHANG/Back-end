const Customer = require("../models/Customer");
const mongoose = require("mongoose");
const flash = require("connect-flash");

// GET / (homePage)

exports.homePage = async (req, res) => {
  const messages = await req.flash("info");

  locals = {
    title: "Home",
    description: "Home page",
  };

  // Phân trang
  let perPage = 12;
  // Query parameters
  let page = req.query.page || 1;

  try {
    const customers = await Customer.aggregate([{ $sort: { createdAt: -1 } }])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();

    const count = await Customer.countDocuments();

    res.render("index", {
      locals,
      customers,
      current: page,
      pages: Math.ceil(count / perPage),
      messages,
    });
  } catch (error) {
    console.log(error);
  }
};

// GET / (addCustomer )

exports.addCustomer = async (req, res) => {
  locals = {
    title: "Add New Customer",
    description: "Add New Customer",
  };
  res.render("customer/add", locals);
};

exports.postCustomer = async (req, res) => {
  console.log(req.body);

  const newCustomer = new Customer({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    tel: req.body.tel,
    email: req.body.email,
    details: req.body.details,
  });

  try {
    await Customer.create(newCustomer);
    await req.flash("info", "New customer has been added.");
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};
