const config = require('../../config/config.json');
const Discord = require('discord.js'); 
module.exports.run = (client, message, args) => {
          
    const text = args.join(" ");

const embed = new Discord.MessageEmbed()
.setDescription(text)
   .setFooter(`${message.guild.name}・Embeds`, message.guild.iconURL())
  .setColor(`${config.color.bot}`)
  message.channel.send(embed)
}

    module.exports.help = {
        name: 'embed',
        category: 'utiles',
        description: 'Crée un embed avec le texte donné',
        aliases: [""],
        usage: "<message>",
        args: true,
        guildOnly: true
    }