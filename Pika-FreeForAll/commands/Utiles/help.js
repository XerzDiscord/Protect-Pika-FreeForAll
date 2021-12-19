const config = require('../../config/config.json');
const Discord = require('discord.js');
const { readdirSync } = require('fs');
const categoryList = readdirSync('./commands');
const db = require('quick.db')

module.exports.run = async(client, message, args) => {

     let prefix;
      if(message.channel.type === 'dm' || message.channel.type === 'group') {
        prefix = config.prefix;
      }
      else {
      prefix = db.get(`prefix_${message.guild.id}`) || config.prefix;
      }

    let ca = {
        "Admin": "🔑 Administration",
        "Mods": "⛏️ Moderation",
        "Utiles": "🥷 Utiles",
        "Funs": "✏️ Funs",
        "Images": "🥋 Images",
        "Animes": "⛩️ Animes",
        "Economy": "💰 Economy",
        "Owner": "🚩 Owner",
        "Giveaways": "🎉 Giveaways"
    }


          if(!args.length) {
              const embed = new Discord.MessageEmbed()
              .setDescription(`**Mon préfixe est : \`${prefix}\`** \n **Je possède actuellement : \`${client.commands.size} commandes\`**`)
              .setColor(`${config.color.bot}`)
              .setThumbnail(client.user.displayAvatarURL())
              .setFooter(`${client.user.username}・Page d'aide`, client.user.displayAvatarURL())
            
              for(const category of categoryList) {
                  embed.addField(
                      ca[category], 
                  `${client.commands.filter(cat => cat.help.category === category.toLowerCase()).map(cmd => `\`${cmd.help.name}\``).join(', ')}`
                  );
              };
              embed.addField('Pour obtenir de l\'aide sur une commande :', `\`${prefix}help <commande>\``)

    
                 message.channel.send(embed)
          }
          else {
            const command = client.commands.get(args[0]) || client.commands.find(cmd => cmd.help.aliases && cmd.help.aliases.includes(args[0]));

            if(!command) return message.channel.send(`${config.emoji.error} \`ERROR\` Commande non trouvée...`);

            const commandname = command.help.name.charAt(0).toUpperCase() + command.help.name.substring(1).toLowerCase();
            const em = new Discord.MessageEmbed()
            .setTitle(`**${commandname} · Help**`)
            .setColor(config.color.bot)
            .setThumbnail(client.user.displayAvatarURL())
            .setFooter(`${client.user.username}・Page d'aide`, client.user.displayAvatarURL())
            .addField(`Description :`, `${command.help.description}`)
            .addField(`Utilisation :`, `${prefix + command.help.name} **${command.help.usage}**`)
            
            if(command.help.aliases.length > 1) {
                em.addField('Aliases :', `\`${command.help.aliases.join(', ')}\``)
            }

                
              return message.channel.send(em);
        
    }
}

    module.exports.help = {
        name: 'help',
        category: 'utiles',
        description: 'Obtiens de l\'aide sur une de mes commandes ou la liste des commandes',
        aliases: ["h", "aide", "a"],
        usage: "<nom de la commande>",
        args: false,
        guildOnly: false
    }