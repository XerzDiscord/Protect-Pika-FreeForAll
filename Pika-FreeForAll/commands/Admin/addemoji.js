const config = require('../../config/config.json')
module.exports.run = (client, message, args) => {
    const name = args[0];
    if(!name || name.length < 2) return message.channel.send(`${config.emoji.error} \`ERROR\` Merci de spécifier un nom valide pour l'emoji !`);

    const url = args[1];
    if(!url) return message.channel.send(`${config.emoji.error} \`ERROR\` Merci de spécifier un emoji !`);

    const isEmoji = require('discord.js').Util.parseEmoji(url);
    if(!isEmoji && !/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi.test(url)) return message.channel.send(`${config.emoji.error} \`ERROR\ Veuillez donner un emoji valide !`)
    if(isEmoji && isEmoji.id) {
        message.guild.emojis.create(`https://cdn.discordapp.com/emojis/${isEmoji.id}.${isEmoji.animated ? 'gif' : 'png'}`, name)
            .then((emoji) => {
                message.channel.send(`${config.emoji.succes} \`SUCCES\` L'emoji \`:${emoji.name}:\` ${emoji} a été ajouté avec succes !`);
            }).catch((err) => {
                if(err.code === 30008) return message.channel.send(`${config.emoji.error} \`ERROR\` Vous avez atteint la limite d\'emojis sur votre serveur !`);
                if(err.code === 50035) return message.channel.send(`${config.emoji.error} \`ERROR\` Lien invalide ou taille de fichier supérieur à \`256kb\` !`);
                message.channel.send(`${config.emoji.error} \`ERROR\` Une erreur est survenue !`);
                console.error(err);
            });
    }
}

module.exports.help = {
    name: "addemoji",
    aliases: ["addemoji", "add-emoji", "emojiadd", "emoji-add"],
    category: 'mods',
    description: "Créé un emoji à parti d'un lien ou d'un emoji provenant d'un autre serveur.",
    usage: "[nom] [url | emoji]",
    cooldown: 10,
    args: true,
    guildOnly: true
}