const employeeModel = require("../models/employeeModel");

const store = async (req, res) => {
  try {
   
    const obj = new employeeModel({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      contact: req.body.contact,
      designation: req.body.designation,
    });
    const employee = await obj.save();
    res.status(201).send({
      message: "Employee Created Successfully",
      result: employee,
    });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};
const fetch_all = async (req, res) => {
  try {
    const employees = await employeeModel.find();
    res.status(200).json({
      result: employees,
      message: "All Employees Fetched Successfully",
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
const fetch_one = async (req, res) => {
  try {
    const id = req.params.id;
    const employee = await employeeModel.findById(id);
    res.status(200).json({
      result: employee,
      message: "One Employee Fetched Successfully By Id",
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
const destroy = async (req, res) => {
  try {
    const id = req.params.id;
    const employee = await employeeModel.findByIdAndDelete(id);
    res.status(200).json({
      result: employee,
      message: "One Employee Deleted Successfully By Id",
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
const search = (req, res) => {};
const update = async (req, res) => {
  try {
    const id = req.params.id;
    const data = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      contact: req.body.contact,
      designation: req.body.designation,
    };
    const employee = await employeeModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    res.status(200).json({
      result: employee,
      message: "One Employee Updated Successfully By Id",
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

module.exports = { store, fetch_all, fetch_one, destroy, search, update };
