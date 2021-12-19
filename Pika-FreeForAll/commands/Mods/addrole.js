const config = require('../../config/config.json');
const Discord = require('discord.js');

module.exports.run = async(client, message, args) => {
       
    if(!message.guild.me.permissions.has('MANAGE_ROLES')) return message.channel.send(`${config.emoji.error} \`ERROR\` Il me manque la permission \`MANAGE_ROLES\` !`)
    if (!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send(`${config.emoji.error} \`ERREUR\` Vous n'avez pas les permissions requises !`);
   
    let rMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase());
    if (!rMember) return message.channel.send(`${config.emoji.error} \`ERREUR\` Veuillez indiquez un utilisateur existant !`);
   
    if (rMember.roles.highest.comparePositionTo(message.guild.me.roles.highest) >= 0) return message.channel.send(`${config.emoji.error} \`ERREUR\` Je n'ai pas pu ajouté ce rôle car cet utillisateur est plus haut que moi dans la hiérarchie !`);
   

    let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]) || message.guild.roles.cache.find(rp => rp.name.toLowerCase() === args.slice(1).join(' ').toLocaleLowerCase());
    if (!args[1]) return message.channel.send(`${config.emoji.error} \`ERREUR\` Veuillez indiquer le rôle à ajouter !`);
   
    if (!role) return message.channel.send(`${config.emoji.error} \`ERREUR\` Veuillez indiquez un rôle existant !`);
   

    if (role.managed) return message.channel.send(`${config.emoji.error} \`ERREUR\` Je n'ai pas pu ajouté le rôle à cet utilisateur !`);
   
    if (message.guild.me.roles.highest.comparePositionTo(role) <= 0) return message.channel.send(`${config.emoji.error} \`ERREUR\` Je n'ai pas ajouté ce rôle car il est plus haut que mon rôle dans la hiérarchie !`);
   

    if (rMember.roles.cache.has(role.id)) return message.channel.send(`${config.emoji.error} \`ERREUR\` Cet utilisateur possède déjà ce rôle !`);
   
    if (!rMember.roles.cache.has(role.id)) await rMember.roles.add(role.id);
    var sembed = new Discord.MessageEmbed()
        .setColor(config.color.bot)
        .setAuthor('Manage Role', message.guild.iconURL())
        .setDescription(`J'ai bien ajouté le rôle **\`${role.name}\`** à **${rMember.user.username}**`)
    message.channel.send(sembed)

}
    


    module.exports.help = {
        name: 'add-role',
        category: 'mods',
        description: 'Ajoute un rôle à un membre facilement',
        aliases: ["addrole"],
        usage: "<user> + <role>",
        args: true,
        guildOnly: true
    }