import Realm from 'realm';

const guildCreate: Realm.ObjectSchema = {
  name: 'guildCreate',
  properties: {
    id: { type: 'string', indexed: true },
    color: 'string',
    prefix: 'string'
  }
};

const xp: Realm.ObjectSchema = {
  name: 'xp',
  properties: {
    guildId: { type: 'string', indexed: true },
    id: { type: 'string', indexed: true },
    xp: 'int',
    level: 'int',
    requiredXp: 'int',
    totalXp: 'int'
  }
};

const realm: Realm = await Realm.open({
  schema: [guildCreate, xp]
});

export default realm;
