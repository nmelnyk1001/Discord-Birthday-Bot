const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('birthday.db');

module.exports = message => {
  const member = message.author.id;

  db.serialize(function() {
    db.run(`DELETE FROM birthdays WHERE user=${member}`, function(err){
      if (err) {
	return message.channel.send(`<@${member}>, no birthday to delete.`);
	throw err;
      }
      return message.channel.send(`<@${member}>, your birthday has been deleted!.`);
    });
  });
}
