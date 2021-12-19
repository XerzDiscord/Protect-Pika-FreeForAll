const config = require('../config/config.json');
const Discord = require('discord.js');
const { readdirSync } = require("fs"); 
   
  
module.exports = {
	name: 'ready',
    async execute(client) {

        client.user.setActivity(`Protège ${client.guilds.cache.size} serveurs !`)
        console.log(`${client.user.tag} est online !`)
        console.log(`${client.commands.size} Commandes chargées !`)
    
  }
};
