const config = require('../../config/config.json');
const Discord = require('discord.js'); 
const moment = require('moment');
const emote = config.emoji;

module.exports.run = (client, message, args) => {
 
if(message.content.split(':')[2] === undefined) return message.channel.send(`${emote.error} \`ERROR\` Veuillez indiquer un emoji valide !`);
        
const emojiID = message.content.split(':')[2].replace(">", "");
if(!emojiID) return message.channel.send(`${emote.error} \`ERROR\` Veuillez indiquer un emoji valide !`);

const emoji = message.guild.emojis.cache.get(emojiID);
if(emoji === undefined || !emoji.available || emoji.deleted) return message.channel.send(`${emote.error} \`ERROR\` Impossible de trouver cet emoji dans le serveur !`);

const embed = new Discord.MessageEmbed()
    .setColor(config.color.embed)
    .addFields(
        { name: "**Nom + Id**", value: `\`<${emoji.animated ? "a" : ""}:${emoji.name}:${emoji.id}>\``, inline: true },
        { name: "**Créé le**", value: moment(emoji.createdAt).format('DD/MM/YYYY'), inline: false },
        { name: "**Type**", value: emoji.animated ? "Animé" : "Normal", inline: true },
        { name: "**Lien**", value: `[Clique ici](${emoji.url})`, inline: true },
    )
    .setImage(emoji.url)

 message.channel.send(embed)
}

    module.exports.help = {
        name: 'emoji',
        category: 'utiles',
        description: 'Obtiens des informations sur un emoji',
        aliases: ["emoji-infos"],
        usage: "<emoji>",
        cooldown: 1,
        args: false,
        guildOnly: true
    }