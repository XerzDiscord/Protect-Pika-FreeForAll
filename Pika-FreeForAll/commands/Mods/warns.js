const config = require('../../config/config.json');
const Discord = require('discord.js');
const db = require('quick.db')

module.exports.run = async(client, message, args) => {
       
    if (!message.member.hasPermission("MANAGE_SERVER")) return message.channel.send(`${config.emoji.error} \`ERREUR\` Vous n'avez pas les permissions requises !`);
   
    let xyz = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!xyz) return message.channel.send(`${config.emoji.error} \`ERREUR\` Veuillez indiquer un membre existant !`);
    let user = xyz.user
    if(!user) return message.channel.send(`${config.emoji.error} \`ERREUR\` Veuillez indiquer un membre existant !`);

    let warns = db.get(`warn_${message.guild.id}_${user.id}`) || 0;
    let raison = db.get(`raison_${message.guild.id}_${user.id}`);
    if(warns <= "0") raison = 'Aucun warn...';
   

    let em = new Discord.MessageEmbed()
    .setAuthor('Warns', user.displayAvatarURL())
    .setDescription(`**${user.tag}** a ${warns} avertissements !`)
    .addField('Dernière raison :', raison)
    .setColor(config.color.bot)

    message.channel.send(em)    
    }

    module.exports.help = {
        name: 'warns',        
        category: 'moderation',
        description: 'Affiche les avertissement d\'un utilisateur',
        aliases: ["avertissements"],
        usage: "<user>",
        cooldown: 5,
        args: true,
        guildOnly: true
    }