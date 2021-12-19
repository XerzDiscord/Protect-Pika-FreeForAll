const config = require('../../config/config.json');
const Discord = require('discord.js');

module.exports.run = async(client, message, args) => {
  
    let reponses = ["https://cdn.discordapp.com/attachments/811984748821479434/812524488150614066/image0.gif", 
    "https://cdn.discordapp.com/attachments/811984748821479434/812524488721301534/image1.gif",
"https://cdn.discordapp.com/attachments/811984748821479434/812524489224486912/image2.gif",
"https://cdn.discordapp.com/attachments/811984748821479434/812524489484009522/image3.gif",
"https://media.discordapp.net/attachments/811984748821479434/812524489833054208/image4.gif",
"https://cdn.discordapp.com/attachments/811984748821479434/812524490692493363/image5.gif",
"https://cdn.discordapp.com/attachments/811984748821479434/812524490985570344/image6.gif",
"https://cdn.discordapp.com/attachments/811984748821479434/812524491329634334/image7.gif"];
    
    let reponse = Math.floor(Math.random() * reponses.length);
    let slap = reponses[reponse];
    let user = message.mentions.users.first();
    author = message.author;

    if(!user) {
    let msg = `${author} doit avoir un petit soucis pour ce giffler lui même...`
    const embed = new Discord.MessageEmbed()
 .setDescription(msg)
 .setImage(slap)
 .setColor(`${config.color.bot}`)
 message.channel.send(embed)
    }
    if(user) {
        let msg = `${author} donne des giffles à ${user} !`
        const embed = new Discord.MessageEmbed()
 .setDescription(msg)
 .setImage(slap)
 .setColor(`${config.color.bot}`)
 message.channel.send(embed)
        }
    
 };

    module.exports.help = {
        name: 'slap',
        category: 'images',
        description: 'Giffle quelqu\'un...',
        aliases: ["giffle"],
        usage: "<user>",
        cooldown: 1,
        args: false,
        guildOnly: false
    }