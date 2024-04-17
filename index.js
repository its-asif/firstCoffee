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
});

client.on('messageCreate', (message) => {
    console.log(message.content);

    if(message.author.bot) return;
    
        message.reply({
            content: 'pong',
        });
})

client.on('interactionCreate', async interaction => {
    console.log(interaction);
    // if(!interaction.isCommand()) return;
    
    try {``
        if (interaction.commandName === 'ping') {

            await interaction.reply('Pong!');

        } else if (interaction.commandName === 'add-numbers') {
            
            const num1 = interaction.options.get('first_number').value;
            const num2 = interaction.options.get('second_number').value;
            
            const sum = num1 + num2;
            
            await interaction.reply(`The sum is ${sum}`);
            console.log(interaction.options, sum);
        } else if (interaction.commandName === 'set-role') {
            console.log(`Logged in as ${client.user.tag}!`);
            try {
                // const channel = await client.channels.cache.get('1229819460987388065');

                const row = new ActionRowBuilder();

                roles.forEach(role => {
                    row.components.push(
                        new ButtonBuilder()
                        .setCustomId(role.id)
                        .setLabel(role.label)
                        .setStyle(ButtonStyle.Primary)
                    )
                })

                // await channel.send({
                //     content : 'set your role',
                //     components : [row],
                // })

                await interaction.reply({
                    content : 'set your role',
                    components : [row],
                })

                console.log(row);
                // process.exit();

            } catch (error) {
                console.log(error);
            }
        } 
        else {
            console.log(interaction);
            await interaction.deferReply({ephemeral: true});

            const role = interaction.guild.roles.cache.get(interaction.customId);
            if(!role){
                await interaction.editReply('Role not found');

                return;
            }
            else{
                
                const hasRole = interaction.member.roles.cache.has(role.id);

                if(hasRole){
                    await interaction.member.roles.remove(role);
                    await interaction.editReply(`Role ${role.name} removed`);
                }else{
                    await interaction.member.roles.add(role);
                    await interaction.editReply(`Role ${role.name} added`);
                
                }
            }
        }


        await interaction.followUp(`Thank you ${interaction.user.username} \nHave a coffee!`);
    } catch (error) {
        console.error('Error replying to interaction:', error);
    }
})


client.login(process.env.CLIENT_TOKEN); 