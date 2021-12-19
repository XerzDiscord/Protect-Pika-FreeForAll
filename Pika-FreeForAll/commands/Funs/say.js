const config = require('../../config/config.json');
const Discord = require('discord.js');

module.exports.run = (client, message, args) => {
  
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`${config.emoji.error} \`ERREUR\` Vous n'avez pas les permissions requises !`);
    if (message.mentions.has("@everyone" || "@here")) return;
    const sayMessage = args.join(" ");
   
    message.channel.send(sayMessage)
    message.delete();
}

    module.exports.help = {
        name: 'say',
        category: 'funs',
        description: 'Parle avec le bot',
        aliases: ["dire", "repeat", "repete"],
        usage: "<message>",
        args: true,
        guildOnly: false
    }