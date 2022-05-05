import activity from "../dialogues/activity.js";
import type { Event } from "$types";

const event: Event.Init = {
  method: "once",
  listen({ client, share: { random } }) {
    return async function () {
      client.user!.setActivity(activity[0].value, {
        type: activity[0].id
      });

      setInterval(() => {
        const i = random(0, activity.length - 1);

        client.user!.setActivity(activity[i].value, {
          type: activity[i].id
        });
      }, 15_000);

      console.log("[event: ready] Client is ready");
    };
  }
};

export default event;
