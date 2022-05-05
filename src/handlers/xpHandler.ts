import realm from "../realm/realm.js";
import share from "./share/share.js";

import type { Message } from "discord.js";
import type { XP } from "$types";

interface XPCooldowns {
  [guildID: string]: {
    [userID: string]: number;
  };
}

const xpCooldowns: XPCooldowns  = {};

export default async function xpHandler(msg: Message): Promise<void> {
  const uid = msg.author.id,
    gid = msg.guild!.id;

  if (!xpCooldowns[gid]) {
    xpCooldowns[gid] = {};
  }
  if (!xpCooldowns[gid][uid]) {
    xpCooldowns[gid][uid] = Date.now();
  }

  if (Date.now() >= xpCooldowns[gid][uid]) {
    const search = realm.objects<XP.Init>("xp").filtered(`guildId == "${gid}" && id == "${uid}"`),
      xpGain = share.random(15, 20);

    if (search.length) {
      const user = search[0];

      realm.write(async () => {
        if (user.xp + xpGain >= user.requiredXp) {
          user.xp = user.xp + xpGain - user.requiredXp;
          user.totalXp += xpGain;
          user.level++;
          user.requiredXp =
            (5 / 6) * user.level * (2 * user.level * user.level + 27 * user.level + 91);

          msg.reply({
            content: `Congrats! You just reached Level ${user.level}! You need more ${
              user.requiredXp - user.xp
            } XP points to reach Level ${user.level + 1}`
          });
        } else {
          user.xp += xpGain;
          user.totalXp += xpGain;
        }

        xpCooldowns[gid][uid] = Date.now() + 120_000;
      });
    } else {
      realm.write(() => {
        realm.create<XP.Init>("xp", {
          id: msg.author.id,
          xp: xpGain,
          level: 0,
          requiredXp: 50,
          totalXp: xpGain,
          guildId: msg.guild!.id
        });

        xpCooldowns[gid][uid] = Date.now() + 120_000;
      });
    }
  }
}
