const config = require('../../config/config.json');
const Discord = require('discord.js');
var fetch = require('node-fetch');
const translate = require('@vitalets/google-translate-api');

module.exports.run = async(client, message, args) => {

    if(["beauf", "global", "limit", "dev", "dark", "blondes"].includes(args[0])) {
  
    await fetch(`https://www.blagues-api.fr/api/type/${args[0]}/random`, {
        headers: {
            'Authorization': `Bearer ${config.blaguetoken}`
        }
    })
    .then(res => res.json())
    .then(data => {
        const { joke, answer, id } = data;

        const embed = new Discord.MessageEmbed()
            .setColor(config.color.bot)
            .setAuthor(args[0].charAt(0).toUpperCase() + args[0].substring(1).toLowerCase(), message.author.displayAvatarURL({ dynamic: true }))
            .setDescription("**" + joke + "**" + "\n Réponse: ||" + answer + "||")
            .setFooter(`ID : ${id}`)
            .setTimestamp();
        message.channel.send(embed);
    });
} else if (args[0] === "id") {
  
    await fetch(`https://www.blagues-api.fr/api/id/${args[1]}`, {
        headers: {
            'Authorization': `Bearer ${config.blaguetoken}`
        }
    })
    .then(res => res.json())
    .then(data => {
        const { joke, answer, id } = data;

        const embed = new Discord.MessageEmbed()
            .setColor(config.color.bot)
            .setAuthor('Random', message.author.displayAvatarURL({ dynamic: true }))
            .setDescription("**" + joke + "**" + "\n Réponse: ||" + answer + "||")
            .setFooter(`ID : ${id}`)
            .setTimestamp();
      return  message.channel.send(embed);
    });

}
// Else 
else {
  
    await fetch(`https://www.blagues-api.fr/api/random`, {
        headers: {
            'Authorization': `Bearer ${config.blaguetoken}`
        }
    })
    .then(res => res.json())
    .then(data => {
        const { joke, answer, id } = data;

        const embed = new Discord.MessageEmbed()
            .setColor(config.color.bot)
            .setAuthor('Random', message.author.displayAvatarURL({ dynamic: true }))
            .setDescription("**" + joke + "**" + "\n Réponse: ||" + answer + "||")
            .setFooter(`ID : ${id}`)
            .setTimestamp();
        message.channel.send(embed);
    });
  }
}
    module.exports.help = {
        name: 'joke',
        category: 'funs',
        description: 'Envoi une blague',
        aliases: ["blague"],
        usage: "",
        cooldown: 2,
        args: false,
        guildOnly: false
    }