const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('birthday.db');

module.exports = message => {
  const member = message.author;

  db.serialize(function() {
    db.all(`DELETE FROM birthdays`);
  });
}
