import Realm from 'realm';

const guildCreate: {
    name: string;
    properties: {
        id: { type: string; indexed: boolean },
        color: { type: string; default: string },
        prefix: { type: string; default: string }
    }
} = {
    name: 'guildCreate',
    properties: {
        id: { type: 'string', indexed: true },
        color: { type: 'string', default: '#FCA9F3' },
        prefix: { type: 'string', default: 's!' }
    }
}

const realm: any = await Realm.open({
    schema: [
        guildCreate
    ]
});

export default realm;