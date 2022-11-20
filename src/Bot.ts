import { Client } from "discord.js";
import ready from "./listeners/ready";
import interactionCreate from "./listeners/interactionCreate";


//PORT TO ENV BEFORE HOSTING BOT
const token = "MTA0MzY3NjgzMDkwNjk4MjQ2MA.GkBSiW.Z34CgSRNBJ62io-6_RjOPCBFD9JBULgehORcVA"

console.log("Bot is starting...");

const client = new Client({
    intents: []
});


ready(client)
interactionCreate(client)

client.login(token)