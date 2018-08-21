const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.reply("Nu ai acceasta permisiune.");
  let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if(!rMember) return message.reply("Nu am gasit utilizatorul.");
  let role = args.join(" ").slice(22);
  if(!role) return message.reply("Specifica un rol.");
  let gRole = message.guild.roles.find(`name`, role);
  if(!gRole) return message.reply("Nu am gasit rolul.");

  if(!rMember.roles.has(gRole.id)) return message.reply("They don't have that role.");
  await(rMember.removeRole(gRole.id));

  try{
    await rMember.send(`Ai pierdut rolul de **${gRole.name}** .`)
  }catch(e){
    message.channel.send(`<@${rMember.id}> a pierdut rolul de **${gRole.name}**.`)
  }
}

module.exports.help = {
  name: "removerole"
}
