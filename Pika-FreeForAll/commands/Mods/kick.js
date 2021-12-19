const config = require('../../config/config.json');
const Discord = require('discord.js');
const { readdirSync } = require('fs');
const categoryList = readdirSync('./commands');
const { MessageButton, MessageActionRow } = require('discord-buttons');

module.exports.run = async(client, message, args) => {

    if(!message.guild.me.permissions.has('KICK_MEMBERS')) return message.channel.send(`${config.emoji.error} \`ERROR\` Il me manque la permission \`KICK_MEMBERS\` !`);

    if (!message.member.hasPermission(`KICK_MEMBERS`)) return message.channel.send(`${config.emoji.error} \`ERREUR\` Vous n'avez pas les permissions requises !`);

    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0])        
    
    if(!user)  return message.channel.send(`${config.emoji.error} \`ERROR\` Veuillez mentionner un utilisateur existant !`);

    if (user.id === message.author.id) return message.channel.send(`${config.emoji.error} \`ERROR\` Vous ne pouvez pas vous expulsé vous même !`);
     
    if (!user.kickable) return message.channel.send(`${config.emoji.error} \`ERREUR\` Je ne peux pas expulser un utilisateur plus haut que moi dans la hiérarchie !`);
 // Raison du ban
 let reason = args.slice(1).join(" ");
 if (!reason) {
     reason = 'Aucune raison donnée...';

     if(user) {
        let em = new Discord.MessageEmbed()
        .setAuthor('Sanction', message.guild.iconURL())
        .setDescription(`Souhaitez vous expulsé ${user} ?`) 
        .setFooter(`Répondez par yes ou no`)
        .setColor(config.color.bot)
      let embed = await message.channel.send(em)

        const filter = (m) => m.author.id === message.author.id;
        const collector = message.channel.createMessageCollector(filter, {
            time: 15000,
        });

        collector.on("collect", async(m) => {
            if (m.content.toLowerCase() === "yes") {
                message.guild.member(user).kick(reason);
               let emb = new Discord.MessageEmbed()
                .setAuthor('Sanction', message.guild.iconURL())
                .setDescription(`${message.author} a expulsé ${user}`)
                .addField('Raison :', reason)
                .setColor(config.color.bot)
                message.channel.send(emb);
    
            } if (m.content.toLowerCase() === "no") {
                collector.stop();
                m.delete()
                let emb2 = new Discord.MessageEmbed()
                .setAuthor('Sanctions', message.guild.iconURL())
                .setDescription(`Commande annulé !`)
                .setColor(config.color.embed)
                message.channel.send(emb2);
            } 
        });  
        collector.on('end', async(m) => {
            embed.delete()
        })  
     }

 
 }
    }

    module.exports.help = {
        name: 'kick',
        category: 'mods',
        description: 'Expulse un membre du serveur',
        aliases: ["kickmember", "kickmembers", "expulse"],
        usage: "<user>",
        args: true,
        guildOnly: true
    }