const {Telegraf} = require('telegraf');
const {message} = require('telegraf/filters');
const express = require("express");
require("dotenv").config();
const {Configuration, OpenAIApi } = require("openai");

const app = express();

app.use(express.json());

const port = process.env.PORT || 5000;

app.listen(port, ()=>{
    console.log(`Server listening on port ${port}`)
});

const configuration = new Configuration({
    apiKey: process.env.OPEN_AI_KEY,
});

const openai = new OpenAIApi(configuration);

app.post("/find-complexity", async (req, res, next)=>{
    try{
        const response= await openai.createCompletion({
            model: "text-davinci-003",
                prompt: `
                        const example = (arr) => {
                            arr.map(item) => {
                                console.log(item2);
                            });
                        };
                `,
        max_tokens: 64,
        temperature: 0,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
        stop: ["\n"],
        });

        return res.status(200).json({
            message: "Working",
        });
    }catch(error){

    }
});
const bot = new Telegraf('5653401756:AAGR0FqFfnDnbRDrsqVxnZshJu2-R9bQN78');
// const bot  = new Telegraf('5653401756:AAGR0FqFfnDnbRDrsqVxnZshJu2-R9bQN78');

// bot.start((ctx) => {
//     ctx.reply('Welcome');
// });

// bot.on(message('mensaje especifico'), (ctx) =>{
//     console.log(ctx.message)
//     ctx.reply('No')
// }
// );

bot.hears('Bryan se la come', (ctx) =>{
    ctx.reply('confirmo')
})

bot.launch()