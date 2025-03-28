const pool = require('../config/db');
const { redisClient } = require('../config/redis');

const CACHE_EXPIRATION = 3600; // 1 jam dalam detik

const createCustomer = async (customerData) => {
  const query = `
    INSERT INTO Customer (nik, nama, email, nomor_telepon, alamat, username, password)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *`;
  
  const values = [
    customerData.nik,
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
  const cacheKey = `customer:${nik}`;
  
  try {
    // Cek cache dulu
    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
      console.log('Cache hit for', cacheKey);
      return JSON.parse(cachedData);
    }
  } catch (err) {
    console.error('Redis error:', err);
  }
  const result = await pool.query('SELECT * FROM Customer WHERE NIK = $1', [nik]);
  const customer = result.rows[0];

  if (customer) {
    try {
      // Simpan ke cache
      await redisClient.setEx(cacheKey, CACHE_EXPIRATION, JSON.stringify(customer));
      console.log('Cache set for', cacheKey);
    } catch (err) {
      console.error('Redis error:', err);
    }
  }
  return customer;
};

const deleteCustomerByNIK = async (nik) => {
    const result = await pool.query('DELETE FROM Customer WHERE nik = $1', [nik]);
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