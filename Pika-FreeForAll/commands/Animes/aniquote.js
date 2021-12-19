const config = require('../../config/config.json');
const Discord = require('discord.js');
let fetch = require('node-fetch');
const translate = require('@vitalets/google-translate-api');

module.exports.run = (client, message, args) => {
   
   fetch('https://animechan.vercel.app/api/random')
    .then(response => response.json())
    .then(quote => {
        let citation = quote

       translate(citation.quote, {from: 'en', to: 'fr'}).then(result => {

        let cit = result.text;

const embed = new Discord.MessageEmbed()
 
.setAuthor(citation.character)
 .setFooter(message.author.tag, message.author.displayAvatarURL())
 .setDescription(cit)
 .setColor(`${config.color.bot}`)
 message.channel.send(embed)
        })
    })
  };




    module.exports.help = {
        name: 'aniquote',
        category: 'animes',
        description: 'Envoi une citation d\'animé',
        aliases: ["anicitation", "animecitation"],
        usage: " ",
        cooldown: 2,
        args: false,
        guildOnly: false
    }