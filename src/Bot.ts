import { Client } from "discord.js";
import ready from "./listeners/ready";
import * as dotenv from 'dotenv';
import interactionCreate from "./listeners/interactionCreate";

//TODO
//figure out how to set up MONGODB and setup a user
//setup prisma
//when bot finished compose with docker
//on bot ready, initialize the mongo db (will it save data if bot goes off then comes back on)


dotenv.config()
const token = process.env.DISC_TOKEN;

console.log("Bot is starting...");

const client = new Client({
    intents: []
});


ready(client)
interactionCreate(client)

client.login(token)