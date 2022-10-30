/**
 * Returns a random number between min and max (inclusive)
 */
export function random(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Returns the current category respecting options.json
 */
export function category(url: string): string {
  const category_url = url.substring(0, url.lastIndexOf("/")),
    parts = category_url.split("/"),
    category_name = parts[parts.length - 1],
    options_json_url = `${category_url.replace("file:///", "")}/options.json`,
    // Default options
    options = {
      category: category_name[0].toUpperCase() + category_name.slice(1).toLowerCase(),
      category_emoji: "",
    };

  try {
    Object.assign(
      options,
      JSON.parse(new TextDecoder("utf-8").decode(Deno.readFileSync(options_json_url))),
    );
  } catch (error) {
    // Ignore if options.json doesn't exist but catch any other error
    if (!(error instanceof Deno.errors.NotFound)) {
      throw error;
    }
  }

  return `${options.category_emoji} ${options.category}`.trim();
}
