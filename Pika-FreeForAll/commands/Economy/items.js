const config = require('../../config/config.json');
const Discord = require('discord.js');
let db = require('quick.db');

module.exports.run = (client, message, args) => {
    
    if(!["sword", "epee", "horse", "cheval", "armure", "pick", "pioche", "prisme", "pyron", "crystal"].includes(args[0])) return message.channel.send(`${config.emoji.error} \`ERREUR\` Item invalide ! Différents items : \`<sabre, pioche, armure, cheval, prisme, crystal, pyron>\``)
    
    let name;
    let max;
    let prix;
    if(["sword", "epee"].includes(args[0])) {
        name = "Sword",
        prix = 1500
        max = 5
    }
    if(["cheval", "horse"].includes(args[0])) {
        name = "Horse",
        prix = 8000
        max = 1
    }
    if(["armure", "armor"].includes(args[0])) {
        name = "Armure",
        prix = 2100
        max = 2
    }
    if(["pick", "pioche"].includes(args[0])) {
        name = "Pioche",
        prix = 400
        max = 5
    } 
    if(["prisme"].includes(args[0])) {
        name = "Prisme",
        prix = 500
        max = 20
    }
    if(["crystal"].includes(args[0])) {
        name = "Crystal",
        prix = 200
        max = 40
    }
    if(["pyron"].includes(args[0])) {
        name = "Pyron",
        prix = 150
        max = 100
    } 

    let em = new Discord.MessageEmbed()
    .setTitle(`${name}・Item infos`)
    .addField(`Nom :`, name)
    .addField(`Prix :`, prix + ' 💰')
    .addField(`Maximum :`, max)
    .setColor(config.color.bot)
    .setAuthor(message.author.tag, message.author.displayAvatarURL())

    message.channel.send(em)
   

  }
    module.exports.help = {
        name: 'item',
        category: 'economy',
        description: 'Obtiens des infos sur un items',
        aliases: ["items", "item-infos"],
        usage: "<nom de l'objet>",
        cooldown: 2,
        args: true,
        guildOnly: true
    }