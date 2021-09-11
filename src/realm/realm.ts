import Realm from 'realm';

const guildCreate: Realm.ObjectSchema = {
    name: 'guildCreate',
    properties: {
        id: { type: 'string', indexed: true },
        color: 'string',
        prefix: 'string',
    },
};

const realm: Realm = await Realm.open({
    schema: [
        guildCreate
    ],
});

export default realm;
