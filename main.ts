import {
  json,
  serve,
} from "https://deno.land/x/sift@0.4.4/mod.ts";
import {registerCommands} from './register_commands.ts';
import {verifyAndValidateRequest} from './verify.ts';
import {RCommand} from './r_command.ts';

serve({
  "/": home,
  "/register": register,
});

async function home(request: Request) {
  const {
    body,
    error
  } = await verifyAndValidateRequest(request);

  if (error) {
    return json(...error);
  }

  const { type = 0, data = { options: [], name: '' } } = JSON.parse(body);
  // Type 1 in a request implies a Ping interaction.
  if (type === 1) {
    return json({
      type: 1
    });
  }

  // Type 2 in a request is an ApplicationCommand interaction.
  if (type === 2) {
    if (data.name === RCommand.name) {
      return json(RCommand.handler(data.options));
    }
  }

  return json({ error: "bad request" }, { status: 400 });
}

async function register() {
  console.log('Registering Commands');
  const res = await registerCommands();
  const j = await res.json();
  if (!res.ok) {
    console.log('Registering failed');
    return json(j, {status: 400});
  } else {
    console.log('Registering succeded');
    return json(j, {status: 200});
  }
}

