import Realm from "realm";

/**
 * Guild registration schema
 */
const guild: Realm.ObjectSchema = {
  name: "guild",
  properties: {
    id: { type: "string", indexed: true },
    color: "string",
    prefix: "string"
  }
};

/**
 * User experience schema
 */
const xp: Realm.ObjectSchema = {
  name: "xp",
  properties: {
    guildId: { type: "string", indexed: true },
    id: { type: "string", indexed: true },
    xp: "int",
    level: "int",
    requiredXp: "int",
    totalXp: "int"
  }
};

/**
 * Main database instance
 */
const realm = await Realm.open({
  schema: [guild, xp]
});

export default realm;
