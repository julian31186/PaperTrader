import { Command } from "./Command";
import { createPortfolio } from "./commands/createPortfolio";
import { deletePortfolio } from "./commands/deletePortfolio";


export const Commands: Command[] = [createPortfolio,deletePortfolio];