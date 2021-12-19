const config = require('../../config/config.json');
const Discord = require('discord.js');

module.exports.run = async(client, message, args) => {
       
    if(!message.guild.me.permissions.has('MANAGE_CHANNELS')) return message.channel.send(`${config.emoji.error} \`ERROR\` Il me manque la permission \`MANAGE_CHANNELS\` !`)
    if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send(`${config.emoji.error} \`ERREUR\` Vous n'avez pas les permissions requises !`);

  
    let bannedMemberInfo = await message.guild.fetchBans()
     
    let bannedMember;
    bannedMember = bannedMemberInfo.find(b => b.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || bannedMemberInfo.get(args[0]) || bannedMemberInfo.find(bm => bm.user.tag.toLowerCase() === args[0].toLocaleLowerCase());
    if (!bannedMember) return message.channel.send(`${config.emoji.error} \`ERREUR\` Veuillez indinquer un ID valide !`);
  
            message.guild.members.unban(bannedMember.user.id)
            var sembed2 = new Discord.MessageEmbed()
                .setColor(config.color.bot)
                .setAuthor("Sanctions", message.guild.iconURL())
                .setDescription(`**${bannedMember.user.tag}** a bien été débanni !`)
            message.channel.send(sembed2)
        }
    


    module.exports.help = {
        name: 'unban',
        category: 'mods',
        description: 'Débanni un utilisateur du serveur',
        aliases: ["unbanmembers", "deban"],
        usage: "<user id>",
        cooldown: 10,
        args: true,
        guildOnly: true
    }