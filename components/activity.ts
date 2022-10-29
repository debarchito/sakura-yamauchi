/*

 ? Reference Table:

 +---------------+-------------+
 | Activity Name | Activity ID |
 +---------------+-------------+
 | PLAYING       | 0           |
 | STREAMING     | 1           |
 | LISTENING     | 2           |
 | WATCHING      | 3           |
 | COMPETING     | 5           |
 +---------------+-------------+

*/

interface Activity {
  id: 0 | 1 | 2 | 3 | 5;
  value: string;
}

/**
 * List of activities to display every `n` seconds
 */
const activity: Array<Activity> = [
  { id: 3, value: "the world smile!" },
  { id: 3, value: "the movie: I want to eat your pancreas!" },
  { id: 0, value: "with Kyoko!" },
  { id: 3, value: "over Haruki!" },
  { id: 2, value: "Fuyu. Are you doing good?" },
  { id: 2, value: "bird chirping!" },
  { id: 3, value: "the cherry blossoms!" },
];

/**
 * Activity interval in ms
 */
const activityInterval = 15_000;

export { activity, activityInterval };
