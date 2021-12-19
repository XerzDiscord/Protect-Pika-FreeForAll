const config = require('../../config/config.json');
const Discord = require('discord.js'); 
const moment = require('moment');
const db = require('quick.db')
module.exports.run = (client, message, args) => {
    
    let member;
    if(args.length) {
    member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase());
    }
    if(!args.length) {
     member = message.member;
    }
    let user;
    if(member) {
    user = member.user;
    }
    else return message.channel.send(`${config.emoji.error} \`ERREUR\` Veuillez indiquez un membre existant !`);
   
    
    const sta = {
        "on": "Oui",
        "off": "Non",
        "null": "Non"
    }
     statuts = user.presence.status;
     statut = statuts.replace(/online/g, `${config.emoji.online} Online`).replace(/offline/g, `${config.emoji.offline} Offline`).replace(/idle/g, `${config.emoji.idle} Idle`).replace(/dnd/g, `${config.emoji.dnd} Dnd`)

const embed = new Discord.MessageEmbed()
  .setTitle(`**✉️ Infos sur ${user.username}**`)
.addFields(
 {name: `**Nom + tag :**`, value: `${user.tag}`, inline: true},
 {name: `**ID :**`, value: `${user.id}`, inline: true},
 {name: `**Bot :**`, value: `${user.bot ? 'Oui' : 'Non'}`, inline: true},
 {name: `**Création :**`, value: `${moment(user.createdAt).format('DD/MM/YYYY')}`, inline: true},
 {name: `**Statut :**`, value: `${statut}`, inline: true},
 {name: `**Rejoint le serveur :**`, value: `${moment(member.joinedAt).format('DD/MM/YYYY ˖ hh:mm')}`, inline: true},
 {name: `**Rôles :**`, value: `${member.roles.cache.filter(r => r.name !== "@everyone").map(roles => `\`${roles.name}\``).join(", ") || 0}`},
  {name: `**Premium**`, value: sta[db.get(`premium_${user.id}`)]},
)
 
  .setThumbnail(user.displayAvatarURL())
  .setColor(`${config.color.embed}`)
  message.channel.send(embed)
}

    module.exports.help = {
        name: 'user-infos',
        category: 'utiles',
        description: 'Obtiens des infos sur un membre',
        aliases: ["ui", "userinfo", "userinfos"],
        usage: "<user>",
        cooldown: 1,
        args: false,
        guildOnly: true
    }