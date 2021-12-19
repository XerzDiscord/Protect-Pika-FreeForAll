const config = require('../../config/config.json');
const Discord = require('discord.js');
let db = require('quick.db');

module.exports.run = (client, message, args) => {

    let user = message.author;

    let em = new Discord.MessageEmbed()
    .setDescription(`
    **__🗡️ AmuShop__**\n 
    **Sabre :** \`1500\` 💰
    **Pioche :** \`400\` 💰
    **Armure :** \`2100\` 💰
    **Cheval :** \`8000\` 💰
    
    \n**__⛏️ Matériaux__**\n
    **Prisme :** \`500\` 💰
    **Crystal :** \`200\` 💰
    **Pyron :** \`150\` 💰 \n
    **Vous possédez :** \`${db.get(`money_${message.guild.id}_${message.author.id}`) || 0}\` 💰
    `)
    .setColor(config.color.bot)
    .setAuthor(user.tag, user.displayAvatarURL())

    message.channel.send(em)

  }
    module.exports.help = {
        name: 'shop',
        category: 'economy',
        description: 'Affiche le shop !',
        aliases: [" "],
        usage: " ",
        cooldown: 2,
        args: false,
        guildOnly: true
    }