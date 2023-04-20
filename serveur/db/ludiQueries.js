const db = require('../db');

async function createLudus(name, speciality_name, laniste_id) {
  return await db.query(
    'INSERT INTO ludi ( name, speciality_name, laniste_id ) VALUES ($1, $2, $3) RETURNING *',
    [name, speciality_name, laniste_id]
  );
}

async function getAllLudi(laniste_id) {
  return await db.query('SELECT * FROM ludi WHERE laniste_id= $1', [
    laniste_id,
  ]);
}

module.exports = {
  createLudus,
  getAllLudi,
};
