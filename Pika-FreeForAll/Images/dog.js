const config = require('../../config/config.json');
const Discord = require('discord.js');

module.exports.run = async(client, message, args) => {

    
    let reponses = ["https://www.reddit.com/r/aww/comments/bpq14w/it_took_me_26_years_to_get_my_first_puppy_and_i/", 
    "https://cdn.weeb.sh/images/SyeA0oENtG.jpeg", 
    "https://cdn.weeb.sh/images/HyGYnNVKz.gif", 
    "https://cdn.weeb.sh/images/SkVxjV4Ff.jpeg", 
    "https://cdn.weeb.sh/images/HyWFtTCYf.jpeg", 
    "https://cdn.weeb.sh/images/HkbVMhVNKf.jpeg",
    "https://media.giphy.com/media/51Uiuy5QBZNkoF3b2Z/giphy.gif",
    "https://media.giphy.com/media/QvBoMEcQ7DQXK/giphy.gif",
    "https://media.giphy.com/media/3o7527pa7qs9kCG78A/giphy.gif",
    "https://media.giphy.com/media/xT0xeQ3j5IdcYGiiaY/giphy.gif",
    "https://media.giphy.com/media/RQSuZfuylVNAY/giphy.gif",
    "https://media.giphy.com/media/3o7abAHdYvZdBNnGZq/giphy.gif",
    "https://media.giphy.com/media/3o85xsGXVuYh8lM3EQ/giphy.gif",
    "https://media.giphy.com/media/TJxrHj7AurjqljHSv2/giphy.gif",
    "https://media.giphy.com/media/Y42OeCcJI4ufXDQ3oA/giphy.gif",
    "https://media.giphy.com/media/g0pZt4jizASYVkRPRi/giphy.gif"];
    
    let reponse = Math.floor(Math.random() * reponses.length);
    let dog = reponses[reponse];

    author = message.author;

    let reactions = ["🤩", "🥰", "🤤", "🥺", "😚"];
    let reaction = Math.floor(Math.random() * reactions.length);
    let react = reactions[reaction];

    
   
        const embed = new Discord.MessageEmbed()
        .setTitle('Waaf...')
 .setImage(dog)
 .setColor(`${config.color.bot}`)
 message.channel.send(embed).then(msg => {
     msg.react(react)
 })
   
 };

    module.exports.help = {
        name: 'dog',
        category: 'images',
        description: 'Envoi un gif aléatoire de chien',
        aliases: ["chien"],
        usage: "",
        cooldown: 1,
        args: false,
        guildOnly: false
    }