const utils = require('./config/helperfile');
const expect = require('chai').expect;
const fs = require('fs');
const neatCsv = require('neat-csv');
require('dotenv').config({ path: './sandbox.env' })
getEmployeeid();

async function assignRoles(empID) {
  var data = {
    EmployeeID: empID,
    AccountName: process.env.WORKDAY_ISU_USERNAME,
    AccountPassword: process.env.WORKDAY_ISU_PASSWORD
  }
  const roles = await utils.postToWorkday(
    '/Human_Resources/v32.0',
    '../webservices/assignroles.xml', data
  );
  expect(roles.status).to.equal(200);
  console.log("Employee IA ended : ", roles.data);
}
async function editAccount(empID) {
  var data = {
    AccountName: process.env.WORKDAY_ISU_USERNAME,
    AccountPassword: process.env.WORKDAY_ISU_PASSWORD
  }
  const roles = await utils.postToWorkday(
    '/Human_Resources/v32.0',
    '../xml/editaccount.xml', data
  );
  expect(roles.status).to.equal(200);
  console.log("Employee IA ended : ", roles.data);
}

async function getEmployeeid() {
  fs.readFile('./employeeIDs.csv', async (err, data) => {
    if (err) {
      console.error(err)
      return
    }
    let result = await neatCsv(data);
    result.forEach(function (value) {
      empID = value.EmployeeID;
      console.log(empID);
      assignRoles(empID);
    })
  })
  
}
module.exports={
  getEmployeeid
}