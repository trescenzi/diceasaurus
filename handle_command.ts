type CommandType = {
  value: string;
  name: string;
};

type Commands = CommandType[];

type InteractionData<T extends Commands> = {
  options: Options<T>;
  name: string;
  id: string;
};

type Options<T extends Commands> = {
  [K in keyof T]: {
    value: T[K]["value"];
    name: T[K]["name"];
  };
};

type Interaction<T extends Commands> = {
  type: 1 | 2 | 3;
  token: string;
  member: {
    user: {
      id: string;
      username: string;
      avatar: string;
      discriminator: string;
      public_flags: number;
    };
    roles: string[];
    premium_since: string;
    permissions: string;
    pending: boolean;
    nick: string | null;
    joined_at: string;
    is_pending: string;
    deaf: boolean;
    mute: boolean;
  };
  id: string;
  guild_id: string;
  app_permissions: string;
  guild_locale: string;
  locale: string;
  channel_id: string;

  data: InteractionData<T>;
};

export enum ResponseType {
  Pong = 1,
  Message = 4,
  // TODO there's more here
}

type ResponseData = {
  tts?: boolean;
  content?: string;
  // TODO there's more here
};

type CommandResponse = {
  data?: ResponseData;
  type: ResponseType;
};

export type SlashCommand<T extends Commands> = {
  name: string;
  handler: (options: Options<T>) => CommandResponse;
};
