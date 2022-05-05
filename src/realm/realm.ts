import Realm from "realm";

/**
 * @description Guild registration schema
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
 * @description User experience schema
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
 * @description Main database instance
 */
const realm = await Realm.open({
  schema: [guild, xp]
});

export default realm;
