const config = require('../../config/config.json');
const Discord = require('discord.js');
const db = require('quick.db')

module.exports.run = async(client, message, args) => {
       
    if (!message.member.hasPermission("MANAGE_SERVER")) return message.channel.send(`${config.emoji.error} \`ERREUR\` Vous n'avez pas les permissions requises !`);
   
    let xyz = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!xyz) return message.channel.send(`${config.emoji.error} \`ERREUR\` Veuillez indiquer un membre existant !`);
    let user = xyz.user
    if(!user) return message.channel.send(`${config.emoji.error} \`ERREUR\` Veuillez indiquer un membre existant !`);

    let num = args[1];
    if(!args[1]) return message.channel.send(`${config.emoji.error} \`ERREUR\` Veuillez indiquer le nombre de warns à retirer !`);
    if(isNaN(args[1])) return message.channel.send(`${config.emoji.error} \`ERREUR\` Veuillez indiquer le nombre de warns à retirer !`);

    let warns = await db.subtract(`warn_${message.guild.id}_${user.id}`, num);

    let em = new Discord.MessageEmbed()
    .setAuthor('Warns', user.displayAvatarURL())
    .setDescription(`**${user.tag}** a maintenant ${warns} avertissements !`)
    .setColor(config.color.bot)

    message.channel.send(em)    
    }

    module.exports.help = {
        name: 'd-warns',
        category: 'moderation',
        description: 'Supprime un nombre d\'avertissement d\'un utilisateur',
        aliases: ["dwarns", 'delete-warns', 'del-warns'],
        usage: "<user>",
        cooldown: 5,
        args: true,
        guildOnly: true
    }