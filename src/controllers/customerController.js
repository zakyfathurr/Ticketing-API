const customerModel = require('../models/customer');
const customerValidateBody = require('../utils/customerValidateBody');
const createCustomer = async (req, res) => {
  const validationBody = customerValidateBody(req.body)

  if (validationBody){
      return res.status(400).json({
          message: 'Bad Request. Validation failed',
          status: 400,
          errors: validationBody
      });
  }
  try {
    const newCustomer = await customerModel.createCustomer(req.body);
    console.log(newCustomer)
    res.status(201).json(newCustomer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCustomer = async (req, res) => {
  
  try {
    const customer = await customerModel.getCustomerByNIK(req.params.nik);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    
    res.status(200).json({ 
      message: 'Getting data Success!',
      data: customer,
      status: 200  
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteCustomer = async (req, res) => {
  try {
    const deletedCustomer = await customerModel.deleteCustomerByNIK(req.params.nik);
    if (deletedCustomer.rowCount === 0) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    res.status(200).json({ 
      message: `Delete customer ${req.params.nik} success`,
      rowCount: deletedCustomer.rowCount,
      status: 200
  });
  } catch (error) {
    res.status(500).json({ error: error.message,
      status: 500,
      error_message: "tes"
     });
  }
}

const changeRoleCustomer = async (req, res) => {
  try {
    const updatedCustomer = await customerModel.changeCustomerRoleByNIK(req.params.nik);
    if (!updatedCustomer.rowCount) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    res.status(200).json({ message: 'Role updated successfully', rowCount: updatedCustomer.rowCount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = {
  createCustomer,
  getCustomer,
  deleteCustomer,
  changeRoleCustomer,
};