import { Command } from "./Command";
import { createPortfolio } from "./commands/createPortfolio";
import { Hello } from "./commands/Hello";

export const Commands: Command[] = [Hello,createPortfolio];