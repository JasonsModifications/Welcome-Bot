const { Client, GatewayIntentBits, EmbedBuilder, REST, Routes, SlashCommandBuilder } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.MessageContent] });

const token = "Bot Token Here";  // Replace this with your bot token

const rest = new REST({ version: '10' }).setToken(token);

// Define a global variable to store the welcome and leave channels
let welcomeChannelId = null;
let leaveChannelId = null;

// Register slash commands after the bot is ready
client.once('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`);
    await registerSlashCommands();
});

// Slash command registration
async function registerSlashCommands() {
    const commands = [
        new SlashCommandBuilder()
            .setName('setchannel')
            .setDescription('Set the channel for welcome or leave messages')
            .addStringOption(option =>
                option.setName('type')
                    .setDescription('The type of message (welcome/leave)')
                    .setRequired(true)
                    .addChoices(
                        { name: 'welcome', value: 'welcome' },
                        { name: 'leave', value: 'leave' }
                    ))
            .addChannelOption(option =>
                option.setName('channel')
                    .setDescription('The channel for the message')
                    .setRequired(true)),

    ].map(command => command.toJSON());

    try {
        await rest.put(Routes.applicationCommands(client.user.id), { body: commands });
        console.log('Successfully registered application commands.');
    } catch (error) {
        console.error('Error registering commands:', error);
    }
}

// Command handling
client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    if (commandName === 'setchannel') {
        const type = interaction.options.getString('type');
        const channel = interaction.options.getChannel('channel');

        if (type === 'welcome') {
            welcomeChannelId = channel.id;
            return await interaction.reply(`Welcome messages will now be sent to ${channel}`);
        } else if (type === 'leave') {
            leaveChannelId = channel.id;
            return await interaction.reply(`Leave messages will now be sent to ${channel}`);
        }
    }
});

// Welcome message with embed
client.on('guildMemberAdd', member => {
    if (!welcomeChannelId) return;

    const welcomeChannel = member.guild.channels.cache.get(welcomeChannelId);
    if (!welcomeChannel) return;

    const welcomeEmbed = new EmbedBuilder()
        .setColor('#00FF00')
        .setTitle('Welcome!')
        .setDescription(`Welcome to the server, ${member.user.tag}! We hope you have a great time here!`)
        .setThumbnail(member.user.displayAvatarURL())
        .setFooter({ text: `Joined on ${member.joinedAt.toLocaleDateString()}` });

    welcomeChannel.send({ embeds: [welcomeEmbed] });
});

// Leave message with embed
client.on('guildMemberRemove', member => {
    if (!leaveChannelId) return;

    const leaveChannel = member.guild.channels.cache.get(leaveChannelId);
    if (!leaveChannel) return;

    const leaveEmbed = new EmbedBuilder()
        .setColor('#FF0000')
        .setTitle('Goodbye!')
        .setDescription(`${member.user.tag} has left the server. We will miss you!`)
        .setThumbnail(member.user.displayAvatarURL())
        .setFooter({ text: `Left on ${new Date().toLocaleDateString()}` });

    leaveChannel.send({ embeds: [leaveEmbed] });
});

client.login(token);
