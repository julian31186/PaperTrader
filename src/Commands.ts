import { Command } from "./Command";
import { createPortfolio } from "./commands/createPortfolio";
import { deletePortfolio } from "./commands/deletePortfolio";
import { price } from "./commands/price";


export const Commands: Command[] = [price,createPortfolio,deletePortfolio];