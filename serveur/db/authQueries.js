const db = require('../db');

async function insertLaniste() {
  return await db.query(
    'INSERT INTO lanistes (lastname, firstname, mail, password) VALUES ($1, $2, $3, $4) RETURNING *',
    [firstname, lastname, mail, hashedPassword]
  );
}

async function getLaniste(mail) {
  return await db.query('SELECT * FROM lanistes WHERE mail = $1', [mail]);
}

module.exports = {
  insertLaniste,
  getLaniste,
};
