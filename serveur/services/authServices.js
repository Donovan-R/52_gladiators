const { BadRequestError, UnauthentificatedError } = require('../errors');
const bcrypt = require('bcrypt');
const authQueries = require('../db/authQueries');

async function insertNewLaniste(lastname, firstname, mail, password) {
  if (lastname.length < 3 || lastname.length > 50) {
    throw new BadRequestError(
      'Veuillez fournir un nom valide entre 3 et 50 caractères'
    );
  }

  if (firstname.length < 3 || firstname.length > 50) {
    throw new BadRequestError(
      'Veuillez fournir un prénom valide entre 3 et 50 caractères'
    );
  }

  const isValidEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      mail
    );

  if (!isValidEmail) {
    throw new BadRequestError('Veuillez fournir un mail valide');
  }

  if (password.length < 6) {
    throw new BadRequestError(
      'Veuillez fournir un mot de passe avec au moins 6 caractéres'
    );
  }

  // crypte le mot de passe
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  return await authQueries.insertLaniste(
    lastname,
    firstname,
    mail,
    hashedPassword
  );
}

async function checkLaniste(mail, password) {
  const {
    rows: [laniste],
  } = await authQueries.getLaniste(mail);

  if (!laniste) {
    throw new UnauthentificatedError('id incorrects');
  }

  const isValidEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      mail
    );

  if (!isValidEmail) {
    throw new BadRequestError('fournir un email');
  }

  const isPasswordCorrect = await bcrypt.compare(password, laniste.password);

  if (!isPasswordCorrect) {
    throw new UnauthentificatedError('mdp incorrect');
  }

  return await authQueries.getLaniste(mail);
}

module.exports = {
  checkLaniste,
  insertNewLaniste,
};
