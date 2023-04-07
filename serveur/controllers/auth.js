const { BadRequestError, UnauthentificatedError } = require('../errors');
const bcrypt = require('bcrypt');
const db = require('../db');
const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');

const register = async (req, res) => {
  const { lastname, firstname, mail, password } = req.body;

  if (!lastname || lastname.length < 3 || lastname.length > 50) {
    throw new BadRequestError(
      'Veuillez fournir un nom valide entre 3 et 50 caractères'
    );
  }

  if (!firstname || firstname.length < 3 || firstname.length > 50) {
    throw new BadRequestError(
      'Veuillez fournir un prénom valide entre 3 et 50 caractères'
    );
  }

  const isValidEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      mail
    );

  if (!mail || !isValidEmail) {
    throw new BadRequestError('Veuillez fournir un email valide');
  }

  if (!password || password.length < 6) {
    throw new BadRequestError(
      'Veuillez fournir un mot de passe avec au moins 6 caractéres'
    );
  }

  // crypte le mot de passe
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // insère l'utilisateur
  const {
    rows: [laniste],
  } = await db.query(
    'INSERT INTO lanistes (lastname, firstname, email, password) VALUES ($1, $2, $3, $4) RETURNING *',
    [firstname, lastname, mail, hashedPassword]
  );

  // génère un token qui va permettre de retrouver les infos de l'user
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

  res.status(StatusCodes.CREATED).json({
    user: {
      name: `${laniste.firstname} ${laniste.lastname}`,
    },
    token,
  });
};

const login = async (req, res) => {
  const { mail, password } = req.body;

  if (!mail || !password) {
    throw new BadRequestError('fournir un email valide');
  }

  const {
    rows: [laniste],
  } = await db.query('SELECT * FROM lanistes WHERE email = $1', [mail]);

  if (!laniste) {
    throw new UnauthentificatedError('id incorrects');
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    throw new UnauthentificatedError('mdp incorrect');
  }

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
    laniste: { name: `${laniste.firstname} ${laniste.lastname}` },
    token,
  });
};

module.exports = { register, login };
