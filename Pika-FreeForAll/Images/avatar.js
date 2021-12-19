const config = require('../../config/config.json');
const Discord = require('discord.js');

module.exports.run = (client, message, args) => {

    let user;
    if(args.length) {
    user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase() === args.join(' ').toLocaleLowerCase());
    }
    if(!args.length) {
    user = message.member;
    }
    if(!user) return message.channel.send(`${config.emoji.error} \`ERROR\` Utilisateur non trouvé !`)

    const embed = new Discord.MessageEmbed()
   .setDescription(`**📌 Avatar de ${user.user.tag} :**`)
   .setColor(`${config.color.bot}`)
   .setImage(url = user.user.displayAvatarURL({ dynamic: true, size: 512 }))
   .setTimestamp()

message.channel.send(embed)
      
    }

    module.exports.help = {
        name: 'avatar',
        category: 'images',
        description: 'Obtiens l\'avatar d\'un membre',
        aliases: ["pic", "profilepic"],
        usage: "<user>",
        cooldown: 1,
        args: false,
        guildOnly: false
    }