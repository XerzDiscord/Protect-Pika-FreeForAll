const config = require('../../config/config.json');
const Discord = require('discord.js');

module.exports.run = async(client, message, args) => {

     
    let reponses = ["https://cdn.weeb.sh/images/Sk-xxs3C-.gif", 
    "https://cdn.weeb.sh/images/ryjJFdmvb.gif", 
    "https://cdn.weeb.sh/images/HJ7lY_QwW.gif", 
    "https://cdn.weeb.sh/images/rkx1dJ25z.gif", 
    "https://cdn.weeb.sh/images/rJ_slRYFZ.gif", 
    "https://cdn.weeb.sh/images/rkIK_u7Pb.gif", 
    "https://cdn.weeb.sh/images/r1kC_dQPW.gif", 
    "https://cdn.weeb.sh/images/Hyec_OmDW.gif", 
    "https://cdn.weeb.sh/images/HytoudXwW.gif", 
    "https://cdn.weeb.sh/images/Hk0yFumwW.gif"];
    
    let reponse = Math.floor(Math.random() * reponses.length);
    let hug = reponses[reponse];
    let user = message.mentions.users.first();
    author = message.author;

    if(!user) {
    let msg = `${author} se fait un calin à lui même...`
    const embed = new Discord.MessageEmbed()
 .setDescription(msg)
 .setImage(hug)
 .setColor(`${config.color.bot}`)
 message.channel.send(embed)
    }
    if(user) {
        let msg = `${author} fait un calin à ${user} !`
        const embed = new Discord.MessageEmbed()
 .setDescription(msg)
 .setImage(hug)
 .setColor(`${config.color.bot}`)
 message.channel.send(embed)
        }
    
 };

    module.exports.help = {
        name: 'hug',
        category: 'images',
        description: 'Offres un calin a quelqu\'un...',
        aliases: ["calin"],
        usage: "<user>",
        cooldown: 1,
        args: false,
        guildOnly: false
    }