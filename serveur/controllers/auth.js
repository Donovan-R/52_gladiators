const { BadRequestError, UnauthentificatedError } = require('../errors');

const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
const authServices = require('../services/authServices');

const register = async (req, res) => {
  const { lastname, firstname, mail, password } = req.body;

  if (!lastname) {
    throw new BadRequestError('Veuillez fournir un nom');
  }

  if (!firstname) {
    throw new BadRequestError('Veuillez fournir un prénom');
  }

  if (!mail) {
    throw new BadRequestError('Veuillez fournir un mail');
  }

  if (!password) {
    throw new BadRequestError('Veuillez fournir un mot de passe');
  }

  // insère l'utilisateur
  const {
    rows: [laniste],
  } = await authServices.insertNewLaniste(lastname, firstname, mail, password);

  res.status(StatusCodes.CREATED).json(laniste);
};

const login = async (req, res) => {
  const { mail, password } = req.body;

  if (!mail) {
    throw new BadRequestError('fournir un email');
  }

  const {
    rows: [laniste],
  } = await authServices.checkLaniste(mail, password);

  const token = jwt.sign(
    {
      lanisteID: laniste.laniste_id,
      name: `${laniste.firstname} ${laniste.lastname}`,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  );

  res.status(StatusCodes.OK).json({
    laniste: {
      laniste: laniste.firstname,
      mail: laniste.mail,
      denier: laniste.denier,
    },
    token,
  });
};

module.exports = { register, login };
