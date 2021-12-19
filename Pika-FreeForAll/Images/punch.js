const config = require('../../config/config.json');
const Discord = require('discord.js');

module.exports.run = async(client, message, args) => {
  
       
    let reponses = ["https://cdn.discordapp.com/attachments/811984748821479434/812527283750699008/image0.gif", 
    "https://cdn.discordapp.com/attachments/811984748821479434/812527293624746004/image0.gif", 
    "https://cdn.discordapp.com/attachments/811984748821479434/812527299429269534/image0.gif", 
    "https://cdn.discordapp.com/attachments/811984748821479434/812527318291185674/image0.gif", 
    "https://cdn.discordapp.com/attachments/811984748821479434/812527319037509662/image0.gif", 
    "https://cdn.discordapp.com/attachments/811984748821479434/812527327178784808/image0.gif", 
    "https://cdn.discordapp.com/attachments/811984748821479434/812527333931483136/image0.gif"];
    
    let reponse = Math.floor(Math.random() * reponses.length);
    let punch = reponses[reponse];
    let user = message.mentions.users.first();
    author = message.author;

    if(!user) {
    let msg = `${author} se donne des coups de poings..`
    const embed = new Discord.MessageEmbed()
 .setDescription(msg)
 .setImage(punch)
 .setColor(`${config.color.bot}`)
 message.channel.send(embed)
    }
    if(user) {
        let msg = `${author} donne des coups de poings à ${user} !`
        const embed = new Discord.MessageEmbed()
 .setDescription(msg)
 .setImage(punch)
 .setColor(`${config.color.bot}`)
 message.channel.send(embed)
        }
    
    
 };

    module.exports.help = {
        name: 'punch',
        category: 'images',
        description: 'Frappe quelqu\'un...',
        aliases: ["frappe"],
        usage: "<user>",
        cooldown: 1,
        args: false,
        guildOnly: false
    }