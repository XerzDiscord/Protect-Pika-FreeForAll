const config = require('../../config/config.json');
const Discord = require('discord.js');
let db = require('quick.db');

module.exports.run = (client, message, args) => {
    
    let user;
    if(args.length) {
    let xyz = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase() === args.join(' ').toLocaleLowerCase());
    user = xyz.user;
    }
    if(!args.length) {
        user = message.author;
    }

    if(!user) return message.channel.send(`${emoji.error} \`ERREUR\` Utilisateur non trouvé !`);
    if(user.bot) return;
    
    let money = db.get(`money_${message.guild.id}_${user.id}`) || 0;

    let em = new Discord.MessageEmbed()
    .setDescription(`**Money :** \`${money}\` 💰`)
    .setColor(config.color.bot)
    .setAuthor(user.tag, user.displayAvatarURL())

    message.channel.send(em)

  }
    module.exports.help = {
        name: 'balance',
        category: 'economy',
        description: 'Affiche l\'argent d\'un utilisateur !',
        aliases: ["bal", "money"],
        usage: "<utilisateur>",
        cooldown: 2,
        args: false,
        guildOnly: true
    }