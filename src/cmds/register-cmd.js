require('dotenv').config();
const { Client, GatewayIntentBits, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');


const client = new Client({ intents: [
    GatewayIntentBits.Guilds, 
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,

] });


const roles =[
    {
        id: '1018539740586324090',
        label : '7 Star'
    },
    {
        id: '1018539741005762620',
        label : '6 Star'
    },
    {
        id: '1018539741521649836',
        label : '5 Star'
    },
]



client.on('ready', async() => {
  console.log(`Logged in as ${client.user.tag}!`);
    try {
        const channel = await client.channels.cache.get('1229819460987388065');

        const row = new ActionRowBuilder();

        roles.forEach(role => {
            row.components.push(
                new ButtonBuilder()
                .setCustomId(role.id)
                .setLabel(role.label)
                .setStyle(ButtonStyle.Primary)
            )
        })

        await channel.send({
            content : 'set your role',
            components : [row],
        })

        console.log(row);
        process.exit();

    } catch (error) {
        console.log(error);
    }
});


client.login(process.env.CLIENT_TOKEN); 