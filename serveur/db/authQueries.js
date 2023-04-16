const insertUser =
  'INSERT INTO lanistes (lastname, firstname, mail, password) VALUES ($1, $2, $3, $4) RETURNING *';

module.exports = {
  insertUser,
};
