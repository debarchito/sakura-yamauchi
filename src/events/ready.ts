import activity from '../dialogues/activity.js';

import type { Event } from '$types';

const event: Event.Init = {
  method: 'once',
  listen({ client }) {
    return async function () {
      client!.user!.setActivity(activity![0].value, {
        type: activity![0].id
      });
      setInterval((): void => {
        const i = Math.floor(Math.random() * (activity.length - 1) + 1);
        client!.user!.setActivity(activity[i].value, {
          type: activity[i].id
        });
      }, 15000);
      console.log('[?] (Ready) Client is ready!');
    };
  }
};

export default event;
