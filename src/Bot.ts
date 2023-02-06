import { Client } from "discord.js";
import ready from "./listeners/ready";
import * as dotenv from 'dotenv';
import interactionCreate from "./listeners/interactionCreate";

dotenv.config()
const token = process.env.DISC_TOKEN;

console.log("Bot is starting...");

const client = new Client({
    intents: []
});


ready(client)
interactionCreate(client)

client.login(token)