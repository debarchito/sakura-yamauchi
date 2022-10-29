import { config } from "dotenv/mod.ts";

/**
 * Read env variables from .env
 */
export function env() {
  return config();
}

/**
 * Return appropriate token depending on the environment
 */
export function token() {
  const object = env();
  return object.MAINTENANCE === "on" ? object.MAINTENANCE_TOKEN : object.TOKEN;
}
