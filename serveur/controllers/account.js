const { StatusCodes } = require('http-status-codes');
const db = require('../db');
const { BadRequestError, NotFoundError } = require('../errors');
const accountQueries = require('../db/accountQueries');

const getLanisteInfos = async (req, res) => {
  const { lanisteID } = req.laniste;
  const { rows: laniste } = await db.query(accountQueries.getLanisteInfos, [
    lanisteID,
  ]);
  res.status(StatusCodes.OK).json({ laniste });
};

module.exports = {
  getLanisteInfos,
};
