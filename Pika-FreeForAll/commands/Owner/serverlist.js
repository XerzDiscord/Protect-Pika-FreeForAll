let Discord = require('discord.js');
let config = require('../../config/config');

module.exports.run = (client, message, args) => {

   
    let guilds = ''; 

    client.guilds.cache.forEach(guild => {
    guilds += guild.name + '\n';})

    let em = new Discord.MessageEmbed()
    .setTitle('Voici les serveurs dans lesquels je suis :')
    .setColor(config.color.bot)
    .setDescription(guilds)

    message.channel.send(em)
}

module.exports.help = {
    name: 'serverlist',
    category: 'owner',
    description: 'Affiche les serveurs du bot',
    aliases: ["serveurs"],
    usage: " ",
    cooldown: 1,
    args: false,
    guildOnly: false
}