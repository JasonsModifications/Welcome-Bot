# Discord Bot Setup Guide  

This guide will walk you through setting up and running your Discord bot.  

## Prerequisites  

Before you start, make sure you have the following installed:  
- [Node.js](https://nodejs.org/) (LTS recommended)  
- [Git](https://git-scm.com/) (optional but recommended)  
- A [Discord Developer Account](https://discord.com/developers/applications)  

## 1. Clone or Download the Bot  

If you have Git installed, you can clone the repository:  

```sh
git clone <repository-url>
cd <repository-folder>
```

Or, if you downloaded the bot.js file manually, place it in a folder and navigate to that folder.  

## 2. Install Dependencies  

Run the following command to install the necessary dependencies:  

```sh
npm install discord.js
```

## 3. Set Up Your Bot  

1. Go to the [Discord Developer Portal](https://discord.com/developers/applications).  
2. Click **New Application** and give it a name.  
3. Go to the **Bot** tab and click **Add Bot**.  
4. Copy the **Bot Token** and replace `Bot Token Here` in `bot.js` with your actual token.  
5. Enable the **Privileged Gateway Intents**:  
   - Turn on **Server Members Intent** under the Bot settings.  

## 4. Deploy Slash Commands  

Run the bot once to register the slash commands:  

```sh
node bot.js
```

After running, the command `/setchannel` will be available in your Discord server.  

## 5. Invite the Bot to Your Server  

1. Go to the **OAuth2** tab in the Discord Developer Portal.  
2. Click on **URL Generator** and select:  
   - `bot`  
   - `applications.commands`  
3. Scroll down and choose bot permissions like `Send Messages`, `Embed Links`, and `Read Messages`.  
4. Copy the generated link and paste it into your browser to invite the bot to your server.  

## 6. Running the Bot  

Start the bot using:  

```sh
node bot.js
```

The bot should now be running and able to send welcome/leave messages!  

## 7. Setting Up Channels  

Use the command below in Discord to set the channels for welcome and leave messages:  

```sh
/setchannel type:welcome channel:#your-welcome-channel  
/setchannel type:leave channel:#your-leave-channel  
```

## Troubleshooting  

- If the bot doesn't respond, make sure it has **permission to read and send messages** in the selected channels.  
- If you get an error when running `node bot.js`, make sure all dependencies are installed properly.  

## License  

This bot is free to use and modify. Enjoy!
