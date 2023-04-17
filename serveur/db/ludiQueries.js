const createLudus =
  'INSERT INTO ludi ( name, speciality_name, laniste_id ) VALUES ($1, $2, $3) RETURNING *';

const getAllLudi = 'SELECT * FROM ludi WHERE laniste_id= $1';

module.exports = {
  createLudus,
  getAllLudi,
};
