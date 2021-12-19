const config = require('../../config/config.json');
const Discord = require('discord.js');
let db = require('quick.db');

module.exports.run = (client, message, args) => {

    let user = message.author;
    let money = db.get(`money_${message.guild.id}_${user.id}`) || 0;

    let em = new Discord.MessageEmbed()
    .setDescription(`
    **__🗡️ AmuShop__**\n 
    **Sabre :** \`${db.get(`epee_${message.guild.id}_${user.id}`) || 0}\` 
    **Pioche :** \`${db.get(`pick_${message.guild.id}_${user.id}`) || 0}\` 
    **Armure :** \`${db.get(`armure_${message.guild.id}_${user.id}`) || 0}\` 
    **Cheval :** \`${db.get(`cheval_${message.guild.id}_${user.id}`) || 0}\` 
    
    \n**__⛏️ Matériaux__**\n
    **Prisme :** \`${db.get(`prisme_${message.guild.id}_${user.id}`) || 0}\` 
    **Crystal :** \`${db.get(`crystal_${message.guild.id}_${user.id}`) || 0}\` 
    **Pyron :** \`${db.get(`pyron_${message.guild.id}_${user.id}`) || 0}\`  \n

    **Vous possédez :** \`${db.get(`money_${message.guild.id}_${message.author.id}`) || 0}\` 💰
    `)
    .setColor(config.color.bot)
    .setAuthor(user.tag, user.displayAvatarURL())

    message.channel.send(em)
    }

    module.exports.help = {
        name: 'inventory',
        category: 'economy',
        description: 'Affiche ton inventaire',
        aliases: ["inventaire", "inv"],
        usage: " ",
        cooldown: 2,
        args: false,
        guildOnly: true
    }