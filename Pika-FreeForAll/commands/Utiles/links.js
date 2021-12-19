const config = require('../../config/config.json');
const Discord = require('discord.js'); 
const moment = require('moment');
const math = require('mathjs');
const disbut = require('discord-buttons')

module.exports.run = (client, message, args) => {
    
   let em = new Discord.MessageEmbed()
   .setDescription(`**${message.author}, voici mes liens :**`)
   .setColor(config.color.bot)

   let btn = new disbut.MessageButton()
   .setStyle('url')
   .setURL(config.onigashima)
   .setLabel('Onishigawa')

   let btn2 = new disbut.MessageButton()
   .setStyle('url')
   .setURL(config.invitebot)
   .setLabel('Invite moi !')

   let row = new disbut.MessageActionRow()
   .addComponents(btn, btn2)

   message.channel.send({
     embed: em,
     components: [row]
   })
 }

    module.exports.help = {
        name: 'links',
        category: 'utiles',
        description: 'Envoi tous les liens du Bot',
        aliases: ["invite"],
        usage: "",
        cooldown: 1,
        args: false,
        guildOnly: false
    }