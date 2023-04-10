const { StatusCodes } = require('http-status-codes');
const db = require('../db');
const { BadRequestError, NotFoundError } = require('../errors');

//* create
const createLudus = async (req, res) => {
  const { name, speciality_id } = req.body;
  const { lanisteID } = req.laniste;

  const {
    rows: [ludus],
  } = await db.query(
    'INSERT INTO ludi (  laniste_id, name, speciality_id ) VALUES ($1, $2, $3) RETURNING *',
    [lanisteID, name, speciality_id]
  );
  res.status(StatusCodes.CREATED).json({ ludus });
};

//* get all

const getAllLudi = async (req, res) => {
  const { lanisteID } = req.laniste;
  const { rows: ludi } = await db.query(
    'SELECT * FROM ludi WHERE laniste_id= $1',
    [lanisteID]
  );

  res.status(StatusCodes.OK).json({ ludi });
};

module.exports = {
  createLudus,
  getAllLudi,
  updateLudus,
};
