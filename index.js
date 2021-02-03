require("dotenv").config();
//Sqlite dependencies
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database('birthday.db');
//Crons dependencies
const cron = require("node-cron");
const express = require("express");
//Discord dependencies
const Discord = require("discord.js");
const fs = require("fs");
const client = new Discord.Client();

fs.readdir("./events/", (err, files) => {
  files.forEach(file => {
    const eventHandler = require(`./events/${file}`);
    const eventName = file.split(".")[0];
    client.on(eventName, (...args) => eventHandler(client, ...args));
  });
});

client.login(process.env.BOT_TOKEN);

//Crons scheduling stuff
app = express();
//minute, hour, day, month, week
cron.schedule("00 00 * * *", function() {
  const day = new Date();
  const month = day.getMonth()+1;
  const date = day.getDate();
  db.serialize(function() {
    db.all(`SELECT user FROM birthdays WHERE date == ${date} AND month == ${month}`, function(err, users) {
      if (err){
	console.log(err);
      }
      users.forEach( (user) => {
	// Assign the birthday role
	user.addRole(message.guild.roles.find(r=>r.name==="Supreme Birthday Ruler")).catch(err);
	return client.channels.get("542413613714112549").send(`Happy birthday <@${user.user}>!`);
      });
    });
    db.all(`SELECT user FROM birthdays WHERE date == ${date-1} AND month == ${month}`, function(err, users) {
      if (err) {
	console.log(err);
      }
      users.forEach( (user) => {
	user.removeRole(message.guild.roles.find(r=>r.name==="Supreme Birthday Ruler"));
	console.log('Role removed');
      });
    });
  });
  console.log("Birthdays checked");
});

app.listen(3128);
