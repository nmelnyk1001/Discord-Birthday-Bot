const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('birthday.db');

module.exports = message => {
  db.run(`DROP TABLE birthdays`);
  return message.channel.send('Table has been deleted')
}
