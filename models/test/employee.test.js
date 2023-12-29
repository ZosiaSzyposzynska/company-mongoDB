const Employee = require('../employee.model');
const expect = require('chai').expect;

describe('Employee', () => {

it('should throw an error if no "firstName" arg', async () => {
    const emp = new Employee({});

  emp.validateSync(err => {
    expect(err.errors.firstName).to.exist;
  });

});

it('should throw an error if no "lasttName" arg', async () => {
    const emp = new Employee({}); 

  emp.validateSync(err => {
    expect(err.errors.lastName).to.exist;
  });

});


it('should throw an error if "firstName" is not a string', () => {

  const cases = [{}, []];
  for(let firstName of cases) {
    const emp = new Employee({ firstName });

    emp.validateSync(err => {
      expect(err.errors.firstName).to.exist;
    });

  }

});

it('should throw an error if "lastName" is not a string', () => {

  const cases = [{}, []];
  for(let lastName of cases) {
    const emp = new Employee({ lastName });

    emp.validateSync(err => {
      expect(err.errors.lastName).to.exist;
    });

  }

});

it('should throw an error if no "department" arg', async () => {
    const emp = new Employee({});

  emp.validateSync(err => {
    expect(err.errors.department).to.exist;
  });

});



});