const Discord = require('discord.js');
module.exports.run = async(client, message, args) => {

    let guild = message.guild;
    

        let em = new Discord.MessageEmbed()
        .setDescription(` Souhaitez vous que je quitte le serveur ? \`yes / no\``) 
        .setTimestamp()
        .setColor("#FF0000")
      let embed = await message.channel.send(em)

        const filter = (m) => m.author.id === message.author.id;
        const collector = message.channel.createMessageCollector(filter, {
            time: 15000,
        });

        collector.on("collect", async(m) => {
            if (m.content.toLowerCase() === "yes") {
                collector.stop()
                embed.delete()
                m.delete()
               let emb = new Discord.MessageEmbed()
               .setDescription(`Je quitte le serveur...`)
              .setColor("#FF8C00")
              .setTimestamp()
              message.channel.send(emb)
     
             await guild.leave().catch(() => {
                 return message.channel.send(`Une erreur c'est produite...`)
             })
    
            } if (m.content.toLowerCase() === "no") {
                collector.stop();
                m.delete()
                embed.delete()
                let emb2 = new Discord.MessageEmbed()
                .setDescription(`Commande annulée !, je reste donc sur le serveur`)
                .setColor("#FF2828")
                message.channel.send(emb2);
            } 
        });  
    }

    module.exports.help = {
        name: 'leavebot',
        category: 'admin',
        description: 'Faire quitter Starix du serveur',
        aliases: ["botleave", "botlv"],
        usage: "",
        cooldown: 5,
        args: false,
        perms: ["ADMINISTRATOR"],
        botperms: [""],
    }