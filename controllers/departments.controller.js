
const Department = require('../models/department.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Department.find({}));
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};
  

exports.getRandom = async (req, res) => {
  try {
    const count = await Department.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const dep = await Department.findOne().skip(rand);
    if(!dep) { 
      res.status(404).json({ message: 'Not found' });
    } else { 
      res.json(dep) 
    };
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getById = async (req, res) => {

  try {
    const dep = await Department.findById(req.params.id);

    if(!dep) {
      res.status(404).json({ message: 'Not found' });
    } else {
      res.json(dep);
    }
  }
  catch(err) {
    res.status(500).json({ message: err });
  }

}

exports.addNewDep = async (req, res) => {
  try {
    const { name } = req.body;
    const newDepartment = new Department({ name });
    await newDepartment.save();
    res.json({ message: 'OK' });
  } catch(err) {
    res.status(500).json({ message: err });
  }
}

exports.updateDep = async (req, res) => {
  const { name } = req.body;

  try {
    const dep = await Department.findByIdAndUpdate( req.params.id,
      { name },
      { new: true, runValidators: true }
    );

    if (dep) {
      res.json(dep);
    } else {
      res.status(404).json({ message: 'Not found...' });
    }

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
  
};

exports.deleteDep = async (req, res) => {

  try {
    const dep = await Department.findByIdAndDelete(req.params.id);

    if (dep) {
      res.json(dep);
    } else {
      res.status(404).json({ message: 'Not found...' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message }); // Include the error message
  }

};
  