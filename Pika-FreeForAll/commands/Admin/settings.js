const config = require('../../config/config.json');
const Discord = require('discord.js');
const db = require('quick.db');

module.exports.run = async(client, message, args) => {

    let guild = message.guild;

     let prefix;
      if(message.channel.type === 'dm' || message.channel.type === 'group') {
        prefix = config.prefix;
      }
      else {
      prefix = db.get(`prefix_${message.guild.id}`) || config.prefix;
      }

    let statut = {
        "on": "Activé",
        "off": "Désactivé",
        "null": "Désactivé"
    }
    let sanctions = {
        "ban": "Bannissement",
        "kick": "Expulsion",
        "mute": "Mute",
        "null": "Non défini..."
    }

   if (!message.member.hasPermission(`ADMINISTRATOR`)) return message.channel.send(`${config.emoji.error} \`ERREUR\` Vous n'avez pas les permissions requises !`);
   if(args[0] === "logs" || args[0] === "logschannel") {
     let ch = message.mentions.channels.first() || message.guild.channels.cache.get(args[1])
     let log = message.guild.channels.cache.find(ch => ch.id === db.get(`logs_${message.guild.id}`)) || 'Non défini...';
     if(!ch) {
        let em = new Discord.MessageEmbed()
        .setTitle('🌹 `SETTINGS` Protect Xapex・📰 Logs Channel')
        .setDescription('Modifie le salon des logs !')
        .addField('⌛ Paramètres actuel :', log || "Non défini...")
        .addField('🖋️ Usage :', `\`${prefix}settings logs [channel]\``)
        .setColor(config.color.bot)
        return message.channel.send(em)
        }
       
       db.set(`logs_${guild.id}`, ch.id);

       return message.channel.send(`${config.emoji.succes} \`SUCCES\` Le salon des logs à bien été défini sur ${ch} !`)
      
   }
      if(args[0] === "prefix") {
   if(!args[1]) {
        let em = new Discord.MessageEmbed()
        .setTitle('📌 `SETTINGS` Aneko Protect・☎️ Prefix')
        .setDescription('Modifie le prefix du serveur !')
        .addField('⌛ Paramètres actuel :', prefix)
        .addField('🖋️ Usage :', `\`${prefix}settings prefix [new prefix]\``)
        .setColor(config.color.bot)
        return message.channel.send(em) 
        }
        if(args[1].length > 3) return message.channel.send(`${config.emoji.error} \`ERREUR\` Veuillez entrer un prefix moins long que 3 caractères !`);
    
      db.set(`prefix_${message.guild.id}`, args[1])
    return message.channel.send(`${config.emoji.succes} \`SUCCES\` Mon prefix à été modifié en **${args[1]}**`)
    
  }

  if(args[0] === "delinvoke") {
    if(!["on", "off"].includes(args[1])) {
    let em = new Discord.MessageEmbed()
    .setTitle('🌹 `SETTINGS` Protect Xapex・🧻 Suppression des commandes')
    .setDescription('Permet de supprimer ou non l\'invocation de mes commandes !')
    .addField('⌛ Paramètres actuel :', statut[db.get(`delinvoke_${guild.id}`)])
    .addField('🖋️ Usage :', `\`${prefix}settings delinvoke [on/off]\``)
    .setColor(config.color.bot)
    return message.channel.send(em)
    }

    db.set(`delinvoke_${guild.id}`, args[1]);

    if(args[1] === "on") return message.channel.send(`${config.emoji.succes} \`SUCCES\` Les invocations de mes commandes seront maintenant supprimées !`)
    if(args[1] === "off") return message.channel.send(`${config.emoji.succes} \`SUCCES\` Les invocatoins de mes commandes ne seront maintenant pas supprimées !`)
    
  } 
  if(args[0] === "anti-add-bot" || args[0] === "anti-addbot") {
    if(!["on", "off"].includes(args[1])) {
        let em = new Discord.MessageEmbed()
        .setTitle('🌹 `SETTINGS` Protect Xapex・🤖 Anti add-bot')
        .setDescription('Permet d\'empêcher les bots de rejoindre le serveur !')
        .addField('⌛ Paramètres actuel :', statut[db.get(`antibots_${guild.id}`)])
        .addField('🖋️ Usage :', `\`${prefix}settings anti-addbot [on/off]\``)
        .setColor(config.color.bot)
        return message.channel.send(em)
        }
       db.set(`antibots_${guild.id}`, args[1]);

    return message.channel.send(`${config.emoji.succes} \`SUCCES\` Le module anti **add-bot** à été mis sur **${args[1]}** !`)
   
}

if(args[0] === "anti-links" || args[0] === "anti-link") {
    if(!["on", "off"].includes(args[1])) {
        let em = new Discord.MessageEmbed()
        .setTitle('🌹 `SETTINGS` Protect Xapex・🏹 Anti Links')
        .setDescription('Empêche ou non les utilisateur de poster des liens !')
        .addField('⌛ Paramètres actuel :', statut[db.get(`antilinks_${guild.id}`)])
        .addField('🖋️ Usage :', `\`${prefix}settings anti-links [on/off]\``)
        .setColor(config.color.bot)
        return message.channel.send(em)
        }
            db.set(`antilinks_${guild.id}`, args[1]);

 return message.channel.send(`${config.emoji.succes} \`SUCCES\` Le module anti **links** à été mis sur **${args[1]}** !`)

} 

if(args[0] === "anti-everyone/here") {
    if(!["on", "off"].includes(args[1])) {
        let em = new Discord.MessageEmbed()
        .setTitle('🌹 `SETTINGS` Protect Xapex・💤 Anti Everyone')
        .setDescription('Empêche ou non les utilisateur de mentionner everyone ou here !')
        .addField('⌛ Paramètres actuel :', statut[db.get(`antieveryone_${guild.id}`)])
        .addField('🖋️ Usage :', `\`${prefix}settings anti-everyone [on/off]\``)
        .setColor(config.color.bot)
        return message.channel.send(em)
        }
            db.set(`antieveryone_${guild.id}`, args[1]);

 return message.channel.send(`${config.emoji.succes} \`SUCCES\` Le module anti **everyone/here** à été mis sur **${args[1]}** !`)

}
if(args[0] === "anti-channels" || args[0] === "anti-newchannel") {
    if(!["on", "off"].includes(args[1])) {
        let em = new Discord.MessageEmbed()
        .setTitle('🌹 `SETTINGS` Protect Xapex・🔪 Anti New Channels')
        .setDescription('Empêche ou non les utilisateur de crée des salons !')
        .addField('⌛ Paramètres actuel :', statut[db.get(`antichannels_${guild.id}`)])
        .addField('🖋️ Usage :', `\`${prefix}settings anti-channels [on/off]\``)
        .setColor(config.color.bot)
        return message.channel.send(em)
        }
            db.set(`antichannels_${guild.id}`, args[1]);

return message.channel.send(`${config.emoji.succes} \`SUCCES\` Le module anti **channels** à été mis sur **${args[1]}** !`)

}

else {
 let em = new Discord.MessageEmbed()
 .setColor(config.color.bot)
 .setTitle(`**🌹 \`SETTINGS\` Configuration des paramètres de **Protect Xapex** :**`, true)
 .setDescription(`Faites **${prefix}settings [modules] [parametre]** pour configurer le modules.`, true)
 .addField(`📞 Prefix :`, `**${prefix}settings prefix [new prefix]** pour changer le prefix du bot !`, true)
 .addField(`📰 Logs :`, `**${prefix}settings logs #channel** pour changer le salon des logs !`, true)
 .addField(`🧻 Delinvoke :`, `**${prefix}settings delinvoke [on/off]** pour supprimer ou non l'appel de mes commandes !`, true)
 .addField(`🤖 Anti AddBot :`, `**${prefix}settings anti-addbot [on/off]** pour empêcher les bots de rejoindre le serveur sans autorisation de l'owner !`, true)
 .addField(`🏹 Anti Links :`, `**${prefix}settings anti-links [on/off]** pour empêcher les membres de poster des liens d'invitations et autres dans les salons non autorisés !`, true)
 .addField(`💤 Anti Everyone/Here :`, `**${prefix}settings anti-everyone/here [on/off]** pour empêcher les membres d'utiliser la mention everyone et here !`, true)
 .addField(`🔪 Anti New Channels :`, `**${prefix}settings anti-channels [on/off]** pour empêcher quiconque de crée des salons !`, true)
 .setFooter(config.footer, client.user.displayAvatarURL())

 return message.channel.send(em)
}
 };

    module.exports.help = {
        name: 'settings',
        category: 'admin',
        description: 'Configure le module anti raid',
        aliases: ["set", "setting"],
        usage: "<module>",
        cooldown: 5,
        args: false,
        guildOnly: true
    }