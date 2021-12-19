const Discord = require('discord.js');
const figlet = require('figlet');
const util = require('util');
const config = require('../../config/config.json')
const figletAsync = util.promisify(figlet);
 
 module.exports.run = async (client, message, args) => {
    
    let text = args.join(" ")
     if(text.length <= 1 || text.length > 15) return message.channel.send(`${config.emoji.error} \`ERROR\` Votre texte doit faire entre 1 et 15 caractères !`);
 
     const result = await figletAsync(text);
     if(!result) return message.channel.send(`${config.emoji.error} \`ERROR\` Le texte est invalide...`);

     let em = new Discord.MessageEmbed()
     .setColor(config.color.bot)
     .setAuthor(message.author.tag, message.author.displayAvatarURL())
     .setDescription(`\`\`\`${result}\`\`\``)
 
     message.channel.send(em)
 }
 
 module.exports.help = {
     name: "ascii",
     aliases: ["ascii", "asciiart", "ascii-art"],
     category: "funs",
     description: "Transforme votre texte en ascii art ",
     usage: "<texte>",
     cooldown: 5,
     args: true
 }