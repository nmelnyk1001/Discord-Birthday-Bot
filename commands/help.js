module.exports = message => {
  return message.channel.send(`
  This bot gives users the birthday role on their birthday! \n 
  All commands start with a ? \n

  set_birthday XX/XX: Sets your bithday to date/month \n
  update_birthday XX/XX: Updates your birthday to date/month \n
  delete_birthday: Deletes your birthday from the database \n
  show_birthday: Displays your current birthday!`)
}
