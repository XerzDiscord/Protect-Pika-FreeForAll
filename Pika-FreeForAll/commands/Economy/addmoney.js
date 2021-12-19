const config = require('../../config/config.json');
const Discord = require('discord.js');
let db = require('quick.db');

module.exports.run = (client, message, args) => {
   
    if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`${config.emoji.error} \`ERREUR\` Vous devez avoir la permission administrateur pour utiliser cette commande !`)

    if(isNaN(args[0]) || args[0] <= 0 || args[0] > 20000) return message.channel.send(`${config.emoji.error} \`ERREUR\` Veuillez indiquer une somme entre 1 et 20000 !`)
    
    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!user) return message.channel.send(`${config.emoji.error} \`ERREUR\` Veuillez indiquer un utilisateur !`)
    if(user.bot) return message.channel.send(`${emoji.error} \`ERREUR\` Vous ne pouvez pas retirer ni ajouter de l'argent à un bot !`);
    
    let em = new Discord.MessageEmbed()
    .setDescription(`${message.author} a bien ajouté \`${args[0]}\` 💰 à ${user}`)
    .setColor(config.color.bot)
    .setAuthor(user.user.tag, user.user.displayAvatarURL())

    message.channel.send(em)

    db.add(`money_${message.guild.id}_${message.author.id}`, args[0])
   

  }
    module.exports.help = {
        name: 'addmoney',
        category: 'economy',
        description: 'Ajouter de l\'argent à un utilisateur !',
        aliases: ["add-money", "am"],
        usage: "<argent> <utilisateur>",
        cooldown: 1,
        args: true,
        guildOnly: true
    }