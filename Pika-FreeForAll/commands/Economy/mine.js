const config = require('../../config/config.json');
const Discord = require('discord.js');
let db = require('quick.db');

module.exports.run = (client, message, args) => {

    let pick = db.get(`pick_${message.guild.id}_${message.author.id}`);
    if(pick <= 0 || pick === "null") return message.channel.send(`${config.emoji.error} \`ERREUR\` Vous n'avez pu de pioche, aller en racheter au shop !`) 
    
    let minerai = ["pyron", "crystal", "prisme"]
    let m = minerai[Math.floor(Math.random() * minerai.length)]
    
    let number;
    if(m === "pyron") {
        number = Math.floor(Math.random() * (10 - 1 + 1)) + 1;
        db.add(`pyron_${message.guild.id}_${message.author.id}`, number)
    }
    if(m === "prisme") {
        number = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
        db.add(`prisme_${message.guild.id}_${message.author.id}`, number)
    }
    if(m === "crystal") {
        number = Math.floor(Math.random() * (6 - 1 + 1)) + 1;
        db.add(`crystal_${message.guild.id}_${message.author.id}`, number)
    } 

    let em = new Discord.MessageEmbed()
    .setDescription(`⛏️ Vous avez trouver \`${number}\` ${m} !`)
    .setColor(config.color.bot)
    .setAuthor(message.author.tag, message.author.displayAvatarURL())

    message.channel.send(em)

    db.subtract(`pick_${message.guild.id}_${message.author.id}`, 1)

  }
    module.exports.help = {
        name: 'mine',
        category: 'economy',
        description: 'Mine et obtiens du minerai',
        aliases: ["minage"],
        usage: " ",
        cooldown: 2,
        args: false,
        guildOnly: true
    }