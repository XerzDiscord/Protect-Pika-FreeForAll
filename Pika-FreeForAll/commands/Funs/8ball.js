const config = require('../../config/config.json');
const Discord = require('discord.js');

module.exports.run = (client, message, args) => {
      
    let reponses = ["Oui...", "Non.", "Absolument !", "Au contraire...", "Tellement !", "Hum...", "Reessaye !", "Peut-être", "Evidemment !", "Mais encore...", "Nani ?!", "Voyons..."];
    let question = args.join(" ");
    let reponse = Math.floor(Math.random() * reponses.length);
    let ball = reponses[reponse];

const embed = new Discord.MessageEmbed()
 
.setAuthor('🔮 8ball')
 .setFooter(message.author.username, message.author.displayAvatarURL())
 .addField('**Question :**', `${question}`)
 .addField('**Réponse :**', `${ball}`)
 .setColor(`${config.color.bot}`)
 message.channel.send(embed)
    }

    module.exports.help = {
        name: '8ball',
        category: 'funs',
        description: 'Pose une question et le bot y répondra',
        aliases: ["21ball"],
        usage: "<question>",
        cooldown: 2,
        args: true,
        guildOnly: false
    }