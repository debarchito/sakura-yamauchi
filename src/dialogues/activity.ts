interface Activity extends Array<{
    id: number; name: string; value: string;
}>{}

const activity: Activity = [
    { "id": 3, "name": "WATCHING", "value": "the world smile!" },
    { "id": 3, "name": "WATCHING", "value": "the movie: I want to eat your pancreas!" },
    { "id": 0, "name": "PLAYING", "value": "with Kyoko!" },
    { "id": 3, "name": "WATCHING", "value": "over Haruki!" },
    { "id": 2, "name": "LISTENING", "value": "Fuyu. Are you doing good?" },
    { "id": 2, "name": "LISTENING", "value": "bird chirping!" },
    { "id": 3, "name": "WATCHING", "value": "the cherry blossoms!" }
]
export default activity;