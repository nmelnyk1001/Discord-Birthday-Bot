const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('birthday.db');

module.exports = message => {
  const member = message.author.id;

  db.serialize( function () {
    db.all(`SELECT date, month FROM birthdays WHERE user == (?)`,[member], function(err, birthdays) {
      if (err) {
	return message.channel.send(`<@${member}>, you must set your birthday first.`);
      }
      else {
	birthdays.forEach( (birthday) => {
	  return message.channel.send(`<@${member}>, your birthday is ${birthday.date}/${birthday.month}`);
        });
      }
    });
  });
}
