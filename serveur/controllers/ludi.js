const { StatusCodes } = require('http-status-codes');
const db = require('../db');
const { BadRequestError, NotFoundError } = require('../errors');
const ludiQueries = require('../db/ludiQueries');

//* getlanisteInfos

//* create
const createLudus = async (req, res) => {
  const { name, speciality_name } = req.body;
  const { lanisteID } = req.laniste;

  const {
    rows: [ludus],
  } = await ludiQueries.createLudus(name, speciality_name, lanisteID);

  res.status(StatusCodes.CREATED).json({ ludus });
};

//* get all

const getAllLudi = async (req, res) => {
  const { lanisteID } = req.laniste;
  const { rows: ludi } = await ludiQueries.getAllLudi(lanisteID);
  res.status(StatusCodes.OK).json({ ludi });
};

module.exports = {
  createLudus,
  getAllLudi,
};
