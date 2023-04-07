const { StatusCodes } = require('http-status-codes');
const db = require('../db');
const { BadRequestError, NotFoundError } = require('../errors');

//* create
const createLudus = async (req, res) => {
  const { name, speciality } = req.body;
  const { userID } = req.user;

  const {
    rows: [ludus],
  } = await db.query(
    'INSERT INTO ludi (  laniste_id, name, speciality ) VALUES ($1, $2, $3) RETURNING *',
    [userID, name, speciality]
  );
  res.status(StatusCodes.CREATED).json({ ludus });
};

//* get all

const getAllLudi = async (req, res) => {
  const { userID } = req.user;
  const { rows: ludi } = await db.query(
    'SELECT * FROM ludi WHERE user_id= $1',
    [userID]
  );

  res.status(StatusCodes.OK).json({ ludi });
};

module.exports = {
  createLudus,
  getAllLudi,
  updateLudus,
};
