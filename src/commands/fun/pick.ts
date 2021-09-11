import type { Sakura } from '$types';

const command: Sakura.Command = {
    alias: ['pk'],
    description: 'Picks an argument randomly from given arguments!',
    usage: `\`\`\`{prefix}pick <Arg 1>, <Arg 2>, <Arg 3>, ...\`\`\``,
    async execute({ args, client, msg }) {
        let len: number = args!.length,
        prefix: string = client!.servers!.get(msg!.guild!.id)!.prefix,
        message: string;
        if(len === 0) message = `Didn't receive any argument while expecting at least 2 arguments! Type "${prefix}help pick" to know more about it.`;
        else if(len === 1) message = `Received one argument while expecting at least 2 arguments! Type "${prefix}help pick" to know more about it.`;
        else message = `I choose: ${args![Math.floor(Math.random() * args!.length)].slice(0, -1)}`;
        await msg!.reply({ 
            content: message!,
            allowedMentions: {
                repliedUser: false
            }
        });
    }
};

export default command;
