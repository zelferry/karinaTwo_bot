module.exports = {
    sfw: [
        {
            type: 3,
            name: "image",
            description: "tipo de imagem",
            required: true,
            choices: require("../../slash_commands/choices/nsfw/nekos.json").sfw
        }
    ],
    nsfw: [
        {
            type: 3,
            name: "image",
            description: "tipo de imagem",
            required: true,
            choices: require("../../slash_commands/choices/nsfw/nekos.json").nsfw
        }
    ]
}