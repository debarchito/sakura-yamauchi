import { __commands, __execute } from "$types";
const command: __commands = {
    name: 'ping',
    description: 'Gets the latency!',
    async execute({ msg }: __execute) {
        await msg.channel.send({
            content: "Pong!"
        });
    }
};
export default command;