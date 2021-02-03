const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('birthday.db', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the in-memory SQLite database.');
});

module.exports = message => {
  const member = message.author.id;
  const odd_months = [1,3,5,7,8,10,12]
  const even_months = [4,6,9,11]

  let date_month = message.content.split(" ")[1];
  if (date_month) {
    let date = Number(date_month.split("/")[0]);
    let month = Number(date_month.split("/")[1]);
    if (date && month) {
      if (month<=0 || month>12){
        return message.channel.send('Invalid month')
      }
      if (month == 2){
        if (date<=0 || date>29){
          return message.channel.send('Invalid date')
        }
      }
      if (odd_months.includes(month)){
        if (date<=0 || date> 31){
          return message.channel.send('Invalid date')
        }
      }
      if (even_months.includes(month)){
        if (date<=0|| date>30){
          return message.channel.send('Invalid date')
        }
      }
      db.serialize( function() {
	db.run(`INSERT INTO birthdays (user, date, month) VALUES(?,?,?)`,[member, date, month], function (err) {
	  if (err) {
	   console.log(err)
	   return message.channel.send(`<@${member}>, your birthday has already been set.`);
	  }
	  return message.channel.send(`<@${member}> birthday has been set to ${date}/${month}`);
	});
      });
    }
    else {
      return message.channel.send('Please enter both a date and month');
    }
  }
  else {
    return message.channel.send('Please enter a date and month');
  }
}
