const config = require('../../config/config.json');
const Discord = require('discord.js');

module.exports.run = (client, message, args) => {

      const guild = message.guild;

  const embed = new Discord.MessageEmbed()
     
  
  .setAuthor(`✏️ Icône de ${guild.name} :`)
     .setImage(guild.iconURL({ dynamic: true, size: 512 }))
          .setColor(`${config.color.embed}`)
     message.channel.send(embed)
    }

    module.exports.help = {
        name: 'server-icon',
        category: 'images',
        description: 'Obtiens l\'icone du serveur !',
        aliases: ["pic-server", "serverpic", "ppserver"],
        usage: "",
        cooldown: 1,
        args: false,
        guildOnly: true
    }