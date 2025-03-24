const pool = require('../config/db');

const createCustomer = async (customerData) => {
  const query = `
    INSERT INTO Customer (NIK, nama, email, nomor_telepon, alamat, username, password)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *`;
  
  const values = [
    customerData.NIK,
    customerData.nama,
    customerData.email,
    customerData.nomor_telepon,
    customerData.alamat,
    customerData.username,
    customerData.password
  ];

  const result = await pool.query(query, values);
  return result.rows[0];
};

const getCustomerByNIK = async (nik) => {
  const result = await pool.query('SELECT * FROM Customer WHERE NIK = $1', [nik]);
  return result.rows[0];
};

const deleteCustomerByNIK = async (nik) => {
    const result = await pool.query('DELETE FROM Customer WHERE NIK = $1', [nik]);
    return result;
}

const changeCustomerRoleByNIK = async (nik) => {
    const result = await pool.query('UPDATE Customer SET role = CASE WHEN role = \'admin\' THEN \'user\' ELSE \'admin\' END WHERE NIK = $1', [nik]);
    return result;
}

module.exports = {
  createCustomer,
  getCustomerByNIK,
  deleteCustomerByNIK,
  changeCustomerRoleByNIK,
};