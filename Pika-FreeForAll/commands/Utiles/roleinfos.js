const config = require('../../config/config.json');
const Discord = require('discord.js'); 
const moment = require('moment');

module.exports.run = (client, message, args) => {
          
    let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]) || message.guild.roles.cache.find(r => r.name.toLowerCase() === args.join(' ').toLocaleLowerCase());
    if(!role) return message.channel.send(`${config.emoji.error} \`ERREUR\` Veuillez indiquez un rôle existant !`);
   
    const status = {
            false: "Oui",
            true: "Non"
        }

        let roleembed = new Discord.MessageEmbed()
            .setColor(config.color.bot)
            .setTitle(`**✉️ Infos sur ${role.name}**`)
            .setThumbnail(message.guild.iconURL())
            .addField("**ID :**", `\`${role.id}\``, true)
            .addField("**Name : **", role.name, true)
            .addField("**Color/Hex :**", `\`${role.hexColor}\``, true)
            .addField("**Membres :**", role.members.size, true)
            .addField("**Position :**", role.position, true)
            .addField("**Mentionnable :**", status[role.mentionable], true)
        message.channel.send(roleembed);
}

    module.exports.help = {
        name: 'role-infos',
        category: 'utiles',
        description: 'Obtiens des infos sur un rôle',
        aliases: ["ri", "roleinfo", "roleinfos"],
        usage: "<role>",
        cooldown: 1,
        args: true,
        guildOnly: true
    }