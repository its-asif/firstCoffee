const { ApplicationCommandOptionType, REST, Routes } = require('discord.js');
require('dotenv').config();

const commands = [
    {
        name: 'ping',
        description: 'Replies with Pong!',
    },
    {
        name: 'add-numbers',
        description : 'add two number',
        options : [
            {
                name : 'first_number',
                description : 'The first number',
                type : ApplicationCommandOptionType.Number,
                required : true,
            },
            {
                name : 'second_number',
                description : 'The second number',
                type : ApplicationCommandOptionType.Number,
                required : true,
            }
        ]
    },
    {
        name: 'set-role',
        description: 'Set your role',
    }
];

const rest = new REST({ version: '10' }).setToken(process.env.CLIENT_TOKEN);

( async()=>{
    try {
        console.log('Started refreshing application (/) commands.');
    
        await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: commands });
    
        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();
