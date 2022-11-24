import { Command } from "./Command";
import { createPortfolio } from "./commands/createPortfolio";
import { deletePortfolio } from "./commands/deletePortfolio";
import { price } from "./commands/price";
import { help } from "./commands/help";
//import { buy } from "./commands/buy";
//import { sell } from "./commands/sell";

export const Commands: Command[] = [price,createPortfolio,deletePortfolio,help];