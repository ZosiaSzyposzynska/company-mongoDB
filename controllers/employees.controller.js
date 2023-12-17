const Employee = require('../models/employee.model')

exports.getAll = async (req, res) => {
  try {
    res.json(await Employee.find().populate('department'));
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getRandom =  async (req, res) => {
  try {
    const count = await Employee.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const employee = await Employee.findOne().skip(rand).populate('department');

    if (!employee) {
      res.status(404).json({ message: 'Not found' });
    } else {
      res.json(employee);
    }
    
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id).populate('department');

    if(!employee) { 
      res.status(404).json({ message: 'Not found' });
    } else { 
      res.json(employee);
    }  
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.addNewEmployee = async (req, res) => {
  try {
    const { firstName, lastName, department, salary } = req.body;

    const newEmployee = new Employee({ firstName, lastName, department, salary });
    await newEmployee.save();
    res.json({ message: 'OK' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }

};

exports.updateEmployee = async (req, res) => {
  const { firstName, lastName, department, salary} = req.body;
  try {
    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      { firstName, lastName, department, salary },
      { new: true, runValidators: true }
    );

    if(employee) {
      res.json({ message: 'OK' });
    } else {
      res.status(404).json({ message: 'Not found...' });
    }
  }
  catch(err) {
    res.status(500).json({ message: err });
  }

};


exports.deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if(employee) {
      res.json({ message: 'OK' });
    } else { 
      res.status(404).json({ message: 'Not found...' });
    }
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};