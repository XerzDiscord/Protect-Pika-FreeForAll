const config = require('../../config/config.json');
const Discord = require('discord.js'); 
module.exports.run = async(client, message, args) => {

    let inchannel = message.guild.channels.cache.filter(v => v.type === 'voice')

    let desc;
    let number;
    let i = 1;
   inchannel.forEach(ch => {
        desc = ch.members.map(m => `**${i++}・**${m.user.username}#${m.user.discriminator} (${m.voice.channel})`)
        number = ch.members.size
   })

   if(number <= 0) return message.channel.send(`${config.emoji.error} \`ERREUR\` Il n'y a aucun membre en vocal !`);

   let em = new Discord.MessageEmbed()
   .setTitle(`Liste des membres en vocal (${number}) :`)
   .setDescription(`${desc}`)
   .setColor(config.color.bot)

   message.channel.send(em)
}
    
   

    module.exports.help = {
        name: 'voicemembers',
        category: 'utiles',
        description: 'Obtienir les membres en vocal',
        aliases: ["vcm", "vc"],
        usage: " ",
        cooldown: 1,
        args: false,
    }