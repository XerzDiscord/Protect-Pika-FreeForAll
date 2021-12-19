const config = require('../../config/config.json');
const Discord = require('discord.js'); 
const moment = require('moment');

module.exports.run = (client, message, args) => {
          
    const guild = message.guild;
    let channel = message.mentions.channels.first() || client.guilds.cache.get(message.guild.id).channels.cache.get(args[0]) || message.guild.channels.cache.find(r => r.name.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.channel; 
    if(!channel) return message.channel.send(`${config.emoji.error} \`ERREUR\` Veuillez indiquez un salon existant !`);
   
   
    const type = channel.type.replace(/text/g, `✏️ Text`).replace(/voice/g, `🔊 Vocal`)

    const nsfw = {
        false: "Non",
        true: "Oui"
    }

const embed = new Discord.MessageEmbed()
   .setTitle(`**✉️ Infos sur ${channel.name}**`)
.addFields(
  {name: `**Nom :**`, value: `${channel.name}`, inline: true},
  {name: `**Id :**`, value: `${channel.id}`, inline: true},
  {name: `**Crée le :**`, value: `${moment(channel.createdAt).format('DD/MM/YYYY')}`, inline: false},
  {name: `**Type :**`, value: `${type}`, inline: true}
)
  .setThumbnail(guild.iconURL())
  .setColor(`${config.color.embed}`)
  if(channel.type === "text") {
    embed.addField('Nsfw :', nsfw[channel.nsfw], true)
  }
  message.channel.send(embed)
}

    module.exports.help = {
        name: 'channel-infos',
        category: 'utiles',
        description: 'Obtiens des infos sur un salon',
        aliases: ["ci", "channelinfo", "channelinfos"],
        usage: "<channel>",
        cooldown: 1,
        args: false,
        guildOnly: true
    }