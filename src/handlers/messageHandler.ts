import type { __Client, __servers, __commands } from '$types';
import type { Message, TextChannel, PermissionResolvable } from 'discord.js';

/*! Interfaces */

interface MessageHandler {
    msg: Message;
    client: __Client;
    servers: Map<string, __servers>;
    cmd: string;
    args: string[];
    realm: any; //TODO: Un-"any"-ify Realm in future
}

/*! Functions */

export default async function messageHandler({
    msg, client, servers, cmd, args, realm
}: MessageHandler) {
    const id = msg.guild!.id,
    command: __commands | undefined = client.commands!.get(cmd) || client.commands!.find((cm: __commands) => !!cm.alias && cm.alias.includes(cmd));
    if(!command) return;
    if(command.permissions) {
        let author = (msg.channel as TextChannel).permissionsFor(msg.author);
        let perms = command.permissions;
        if(!author || !author!.has((perms as PermissionResolvable))) {
            let perms_in_question: string[] = [];
            perms.forEach((perm: string) => {
                if(!author!.has((perm as PermissionResolvable))) perms_in_question.push(perm);
            });
            await msg.reply({
                content: `Sorry but you can't use this command. You don't have the following permissions: \`${perms_in_question.join(", ")}\` which are required to use this command.`,
                allowedMentions: {
                    repliedUser: false
                }
            });
        }
    }
    try {
        let cname = command.name;
        await client.commands!.get(cname).execute({
            msg, client, servers, cmd, args, realm
        });
    } catch(e) {
        console.error(e);
        await msg.reply({
            content: 'Hmm...seems like an internal error! Please try again later.',
            allowedMentions: {
                repliedUser: false
            }
        });
    }
}