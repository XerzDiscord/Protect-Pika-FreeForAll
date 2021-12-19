const config = require('../../config/config.json');
const Discord = require('discord.js');
const canvacord = require('canvacord')
module.exports.run = async(client, message, args) => {

   let user = message.mentions.users.first() ||  message.author;
   
     let em = new Discord.MessageEmbed()
         .setTitle(`Veuillez patienter...`)
         .setColor(config.color.bot)
     let res = await message.channel.send(em)

    let img = await canvacord.Canvas.rainbow(user.displayAvatarURL({dynamic: false, format: "png", size: 1024}))
    let attachment = new Discord.MessageAttachment(img, "rainbow.png")
    let aem = new Discord.MessageEmbed()
    .setAuthor(user.tag, user.displayAvatarURL())
    .setImage("attachment://rainbow.png")
    .setColor(config.color.bot)
    message.channel.send({embeds: [aem], files: [attachment]})
    res.delete()
      
      
    }

    module.exports.help = {
        name: 'rainbow',
        category: 'images',
        description: 'Ajoute l\'effet rainbow à ton avatar',
        aliases: ["rb"],
        usage: "<utilisateur>",
        cooldown: 1,
        args: false,
        botperms: ["ATTACH_FILES"],
    }