import type { __commands } from '$types';

const command: __commands = {
    name: 'random',
    alias: ['rand'],
    description: 'Generate a random number!',
    usage: `\`\`\`{prefix}random [0 to 10]
{prefix}random <Max> [0 to <Max>]
{prefix}random <Min> <Max> [<Min> to <Max>]\`\`\``,
    async execute({ args, random, msg }) {
        let len: number = args!.length,
        min: number, max: number;
        if(len === 0) {
            min = 0;
            max = 10;
        } else if(len === 1) {
            min = 0;
            let max_temp: number = Number(args![0]);
            if(isNaN(max_temp)) {
                await msg!.reply({
                    content: `The first argument "${args![0]}" is not a number.`,
                    allowedMentions: {
                        repliedUser: false
                    }
                });
                return;
            }
            max = Math.abs(max_temp);
        } else if(len >= 2) {
            let min_temp: number = Number(args![0]);
            let max_temp: number = Number(args![1]);
            if(isNaN(min_temp)) {
                await msg!.reply({
                    content: `The first argument "${args![0]}" is not a number.`,
                    allowedMentions: {
                        repliedUser: false
                    }
                });
                return;
            } else if(isNaN(max_temp)) {
                await msg!.reply({
                    content: `The second argument "${args![1]}" is not a number.`,
                    allowedMentions: {
                        repliedUser: false
                    }
                });
                return;
            }
            min = Math.abs(min_temp);
            max = Math.abs(max_temp);
        }
        const result: number = random!(min!, max!);
        await msg!.reply({
            content: `Your random number (min: ${min!}, max: ${max!}) is \`${result}\``,
            allowedMentions: {
                repliedUser: false
            }
        });
    }
}

export default command;