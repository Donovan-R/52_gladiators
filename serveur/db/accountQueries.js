const db = require('../db');

async function getLanisteInfos(lanisteID) {
  return await db.query('SELECT * FROM lanistes WHERE laniste_id = $1', [
    lanisteID,
  ]);
}

module.exports = {
  getLanisteInfos,
};
