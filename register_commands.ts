const BOT_TOKEN = Deno.env.get('BOT_TOKEN')!;
const APP_ID = Deno.env.get('APP_ID');

const url = `https://discord.com/api/v10/applications/${APP_ID}/commands`;

export function registerCommands() {
  return fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bot ${BOT_TOKEN}`,
    },
    body: JSON.stringify([
      {
        name: 'r',
        type: 1,
        description: 'Roll dice',
        options: [
          {
            name: "dice",
            "description": "The dice to roll or 'help' for help.",
            "type": 3,
            "required": true
          },
        ],
      }
    ]),
  });
}
