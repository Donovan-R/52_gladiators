const insertLaniste =
  'INSERT INTO lanistes (lastname, firstname, mail, password) VALUES ($1, $2, $3, $4) RETURNING *';

const getLaniste = 'SELECT * FROM lanistes WHERE mail = $1';

module.exports = {
  insertLaniste,
  getLaniste,
};
