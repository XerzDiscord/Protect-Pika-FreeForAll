const config = require('../../config/config.json');
const Discord = require('discord.js');

module.exports.run = async(client, message, args) => {

           
    let reponses = ["https://cdn.discordapp.com/attachments/811984748821479434/812513826792276078/image0.gif",
    "https://cdn.discordapp.com/attachments/811984748821479434/812513827156525106/image1.gif",
    "https://cdn.discordapp.com/attachments/811984748821479434/812513827467952158/image2.gif",
    "https://cdn.discordapp.com/attachments/811984748821479434/812513827832332288/image3.gif",
    "https://cdn.discordapp.com/attachments/811984748821479434/812513828243243008/image4.gif",
    "https://cdn.discordapp.com/attachments/811984748821479434/812513828909613107/image5.gif",
    "https://cdn.discordapp.com/attachments/811984748821479434/812513829175033886/image6.gif",
    "https://cdn.discordapp.com/attachments/811984748821479434/812513829589483570/image7.gif"];
    
    let reponse = Math.floor(Math.random() * reponses.length);
    let twerk = reponses[reponse];

    author = message.author;

    let reactions = ["🤤", "😪", ":hot_face:", "😍"];
    let reaction = Math.floor(Math.random() * reactions.length);
    let react = reactions[reaction];
   
        const embed = new Discord.MessageEmbed()
 .setImage(twerk)
 .setColor(`${config.color.bot}`)
 message.channel.send(embed).then(msg => {
     msg.react(react)
 })
 };

    module.exports.help = {
        name: 'twerk',
        category: 'images',
        description: 'De jolis waifus...',
        aliases: [""],
        usage: "",
        cooldown: 1,
        args: false,
        guildOnly: false
    }