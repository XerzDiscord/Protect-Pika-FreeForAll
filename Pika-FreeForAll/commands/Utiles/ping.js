const config = require('../../config/config.json');
const Discord = require('discord.js');

module.exports.run = (client, message, args) => {

        message.channel.send('🏓 Pinging...').then(msg => {
            setTimeout(() => {
                const embed = new Discord.MessageEmbed()
         
                .setDescription(`Latence du bot **${msg.createdTimestamp - message.createdTimestamp}ms**`)
                .setColor(`${config.color.embed}`)
                message.channel.send(embed)
                
            }, 1000);
        })
    }

    module.exports.help = {
        name: 'ping',
        category: 'utiles',
        description: 'Tac, toc 🏓',
        aliases: ["latency"],
        cooldown: 1,
        usage: " ",
        args: false,
        guildOnly: false
    }