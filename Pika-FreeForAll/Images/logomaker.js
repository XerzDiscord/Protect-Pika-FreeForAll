const config = require('../../config/config.json');
const Discord = require('discord.js');

module.exports.run = async(client, message, args) => {

   const text = args.join(" ");

const embed = new Discord.MessageEmbed()
 .setAuthor(`✏️ Logo pour ${text} :`)
 .setImage(`https://gdcolon.com/tools/gdlogo/img/${text}`)
      .setColor(`${config.color.embed}`)
 message.channel.send(embed)
 };

    module.exports.help = {
        name: 'logomaker',
        category: 'images',
        description: 'Genère un logo avec le texte donné',
        aliases: ["logo-maker"],
        usage: "<lien/texte>",
        cooldown: 1,
        args: true,
        guildOnly: false
    }