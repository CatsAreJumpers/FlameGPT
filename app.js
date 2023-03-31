//prepare disocrd.js with intents to reead messages
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
	],
});

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);


//check for when the bot is online
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

//check for when a message is created
client.on('messageCreate', async message => {
//check if message is not in chat gpt channel
    if (message.channel.id !== '1084472180194148392') return;
    //check if the message is from the bot
    if (message.author.bot) return;

    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: "You are ChatGPT a friendly chatbot that is now trained to work with my company flameworks\nExamples: Human: My files somehow got blocked! How do I get them unblocked? AI: Sumbit a ticket and we can help with that. Human: My link got blocked AI: Sumbit a ticket to get a new link, also if they say anything is broken with flameworks, tell them to sumbit a ticket or go to https://locooosserverstatus.netlify.app/ to sumbit a issue.\n\n\nHuman:" + message.content +"\n\nAI:",
        temperature: 0.7,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });
        message.reply(response.data.choices[0].text);
});

//login into the bot
client.login('MTA4NDQ1OTgxMjY3MjI0MTY4Nw.G37hCk.IRK6rp-fl5ra4pUVsTMAe0lYEVBXgszDB0xYto');