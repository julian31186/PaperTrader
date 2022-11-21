import { Client } from "discord.js";
import ready from "./listeners/ready";
import interactionCreate from "./listeners/interactionCreate";

//TODO
//port token to env b4 going public
//figure out COMPLETELY how this discordjs lib is working and how everything works in conjunction
//figure out how to set up MONGODB and setup a user
//setup prisma
//when bot finished compose with docker
//on bot ready, initialize the mongo db (will it save data if bot goes off then comes back on)



//PORT TO ENV BEFORE HOSTING BOT
const token = "MTA0MzY3NjgzMDkwNjk4MjQ2MA.GkBSiW.Z34CgSRNBJ62io-6_RjOPCBFD9JBULgehORcVA"

console.log("Bot is starting...");

const client = new Client({
    intents: []
});


ready(client)
interactionCreate(client)

client.login(token)