const config = require('../../config/config');
const Discord = require('discord.js');
const db = require('quick.db')
module.exports.run = async(client, message, args) => {

   if (!message.member.hasPermission(`MANAGE_SERVER`)) return message.channel.send(`${config.emoji.error} \`ERREUR\` Vous devez avoir la permission administrateur pour utiliser cette commande !`);

   let guild = message.guild;

   let prefix = db.get(`prefix_${message.guild.id}`) || config.prefix;


 let statut = {
        "on": "Activé",
        "off": "Désactivé",
        "null": "Désactivé"
    }
    let sanctions = {
        "ban": "Bannissement",
        "kick": "Expulsion",
        "mute": "Mute",
        "null": "Non défini..."
    }
    
    let em = new Discord.MessageEmbed()
    .setColor(config.color.bot)
    .setTitle(`**Voici la configuration du serveur :**`)
 .addField(`📰 Logs :`, message.guild.channels.cache.get(db.get(`logs_${guild.id}`)) || 'Non défini...')
 .addField(`☎️ Préfixe :`, prefix, true)
 .addField(`🧻 Delinvoke :`, statut[db.get(`delinvoke_${guild.id}`)], true)
 .addField(`🤖 Anti AddBot :`, statut[db.get(`antibots_${guild.id}`)], true)
 .addField(`🏹 Anti Links :`, statut[db.get(`antilinks_${guild.id}`)], true)
 .addField(`💤 Anti Everyone/Here :`, statut[db.get(`antieveryone_${guild.id}`)], true)
 .addField(`🔪 Anti New Channels :`, statut[db.get(`antichannels_${guild.id}`)], true)
 .setFooter(config.footer, client.user.displayAvatarURL())
    .setFooter('Configuration', message.author.displayAvatarURL())

    return message.channel.send(em)
}

    module.exports.help = {
        name: 'configinfos',
        category: 'admin',
        description: 'Affiche la configuration du serveur',
        aliases: ["config-infos", "configs"],
        usage: " ",
        cooldown: 5,
        args: false,
        guildOnly: true
    }