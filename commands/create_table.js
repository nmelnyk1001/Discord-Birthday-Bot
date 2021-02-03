const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('birthday.db');

module.exports = message => {
  db.serialize(function () {
    db.run('CREATE TABLE IF NOT EXISTS birthdays(user VARCHAR UNIQUE, date INT, month INT)');
  });
}
