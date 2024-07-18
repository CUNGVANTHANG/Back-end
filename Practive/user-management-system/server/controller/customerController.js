const Customer = require("../models/Customer");
const mongoose = require("mongoose");
const flash = require("connect-flash");

// GET /
exports.homePage = async (req, res) => {
  const messages = await req.flash("info");

  locals = {
    title: "Home",
    description: "Home page",
  };

  // Phân trang
  let perPage = 12;
  let page = req.query.page || 1; // Query parameters

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

// GET /add
exports.addCustomer = async (req, res) => {
  locals = {
    title: "Add New Customer",
    description: "Add New Customer",
  };
  res.render("customer/add", locals);
};

// POST /add
exports.postCustomer = async (req, res) => {
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

// GET /view/:id
exports.view = async (req, res) => {
  try {
    const customer = await Customer.findOne({ _id: req.params.id });

    const locals = {
      title: "View Customer Data",
      description: "View Customer",
    };

    res.render("customer/view", {
      locals,
      customer,
    });
  } catch (error) {
    console.log(error);
  }
};

// GET /edit/:id
exports.edit = async (req, res) => {
  try {
    const customer = await Customer.findOne({ _id: req.params.id });

    const locals = {
      title: "Edit Customer Data",
      description: "Edit Customer",
    };

    res.render("customer/edit", {
      locals,
      customer,
    });
  } catch (error) {
    console.log(error);
  }
};

// PUT /edit/:id
exports.editPost = async (req, res) => {
  try {
    await Customer.findByIdAndUpdate(req.params.id, {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      tel: req.body.tel,
      email: req.body.email,
      details: req.body.details,
      updateAt: Date.now(),
    });

    res.redirect(`/edit/${req.params.id}`);
  } catch (error) {
    console.log(error);
  }
};

// POST /edit/:id
exports.deleteCustomer = async (req, res) => {
  try {
    await Customer.deleteOne({ _id: req.params.id });
    res.redirect(`/`);
  } catch (error) {
    console.log(error);
  }
};

// POST /search
exports.searchCustomer = async (req, res) => {
  const locals = {
    title: "Search Customer Data",
    description: "View Customer",
  };

  try {
    let searchTerm = req.body.searchTerm;
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");

    const customers = await Customer.find({
      $or: [
        { firstName: { $regex: new RegExp(searchNoSpecialChar, "i") } },
        { lastName: { $regex: new RegExp(searchNoSpecialChar, "i") } },
      ],
    });

    res.render("search", {
      customers,
      locals,
    });
  } catch (error) {
    console.log(error);
  }
};
