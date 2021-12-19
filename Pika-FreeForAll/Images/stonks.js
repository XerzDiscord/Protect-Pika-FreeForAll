const config = require('../../config/config.json');
const Discord = require('discord.js');

module.exports.run = (client, message, args) => {

    const user = message.mentions.users.first()  || message.author;

    message.channel.send(`**📈 Stonks...**`);

const embed = new Discord.MessageEmbed()
 
 .setImage(`https://vacefron.nl/api/stonks?user=${user.displayAvatarURL()}?size=4096`)
      .setColor(`${config.color.embed}`)
 message.channel.send(embed)
}

    module.exports.help = {
        name: 'stonks',
        category: 'images',
        description: 'Stonks 📈',
        aliases: [""],
        usage: "<user>",
        cooldown: 1,
        args: false,
        guildOnly: false
    }