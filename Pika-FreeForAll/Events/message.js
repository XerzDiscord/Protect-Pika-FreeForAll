const config = require('../config/config.json');
const Discord = require('discord.js');
const { readdirSync } = require("fs"); 
const db = require('quick.db');
   
module.exports = {
	name: 'message',
    async execute(message, client) {
      
      let prefix;
      if(message.channel.type === 'dm' || message.channel.type === 'group') {
        prefix = config.prefix;
      }
      else {
      prefix = db.get(`prefix_${message.guild.id}`) || config.prefix;
      }

      let user = message.author;

      const mentionRegex = RegExp(`^<@!?${client.user.id}>$`);

      if (message.content.match(mentionRegex) || message.content.startsWith('Xapex')) {
        let embed = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL())
        .setDescription(`Mon prefix est \`${prefix}\` \n Tapez \`${prefix}help\` pour voir la liste de mes commandes !`)
        .setThumbnail(client.user.displayAvatarURL())
        .setFooter(config.footer, client.user.displayAvatarURL())
        .setColor(config.color.bot)
        message.channel.send(embed)
      }

  if (!message.content.startsWith(prefix) || message.author.bot) return;

  if(db.get(`delinvoke_${message.guild.id}`) === "on") message.delete()

  if(db.get(`blacklist_${message.author.id}`) === "yes") {
    let em = new Discord.MessageEmbed()
    .setColor(config.color.bot)
    .setAuthor(message.author.tag, message.author.displayAvatarURL())
    .setDescription(`😔 Vous ne pouvez pas éxecuter mes commandes car vous êtes dans ma blacklist... \n Vous pensez qu'il s'agit d'une erreur ? Allez nous le faire part dans le [Support](${config.onigashima} )`)

    return message.channel.send(em)
  }

  const args = message.content.slice(prefix.length).split(/ +/);
  const commandName = args.shift().toLowerCase();
  if (!commandName) return;

 const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.help.aliases && cmd.help.aliases.includes(commandName));

 if(!command) return;

 if(command.help.guildOnly && message.channel.type === 'dm' || message.channel.type === 'group') {
   return message.channel.send(`${config.emoji.error} \`ERROR\` Cette commande ne peut etre éxecutée seulement dans un serveur !`);
 }

  if(command.help.args && !args.length) {
     const embed = new Discord.MessageEmbed()
    .setTitle(`**${config.emoji.error} Arguments Manquants !**`)
    .setDescription(`Usage : ${prefix}${command.help.name} ${command.help.usage}`)
    .setFooter(client.user.username, client.user.displayAvatarURL())
    .setColor(config.color.bot) 
   return  message.channel.send(embed).then(msg => {
      setTimeout(() => {
         msg.delete()
      }, 5000);
  });
  }

  if(!client.cooldowns.has(command.help.name)) {
    client.cooldowns.set(command.help.name, new Discord.Collection());
  }

  const timeNow = Date.now();
  const tStamps = client.cooldowns.get(command.help.name);
  const cdAmount = (command.help.cooldown || 5) * 1000;

  if(tStamps.has(message.author.id)) {
    const cdExpirationTime = tStamps.get(message.author.id) + cdAmount;

    if(timeNow < cdExpirationTime) {
      timeLeft = (cdExpirationTime - timeNow) / 1000;
      if(timeLeft > 3600) { 
        let tim = Math.floor(timeLeft.toFixed(0) / 3600)
        let tims = Math.floor(timeLeft.toFixed(0) / 1440)
        return message.channel.send(`${config.emoji.error} \`ERROR\` Veuillez attendre ${tim} heures et ${tims} minutes avant de pouvoir refaire cette commande !`);
      }
      if(timeLeft > 60) { 
        let tim = Math.floor(timeLeft.toFixed(0) / 60)
        return message.channel.send(`${config.emoji.error} \`ERROR\` Veuillez attendre ${tim} minutes avant de pouvoir refaire cette commande !`);
      }
     
      else {
      return message.channel.send(`${config.emoji.error} \`ERROR\` Veuillez attendre ${timeLeft.toFixed(0)} seconde(s) avant de pouvoir refaire cette commande !`);
      }
    }
  }

  tStamps.set(message.author.id, timeNow)

  setTimeout(() => tStamps.delete(message.author.id), cdAmount);

  
 command.run(client, message, args)
}
};
