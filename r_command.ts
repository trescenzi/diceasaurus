import { DiceRoll } from "https://cdn.skypack.dev/@dice-roller/rpg-dice-roller";
import { SlashCommand } from "./handle_command.ts";

export type DiceCommand = {
  name: "dice";
  value: string;
};

export const RCommand: SlashCommand<[DiceCommand]> = {
  name: "r",
  handler: (options) => {
    const { value } = options[0];
    const roll = new DiceRoll(value);
    return {
      data: {
        content: roll.output,
      },
      type: 4,
    };
  },
};
