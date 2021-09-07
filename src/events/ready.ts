import { __event } from '$types';

const event: __event = {
    method: 'once',
    name: 'ready',
    listen({ client, activity }) {
        return async function() {
            client!.user!.setActivity(activity![0].value, {
                type: activity![0].id 
            });
            setInterval((): void => {
                let i: number = Math.floor(Math.random() * (activity!.length - 1) + 1);
                client!.user!.setActivity(activity![i].value, {
                   type: activity![i].id 
                });
            }, 15000);
            console.log('[?] (Ready) Client is ready!');
        }
    }
}

export default event;
