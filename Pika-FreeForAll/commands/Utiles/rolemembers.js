const config = require('../../config/config.json');
const Discord = require('discord.js'); 
const moment = require('moment');

module.exports.run = (client, message, args) => {
          
    if (args.includes("@everyone")) return;
        
        if (args.includes("@here")) return;

        let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]) || message.guild.roles.cache.find(r => r.name.toLowerCase() === args.join(' ').toLocaleLowerCase());
    if(!role) return message.channel.send(`${config.emoji.error} \`ERREUR\` Veuillez indiquez un rôle existant !`);
   
       let membersWithRole = message.guild.members.cache.filter(member => {
            return member.roles.cache.find(r => r.name === role.name);
        }).map(member => {
            return member.user.tag;
        })
        if (membersWithRole > 2048) return message.channel.send(`${config.emoji.error} \`ERREUR\` Plus de 2048 membres possèdent ce rôle !`)

        let roleEmbed = new Discord.MessageEmbed()
            .setColor(config.color.bot)
            .setThumbnail(message.guild.iconURL())
            .setTitle(`**Membres avec le rôle : \`${role.name}\`**`)
            .setDescription(membersWithRole.join("\n"));
        message.channel.send(roleEmbed);
}

    module.exports.help = {
        name: 'role-members',
        category: 'utiles',
        description: 'Obtiens une liste des membre possédant un rôle',
        aliases: ["rm", "rolemembers", "rolemember"],
        usage: "<user>",
        cooldown: 1,
        args: true,
        guildOnly: true
    }