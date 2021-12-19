const config = require('../../config/config.json');
const Discord = require('discord.js');

module.exports.run = async(client, message, args) => {

     
    let reponses = ["https://media1.giphy.com/media/VHwgHhJLuWt0gjjUzf/giphy.gif",
    "https://media2.giphy.com/media/3Cm8cxtSHqu6Q/giphy.gif",
    "https://media4.giphy.com/media/JXibbAa7ysN9K/giphy.gif",
    "https://media0.giphy.com/media/VgClqfxi2w1KU/giphy.gif",
    "https://media1.giphy.com/media/OEOGvMTyiPu24/giphy.gif?cid=ecf05e477e3fa1b5a296a8379fb331dc27a4f929017dfd15&rid=giphy.gif",
    "https://media4.giphy.com/media/SVs0cQ0nLRsLNUadmn/giphy.gif",
    "https://media2.giphy.com/media/bqSkJ4IwNcoZG/giphy.gif"];
    
    let reponse = Math.floor(Math.random() * reponses.length);
    let happy = reponses[reponse];

    author = message.author;

    let reactions = ["🥳","🤩","🤪","😆"];
    let reaction = Math.floor(Math.random() * reactions.length);
    let react = reactions[reaction];
   
        const embed = new Discord.MessageEmbed()
 .setImage(happy)
 .setColor(`${config.color.bot}`)
 message.channel.send(embed).then(msg => {
     msg.react(react)
 })
        
    
 };

    module.exports.help = {
        name: 'happy',
        category: 'images',
        description: 'Souris 😄',
        aliases: ["smile"],
        usage: "",
        cooldown: 1,
        args: false,
        guildOnly: false
    }