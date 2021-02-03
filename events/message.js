const help = require("../commands/help");
const set_birthday = require("../commands/set_birthday");
const show_birthday = require("../commands/show_birthday");
const clear_table = require("../commands/clear_table");
const nuke_table = require("../commands/nuke_table");
const create_table = require("../commands/create_table");
const update_birthday = require("../commands/update_birthday");
const delete_birthday = require("../commands/delete_birthday");

module.exports = (client, message) => {
  let adminRole = message.guild.roles.find("name", "New Yamtown Staff");
  if (message.content.startsWith("?help")) {
    return help(message);
  }
  if (message.content.startsWith("?set_birthday")) {
    return set_birthday(message);
  }
  if (message.content.startsWith("?show_birthday")) {
    return show_birthday(message);
  }
  if (message.content.startsWith("?update_birthday")){
    return update_birthday(message);
  }
  if (message.content.startsWith("?delete_birthday")){
    return delete_birthday(message);
  }
  if (message.content.startsWith("?nuke_table") && (message.member.roles.has(adminRole))){
    return nuke_table(message);
  }
  else{
    return message.channel.send("Insufficient permissions");
  }
  if (message.content.startsWith("?clear_table") && (message.member.roles.has(adminRole))){
    return clear_table(message);
  }
  else{
    return message.channel.send("Insufficient permissions");
  }
  if (message.content.startsWith("?create_table") && (message.member.roles.has(adminRole))){
    return create_table(message);
  }
  else{
    return message.channel.send("Insufficient permissions");
  }
};
