const mongoose = require('mongoose');
const expect = require('chai').expect;
const Employee = require('../employee.model');

describe('Employee', () => {
    
  before(async () => {
    try {
      await mongoose.connect('mongodb://127.0.0.1:27017/companyDBtest', { useNewUrlParser: true, useUnifiedTopology: true });
    } catch (err) {
      console.error(err);
    }
  });

  describe('Reading data', () => {
    before(async () => {
      const testEmpOne = new Employee({ firstName: 'Employee #1', lastName: 'Last name #1', department: 'Department #1' });
      await testEmpOne.save();

      const testEmpTwo = new Employee({ firstName: 'Employee #2', lastName: 'Last name #2', department: 'Department #2' });
      await testEmpTwo.save();
    });

    it('should return all the data with "find" method', async () => {
      const employees = await Employee.find();
      const expectedLength = 2;
      expect(employees.length).to.be.equal(expectedLength);
    });

    it('should return a proper document by "firstName" with "findOne" method', async () => {
      const employee = await Employee.findOne({ firstName: 'Employee #1' });
      const expectedfirstName = 'Employee #1';
      expect(employee.firstName).to.be.equal(expectedfirstName);
    });

    it('should return a proper document by "lastName" with "findOne" method', async () => {
      const employee = await Employee.findOne({ lastName: 'Last name #1' });
      const expectedlastName = 'Last name #1';
      expect(employee.lastName).to.be.equal(expectedlastName);
    });

     it('should return a proper document by "department" with "findOne" method', async () => {
      const employee = await Employee.findOne({ department: 'Department #1' });
      const expectedDepartment = 'Department #1';
      expect(employee.department).to.be.equal(expectedDepartment);
    });

    after(async () => {
      await Employee.deleteMany();
    });
  });

  describe('Creating data', () => {
    it('should insert new document with "insertOne" method', async () => {
      const employee = new Employee({ firstName: 'Employee #1', lastName: 'Last name #1', department: 'Department #1' });
      await employee.save();
      expect(employee.isNew).to.be.false;
    });

    after(async () => {
      await Employee.deleteMany();
    });
  });

  describe('Updating data', () => {
    beforeEach(async () => {
      const testEmpOne = new Employee({ firstName: 'Employee #1', lastName: 'Last name #1', department: 'Department #1' });
      await testEmpOne.save();

      const testEmpTwo = new Employee({ firstName: 'Employee #2', lastName: 'Last name #2', department: 'Department #2'  });
      await testEmpTwo.save();
    });

    it('should properly update one document with "updateOne" method', async () => {
      await Employee.updateOne({ firstName: 'Employee #1', lastName: 'Last name #1', department: 'Department #1'  }, { $set: { firstName: '=Employee #1=', lastName: '=Last name #1=', department: '=Department #1=' } });
      const updatedEmployee = await Employee.findOne({ firstName: '=Employee #1=', lastName: '=Last name #1=', department: '=Department #1=' });
      expect(updatedEmployee).to.not.be.null;
    });

    it('should properly update one document with "save" method', async () => {
      const employee = await Employee.findOne({ firstName: 'Employee #1' });
      employee.firstName = '=Employee #1=';
      await employee.save();

      const updatedEmployee = await Employee.findOne({ firstName: '=Employee #1=' });

      expect(updatedEmployee).to.not.be.null;
    });

    it('should properly update multiple documents with "updateMany" method', async () => {
        await Employee.updateMany({}, { $set: { firstName: 'Updated!' }});
        const employees = await Employee.find();
        expect(employees[0].firstName).to.be.equal('Updated!');
        expect(employees[1].firstName).to.be.equal('Updated!');
    });

    afterEach(async () => {
      await Employee.deleteMany();
    });
  });

  describe('Removing data', () => {
    beforeEach(async () => {
        const testEmpOne = new Employee({  firstName: 'Employee #1', lastName: 'Last name #1', department: 'Department #1' });
        await testEmpOne.save();

        const testEmpTwo = new Employee({ firstName: 'Employee #2', lastName: 'Last name #2', department: 'Department #2' });
        await testEmpTwo.save();
    });


  it('should properly remove one document with "deleteOne" method', async () => {
    await Employee.deleteOne({ firstName: 'Employee #1', lastName: 'Last name #1', department: 'Department #1'});
    const removeEmployee = await Employee.findOne({ firstName: 'Employee #1', lastName: 'Last name #1', department: 'Department #1' });
    expect(removeEmployee).to.be.null;
  });

  it('should properly remove multiple documents with "deleteMany" method', async () => {
    await Employee.deleteMany();
    const employees = await Employee.find();
    expect(employees.length).to.be.equal(0);
  });

  

});

  after(async () => {
   
    mongoose.models = {};
  });
});
