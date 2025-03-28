const pool = require('../config/db');

const createTransaction = async (transactionData, ticketIds) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // Insert transaksi
    const transactionQuery = `
      INSERT INTO Transaksi (NIK, total_pembayaran, metode_pembayaran, status_transaksi)
      VALUES ($1, $2, $3, 'pending')
      RETURNING id_transaksi`;
    
    const transactionValues = [
      transactionData.NIK,
      transactionData.total_pembayaran,
      transactionData.metode_pembayaran
    ];
    
    const transactionResult = await client.query(transactionQuery, transactionValues);
    const transactionId = transactionResult.rows[0].id_transaksi;

    // Update status tiket dan link ke transaksi
    for (const ticketId of ticketIds) {
      await client.query(`
        UPDATE Tiket 
        SET id_transaksi = $1, status = 'terjual'
        WHERE id_tiket = $2
      `, [transactionId, ticketId]);
    }

    await client.query('COMMIT');
    return { id_transaksi: transactionId, ...transactionData };

  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

const getTransactionById = async (transactionId) => {
  const query = `
    SELECT t.*, c.nama AS customer_name 
    FROM Transaksi t
    JOIN Customer c ON t.NIK = c.NIK
    WHERE id_transaksi = $1`;
  
  const result = await pool.query(query, [transactionId]);
  return result.rows[0];
};

const updateTransactionStatus = async (transactionId, newStatus) => {
  const query = `
    UPDATE Transaksi
    SET status_transaksi = $1
    WHERE id_transaksi = $2
    RETURNING *`;
  
  const result = await pool.query(query, [newStatus, transactionId]);
  return result.rows[0];
};

const getTransactionTickets = async (transactionId) => {
  const query = `
    SELECT tk.id_tiket, k.nomor_kursi, z.nomor_zona, kt.nama_kategori, p.nama_pertandingan
    FROM Tiket tk
    JOIN Kursi k ON tk.id_kursi = k.id_kursi
    JOIN Zona z ON k.id_zona = z.id_zona
    JOIN Kategori_Tiket kt ON z.id_kategori = kt.id_kategori
    JOIN Pertandingan p ON kt.id_pertandingan = p.id_pertandingan
    WHERE tk.id_transaksi = $1`;
  
  const result = await pool.query(query, [transactionId]);
  return result.rows;
};

const deleteTransaction = async (transactionId) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    await client.query(
      `UPDATE Tiket 
       SET id_transaksi = NULL, status = 'belum terjual'
       WHERE id_transaksi = $1`,
      [transactionId]
    );

    const result = await client.query(
      'DELETE FROM Transaksi WHERE id_transaksi = $1',
      [transactionId]
    );

    await client.query('COMMIT');
    return result.rowCount;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

module.exports = {
  createTransaction,
  getTransactionById,
  updateTransactionStatus,
  getTransactionTickets,
  deleteTransaction,

};