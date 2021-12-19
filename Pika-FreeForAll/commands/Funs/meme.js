const config = require('../../config/config.json');
const Discord = require('discord.js');
const fetch = require('node-fetch');
const got = require('got');

module.exports.run = (client, message, args) => {
 
    
const embed = new Discord.MessageEmbed()
got('https://www.reddit.com/r/memes/random/.json').then(response => {
    let content = JSON.parse(response.body);
    let permalink = content[0].data.children[0].data.permalink;
    let memeUrl = `https://reddit.com${permalink}`;
    let memeImage = content[0].data.children[0].data.url;
    let memeTitle = content[0].data.children[0].data.title;
    let memeUpvotes = content[0].data.children[0].data.ups;
    let memeDownvotes = content[0].data.children[0].data.downs;
    let memeNumComments = content[0].data.children[0].data.num_comments;
    embed.setTitle(`${memeTitle}`)
    embed.setURL(`${memeUrl}`)
    embed.setImage(memeImage)
    embed.setColor(config.color.bot)
    embed.setFooter(`👍 ${memeUpvotes} 👎 ${memeDownvotes} 💬 ${memeNumComments}`)
    message.channel.send(embed)
 })
}
    module.exports.help = {
        name: 'meme',
        category: 'funs',
        description: 'Envoi un même en anglais',
        usage: " ",
        cooldown: 2,
        args: false,
        guildOnly: false
    }