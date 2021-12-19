const config = require('../../config/config.json');
const Discord = require('discord.js'); 
const translate = require('@vitalets/google-translate-api');

module.exports.run = (client, message, args) => {
          try {
    let lang = args[0]
    let text = args.slice(1).join(" ");

    translate(text, {to: lang}).then(res => {
const embed = new Discord.MessageEmbed()
  .setAuthor(message.author.tag, message.author.displayAvatarURL())
  .setDescription(res.text)
  .setColor(`${config.color.embed}`)
  message.channel.send(embed)
});
          } catch(e) {
              message.channel.send(`${config.emoji.error} \`ERROR\` La langue choisie est invalide !`)
          }
}

    module.exports.help = {
        name: 'translate',
        category: 'utiles',
        description: 'Traduis un texte dans la langue choisis',
        aliases: ["traduction", "trans", "trad"],
        usage: "<lang + text>",
        cooldown: 1,
        args: true,
        guildOnly: false
    }