import { readdir } from 'fs/promises';
import { resolve } from 'path';
import { type as osType } from 'os';
import type { __servers, __Client, __commands } from '$types';
import type { Message } from 'discord.js';
import messageHandler from './messageHandler.js';

/*! Interfaces */

interface CommandHandler {
    msg: Message;
    client: __Client;
    servers: Map<string, __servers>;
    realm: any; //TODO: Un-"any"-ify Realm in future
}

/*! Functions */

export async function commandsLoader(client: __Client): Promise<void> {
    try {
        const commandsDir = await readdir('./commands');
        for(const folder of commandsDir) {
            const commands = (await readdir(`./commands/${folder}`)).filter(file => file.endsWith('.js'));
            for(const file of commands) {
                const src = resolve(resolve(), `./commands/${folder}/${file}`),
                { default: command }: { default: __commands } = await import((osType() === 'Windows_NT' ? `file://${src}` : src));
                client.commands.set(command.name, command);
            }
        }
    } catch(err) {
        console.error(err);
    }
}

export async function commandHandler({
    msg, client, servers, realm
}: CommandHandler): Promise<void> {
    if(!msg!.author.bot) {
        if(process.env.MAINTENANCE) {
            if(msg!.author.id !== process.env.MAINTAINER_CLIENT_ID) {
                await msg.reply({
                    content: 'Sakura is under maintenance! Please try again later.',
                    allowedMentions: {
                        repliedUser: false
                    }
                });
                return;
            }
        } 
        let content = msg.content.trim(),
        client_id = process.env.RUNTIME === 'prod' ? process.env.CLIENT_ID : process.env.TEST_CLIENT_ID;
        if(content.toLowerCase().startsWith(servers.get(msg.guild!.id).prefix)) {
            let args = content.slice(servers.get!(msg.guild!.id).prefix.length).trim().split(/ +/),
            cmd = args.shift()!.toLowerCase();
            await messageHandler({ msg, client, servers, cmd, args, realm });
        } else if(content.toLowerCase().startsWith(`<@${client_id}>`)) {
            let args = content.slice(`<@${client_id}>`.length).trim().split(/ +/),
            cmd = args.shift()!.toLowerCase();
            await messageHandler({ msg, client, servers, cmd, args, realm });
        }
    }
};