const config = require('../../config/config.json');
const Discord = require('discord.js');

module.exports.run = async(client, message, args) => {

    let reponses = ["https://cdn.discordapp.com/attachments/603251454542741504/603251515846688777/tenor.gif", 
    "https://cdn.discordapp.com/attachments/603251454542741504/603251516282765312/tenor_4.gif", 
    "https://cdn.discordapp.com/attachments/603251454542741504/603251516282765313/giphy_1.gif", 
    "https://cdn.discordapp.com/attachments/603251454542741504/603251517033807892/tenor_1.gif", 
    "https://cdn.discordapp.com/attachments/603251454542741504/603251517633462319/tenor_2.gif", 
    "https://cdn.discordapp.com/attachments/603251454542741504/603251517633462480/giphy.gif", 
    "https://cdn.discordapp.com/attachments/603251454542741504/603251519030296587/tenor_5.gif", 
    "https://cdn.discordapp.com/attachments/603251454542741504/603251519030296589/tenor_6.gif"];
    
    let reponse = Math.floor(Math.random() * reponses.length);
    let kiss = reponses[reponse];
    let user = message.mentions.users.first();
    author = message.author;

    if(!user) {
    let msg = `${author} se fait un bisous à lui même...`
    const embed = new Discord.MessageEmbed()
 .setDescription(msg)
 .setImage(kiss)
 .setColor(`${config.color.bot}`)
 message.channel.send(embed)
    }
    if(user) {
        let msg = `${author} fait un bisous à ${user} !`
        const embed = new Discord.MessageEmbed()
 .setDescription(msg)
 .setImage(kiss)
 .setColor(`${config.color.bot}`)
 message.channel.send(embed)
        }
    
    
 };

    module.exports.help = {
        name: 'kiss',
        category: 'images',
        description: 'Embrasse quelqu\'un...',
        aliases: [""],
        usage: "<user>",
        cooldown: 1,
        args: false,
        guildOnly: false
    }