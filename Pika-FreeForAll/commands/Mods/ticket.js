const config = require('../../config/config.json');
const Discord = require('discord.js');
const disbut = require('discord-buttons')
const db = require('quick.db');

module.exports.run = async(client, message, args) => {
     
    let prefix = db.get(`prefix_${message.guild.id}`) || config.prefix;
    
    if (!message.member.hasPermission(`MANAGE_GUILD`)) return message.channel.send(`${config.emoji.error} \`ERREUR\` Vous n'avez pas les permissions requises !`);

    if (args[0] === "create" || args[0] === "new") {
         
        const user = message.author;

        if(!message.guild.me.permissions.has('MANAGE_CHANNELS')) return message.channel.send(`${emoji.error} \`ERROR\` Il me manque la permission \`MANAGE_CHANNELS\` !`)

      const raison = args.slice(1).join(" ") || "Aucun sujet donnée...";

      const ticketnumber = await db.add(`ticketnumber_${message.guild.id}`, 1)
      
      if(message.guild.channels.cache.find(ch => ch.name === `ticket-${ticketnumber}`)) return message.channel.send(`${emoji.error} \`ERROR\` Vous avez déjà crée un ticket !`)
      
        if(!message.guild.channels.cache.find(ch => ch.name === `ticket-${ticketnumber}`)) {

        const ticketchannel = await message.guild.channels.create(`ticket-${ticketnumber}`,)
    
        ticketchannel.updateOverwrite(message.guild.id, {
            SEND_MESSAGE: false,
            VIEW_CHANNEL: false,
        });

        ticketchannel.updateOverwrite(user.id, {
            SEND_MESSAGE: true,
            VIEW_CHANNEL: true,
        });

  const embed = new Discord.MessageEmbed()
     
     .setAuthor('Ticket', message.guild.iconURL())
     .addField('Votre ticket a bien été crée !', ticketchannel)
     .setColor(`${config.color.bot}`)
     .setTimestamp()
     message.channel.send(embed)

     // Message dans le ticket 
     const ticketmess = new Discord.MessageEmbed()
     
     .addFields({name: `Sujet`, value: `${raison}`, inline: false})
     .setAuthor(`Ticket de ${user.tag}`, user.displayAvatarURL())
     .setDescription(`Pour fermer le ticket faites : ${prefix}ticket close`)
     .setColor(`${config.color.bot}`)
     .setTimestamp()
     .setThumbnail(message.author.displayAvatarURL())
     ticketchannel.send(`**${user},**`, ticketmess)  
            }
      }
      if(args[0] === "close" || args[0] === "delete") {
          const ticknumber = db.fetch(`ticketnumber_${message.guild.id}`);
        const ticket = message.guild.channels.cache.find(ch => ch.name === `ticket-${ticknumber}`);

      if(!message.channel.name.includes(`ticket`)) return message.channel.send(`${config.emoji.error} \`ERROR\` Ce salon n'est pas un ticket !`);
            
  const embed = new Discord.MessageEmbed()
     
     .setAuthor('Ticket', message.guild.iconURL())
     .setDescription('Ce ticket se fermera dans 5 secondes')
     .setColor(`${config.color.embed}`)
    message.channel.send(embed).then(msg => {
        setTimeout(() => {

            message.channel.delete()
            
        }, 5000);
        })
              
            } else {
                const embed = new Discord.MessageEmbed()
                .setTitle(`**${config.emoji.error} Arguments Manquants !**`)
                .setDescription(`Usage : ${prefix}ticket <create / close>`)
                .setFooter(client.user.username, client.user.displayAvatarURL())
                .setColor(config.color.bot) 
               return  message.channel.send(embed).then(msg => {
                  setTimeout(() => {
                     msg.delete()
                  }, 5000);
              });
            }
      }

    module.exports.help = {
        name: 'ticket',
        category: 'config',
        description: 'Ouvre ou ferme un ticket',
        aliases: [""],
        usage: "<create / close>",
        args: true,
        guildOnly: true 
    }