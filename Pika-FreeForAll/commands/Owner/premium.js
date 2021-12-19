const config = require('../../config/config.json');
const Discord = require('discord.js');
const db = require('quick.db');

module.exports.run = async(client, message, args) => {

   if (!message.author.id === config.owners.yuko || !message.author.id === config.owners.xapex) return message.channel.send(`${config.emoji.error} \`ERREUR\` Vous n'avez pas les permissions requises !`);

   if (!["add", "remove"].includes(args[0])) return message.channel.send(`${config.emoji.error} \`ERREUR\` Usage invalide : \`premium <add/remove> <user> [reason]\``);

   let user = message.mentions.users.first() || message.guild.members.cache.get(args[1]);
   if (!user) return message.channel.send(`${config.emoji.error} \`ERREUR\` Veuillez indiquer un utilisateur valide !`);

   if(args[0] === "add") {

   if(db.get(`premium_${user.id}`) === "on") return message.channel.send(`${config.emoji.error} \`ERROR\` Cette utilisateur a déjà le premium !`)

   let em = new Discord.MessageEmbed()
   .setAuthor('Premium', user.displayAvatarURL({dynamic: true}))
   .setDescription(`${user} à bien obtenu le premium !`)
   .setColor(config.color.bot)
   .setTimestamp()

   message.channel.send(em)

   db.set(`premium_${user.id}`, 'on')
  } // Unpremium

  if(args[0] === "remove") {
    let reason = args.slice(2).join(" ") || "Aucune raison donnée...";
    
    if(db.get(`premium_${user.id}`) === "off") return message.channel.send(`${config.emoji.error} \`ERROR\` Cette utilisateur n'a pas le premium !`)
 
    let em = new Discord.MessageEmbed()
    .setAuthor('Premium', user.displayAvatarURL({dynamic: true}))
    .setDescription(`${user} n'a maintenant pu le premium !`)
    .setColor(config.color.bot)
    .setTimestamp()
 
    message.channel.send(em)
 
     db.set(`premium_${user.id}`, 'off')
   }
}

    module.exports.help = {
        name: 'premium',
        category: 'owner',
        description: 'Ajoute un utilisateur à la premium',
        aliases: [""],
        usage: "<add/remove> <user>",
        cooldown: 5,
        args: true,
        guildOnly: true
    }