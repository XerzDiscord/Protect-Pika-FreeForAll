const config = require('../../config/config.json');
const Discord = require('discord.js');
let db = require('quick.db');
let item = new db.table(`Items`)

module.exports.run = (client, message, args) => {

    let user = message.author;
    let money = db.get(`money_${message.guild.id}_${user.id}`) || 0;

    if(["epee", "sword"].includes(args[0])) {
    if(money < 1500) return message.channel.send(`${config.emoji.error} \`ERROR\` Vous n'avez pas assez d'argent...`);

    if(db.get(`epee_${message.guild.id}_${user.id}`) >= 5) return message.channel.send(`${config.emoji.error} \`ERROR\` Vous avez acheté le maximum pour cet item !`);

    db.add(`epee_${message.guild.id}_${user.id}`, 1)
    db.subtract(`money_${message.guild.id}_${user.id}`, 1500)

    let em = new Discord.MessageEmbed()
    .setDescription(`Vous venez d'acheter une épée pour \`1500\` 💰, Il vous reste \`${db.get(`money_${message.guild.id}_${user.id}`)}\` 💰`)
    .setColor(config.color.bot)
    .setAuthor(user.tag, user.displayAvatarURL())

    return message.channel.send(em)
    }
    if(["armure"].includes(args[0])) {
        if(money < 2100) return message.channel.send(`${config.emoji.error} \`ERROR\` Vous n'avez pas assez d'argent...`);
    
        if(db.get(`armure_${message.guild.id}_${user.id}`) >= 3) return message.channel.send(`${config.emoji.error} \`ERROR\` Vous avez acheté le maximum pour cet item !`);
    
        db.add(`armure_${message.guild.id}_${user.id}`, 1)
        db.subtract(`money_${message.guild.id}_${user.id}`, 2100)
    
        let em = new Discord.MessageEmbed()
        .setDescription(`Vous venez d'acheter une armure pour \`2100\` 💰, Il vous reste \`${db.get(`money_${message.guild.id}_${user.id}`)}\` 💰`)
        .setColor(config.color.bot)
        .setAuthor(user.tag, user.displayAvatarURL())
    
        return message.channel.send(em)
        }

  if(["cheval", "horse"].includes(args[0])) {
    if(money < 8000) return message.channel.send(`${config.emoji.error} \`ERROR\` Vous n'avez pas assez d'argent...`);

    if(db.get(`cheval_${message.guild.id}_${user.id}`) >= 1) return message.channel.send(`${config.emoji.error} \`ERROR\` Vous avez acheté le maximum pour cet item !`);

    db.add(`cheval_${message.guild.id}_${user.id}`, 1)
    db.subtract(`money_${message.guild.id}_${user.id}`, 8000)

    let em = new Discord.MessageEmbed()
    .setDescription(`Vous venez d'acheter un chaval pour \`8000\` 💰, Il vous reste maintenant \`${db.get(`money_${message.guild.id}_${user.id}`)}\` 💰`)
    .setColor(config.color.bot)
    .setAuthor(user.tag, user.displayAvatarURL())

    return message.channel.send(em)
    }
    if(["pioche", "pick"].includes(args[0])) {
        if(money < 400) return message.channel.send(`${config.emoji.error} \`ERROR\` Vous n'avez pas assez d'argent...`);
    
        if(db.get(`pick_${message.guild.id}_${user.id}`) >= 5) return message.channel.send(`${config.emoji.error} \`ERROR\` Vous avez acheté le maximum pour cet item !`);
    
        db.add(`pick_${message.guild.id}_${user.id}`, 1)
        db.subtract(`money_${message.guild.id}_${user.id}`, 400)
    
        let em = new Discord.MessageEmbed()
        .setDescription(`Vous venez d'acheter une pioche pour \`400\` 💰, Il vous reste \`${db.get(`money_${message.guild.id}_${user.id}`)}\` 💰`)
        .setColor(config.color.bot)
        .setAuthor(user.tag, user.displayAvatarURL())
    
        return message.channel.send(em)
        }

    if(["prisme"].includes(args[0])) {
        if(money < 500) return message.channel.send(`${config.emoji.error} \`ERROR\` Vous n'avez pas assez d'argent...`);
    
        if(db.get(`prisme_${message.guild.id}_${user.id}`) >= 20) return message.channel.send(`${config.emoji.error} \`ERROR\` Vous avez acheté le maximum pour cet item !`);
    
        db.add(`prisme_${message.guild.id}_${user.id}`, 1)
        db.subtract(`money_${message.guild.id}_${user.id}`, 500)
    
        let em = new Discord.MessageEmbed()
        .setDescription(`Vous venez d'acheter du prisme pour \`500\` 💰, Il vous reste  \`${db.get(`money_${message.guild.id}_${user.id}`)}\` 💰`)
        .setColor(config.color.bot)
        .setAuthor(user.tag, user.displayAvatarURL())
    
        return message.channel.send(em)
        }
        if(["crystal"].includes(args[0])) {
            if(money < 200) return message.channel.send(`${config.emoji.error} \`ERROR\` Vous n'avez pas assez d'argent...`);
        
            if(db.get(`crystal_${message.guild.id}_${user.id}`) >= 40) return message.channel.send(`${config.emoji.error} \`ERROR\` Vous avez acheté le maximum pour cet item !`);
        
            db.add(`crystal_${message.guild.id}_${user.id}`, 1)
            db.subtract(`money_${message.guild.id}_${user.id}`, 200)
        
            let em = new Discord.MessageEmbed()
            .setDescription(`Vous venez d'acheter du crystal pour \`200\` 💰, Il vous reste \`${db.get(`money_${message.guild.id}_${user.id}`)}\` 💰`)
            .setColor(config.color.bot)
            .setAuthor(user.tag, user.displayAvatarURL())
        
            return message.channel.send(em)
            }
            if(["pyron"].includes(args[0])) {
                if(money < 150) return message.channel.send(`${config.emoji.error} \`ERREUR\` Vous n'avez pas assez d'argent...`);
            
                if(db.get(`pyron_${message.guild.id}_${user.id}`) >= 100) return message.channel.send(`${config.emoji.error} \`ERREUR\` Vous avez acheté le maximum pour cet item !`);
            
                db.add(`pyron_${message.guild.id}_${user.id}`, 1)
                db.subtract(`money_${message.guild.id}_${user.id}`, 150)
            
                let em = new Discord.MessageEmbed()
                .setDescription(`Vous venez d'acheter du pyron pour \`150\` 💰, Il vous reste \`${db.get(`money_${message.guild.id}_${user.id}`)}\` 💰`)
                .setColor(config.color.bot)
                .setAuthor(user.tag, user.displayAvatarURL())
            
               return message.channel.send(em)
                } else return message.channel.send(`${config.emoji.error} \`ERREUR\` Item invalide ! Faites \`${db.get(`prefix_${message.guild.id}`) || config.prefix}shop\` Pour voir la liste des items disponible.`)
}
    module.exports.help = {
        name: 'buy',
        category: 'economy',
        description: 'Achète un objet dans le shop !',
        aliases: [" "],
        usage: " ",
        cooldown: 2,
        args: true,
        guildOnly: true
    }