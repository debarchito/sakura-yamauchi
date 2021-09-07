import { ColorResolvable } from 'discord.js';
import { random } from './share/index.js';

import type { __Client, __servers, __commands } from '$types';
import type { Message } from 'discord.js';
import type Realm from 'realm';

/*! Interfaces */

interface MessageHandler {
    msg?: Message;
    client?: __Client;
    servers?: Map<string, __servers>;
    cmd?: string;
    args?: string[];
    realm?: Realm;
}

/*! Functions */

export default async function messageHandler({
    msg, client, servers, cmd, args, realm
}: MessageHandler) {
    if(cmd === 'help') {
        if(!args!.length) {
            await msg!.reply({
                embeds: [
                    {
                        title: 'Sakura Yamauchi | Help Utility',
                        color: servers!.get(msg!.guild!.id)!.color as ColorResolvable
                    }
                ],
                allowedMentions: {
                    repliedUser: false
                }
            });
            return;
        }
        const command: __commands | undefined = client!.commands!.get(args![0]) || client!.commands!.find((cm: __commands) => !!cm.alias && cm.alias.includes(args![0]));
        if(!command) {
            await msg!.reply({
                content: `The command "${args![0]}" doesn't exist.`,
                allowedMentions: {
                    repliedUser: false
                }
            });
            return;
        }
        if(!command.description && !command.usage) {
            await msg!.channel.send({
                content: `The command "${args![0]}" isn't documented just yet. Please try again later.`,
                allowedMentions: {
                    repliedUser: false
                }
            });
            return;
        }
        let fields = [];
        if(command.alias) fields.push({
            name: 'Aliases',
            value: command.alias.map(item => `\`${item}\``).join(', ')
        });
        fields.push({
            name: 'Description',
            value: command.description
        },
        {
            name: 'Usage',
            value: command.usage
            .replace(/\{(prefix|color)\}/gm, (_: string, a: string): string => {
                if(a === 'prefix') return servers!.get(msg!.guild!.id)!.prefix;
                else if(a === 'color') return servers!.get(msg!.guild!.id)!.color.toString();
                else return '';
            })
        });
        await msg!.channel.send({
            embeds: [
                {
                    author: {
                        name: msg!.author.username,
                        icon_url: msg!.author.displayAvatarURL()
                    },
                    title: `Documentation for "${command.name}"`,
                    color: servers!.get(msg!.guild!.id)!.color as ColorResolvable,
                    fields: fields,
                    footer: {
                        text: `${client!.user!.username} (c) Debarchito`
                    }
                }
            ],
            allowedMentions: {
                repliedUser: false
            }
        });
        return;
    }
    const id = msg!.guild!.id,
    command: __commands | undefined = client!.commands!.get(cmd) || client!.commands!.find((cm: __commands) => !!cm.alias && cm.alias.includes(cmd!));
    if(!command) return;
    if(process.env.MAINTENANCE) {
        if(!JSON.parse(process.env.MAINTAINER_CLIENT_IDS!).includes(msg!.author.id)) {
            await msg!.reply({
                content: 'Sakura is under maintenance! Please try again later.',
                allowedMentions: {
                    repliedUser: false
                }
            });
            return;
        }
    } 
    if(command.permissions) {
        /*
        TODO
        */
    }
    try {
        let cname = command.name;
        await client!.commands!.get(cname).execute({
            msg, client, servers, cmd, args, realm, random
        });
    } catch(e) {
        console.error(e);
        await msg!.reply({
            content: 'Hmm...seems like an internal error! Please try again later.',
            allowedMentions: {
                repliedUser: false
            }
        });
    }
}