const Discord = require("discord.js");  
module.exports.run = async(bot,message,args) => {

    const channel = message.guild.channels.cache.find(c => c.id === 'ID');
    let author = message.author.id;
       

   if (!message.member.voice.channel) return message.channel.send("<:error:904020757535920138> \`ERREUR\` Vous devez être dans un salon vocal pour utiliser cette commande !");
   message.member.voice.channel.leave(); message.channel.send("<:succes:904020751257059338> Déconnecté du vocal !")
   return undefined;

  };

module.exports.help = {
        name: 'leave',
        category: 'admin',
        description: 'Faire partir le bot du salon vocal',
        aliases: ["leavevc"],
        usage: " ",
        cooldown: 1,
        args: false,
        guildOnly: false
    }