const config = require('../../config/config.json');
const Discord = require('discord.js');
const db = require('quick.db');

module.exports.run = async(client, message, args) => {

   if (message.author.id !== message.guild.owner.user.id) return message.channel.send(`${config.emoji.error} \`ERREUR\` Vous n'avez pas les permissions requises !`);

   if (!["add", "remove"].includes(args[0])) return message.channel.send(`${config.emoji.error} \`ERREUR\` Usage invalide : \`whitelist <add/remove> <user> [reason]\``);

   let user = message.mentions.users.first() || message.guild.members.cache.get(args[1]);
   if (!user) return message.channel.send(`${config.emoji.error} \`ERREUR\` Veuillez indiquer un utilisateur valide !`);

   if(args[0] === "add") {
   let reason = args.slice(2).join(" ") || "Aucune raison donnée...";

   if(db.get(`whitelist_${user.id}_${message.guild.id}`) === "on") return message.channel.send(`${config.emoji.error} \`ERROR\` Cette utilisateur est déjà dans ma whitelist !`)

   let em = new Discord.MessageEmbed()
   .setAuthor('Whitelist', user.displayAvatarURL({dynamic: true}))
   .setDescription(`${user} à été ajouté à la whitelist !`)
   .setColor(config.color.bot)
   .setTimestamp()

   message.channel.send(em)

   db.set(`whitelist_${user.id}_${message.guild.id}`, 'on')
  } // Unwhitelist

  if(args[0] === "remove") {
    let reason = args.slice(2).join(" ") || "Aucune raison donnée...";
    
    if(db.get(`whitelist_${user.id}_${message.guild.id}`) === "off") return message.channel.send(`${config.emoji.error} \`ERROR\` Cette utilisateur n'est pas dans ma whitelist !`)
 
    let em = new Discord.MessageEmbed()
    .setAuthor('Whitelist', user.displayAvatarURL({dynamic: true}))
    .setDescription(`${user} à été retiré à la whitelist !`)
    .setColor(config.color.bot)
    .setTimestamp()
 
    message.channel.send(em)
 
     db.set(`whitelist_${user.id}_${message.guild.id}`, 'off')
   }
}

    module.exports.help = {
        name: 'whitelist',
        category: 'owner',
        description: 'Ajoute un utilisateur à la whitelist',
        aliases: [""],
        usage: "<add/remove> <user> [reason]",
        cooldown: 5,
        args: true,
        guildOnly: true
    }