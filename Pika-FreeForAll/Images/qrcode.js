const config = require('../../config/config.json');
const Discord = require('discord.js');

module.exports.run = async(client, message, args) => {

    let text = args.join(" ")
       
    const m = await message.channel.send(`Génération de l'image en cours , veuillez patienter...`).then(msg => {
         setTimeout(() => {
             const embed = new Discord.MessageEmbed()
             .setAuthor("Voici votre QR Code :")
             .setURL(`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${text.replace(new RegExp(" ", "g"), "%20")})`)
             .setImage(`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${text.replace(new RegExp(" ", "g"), "%20")}`)
                 .setColor(`${config.color.embed}`)
                 .setFooter(`Si l'image ne s'affiche alors peut être que le lien est invalide ou éxpiré !`)
              
             msg.delete();
             message.channel.send(embed)
             
         }, 1000);
         })  
 };

    module.exports.help = {
        name: 'qrcode',
        category: 'images',
        description: 'Génere un qrcode avec le texte donné',
        aliases: [""],
        usage: "<lien/texte>",
        cooldown: 1,
        args: true,
        guildOnly: false
    }