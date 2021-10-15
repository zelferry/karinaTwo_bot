
class webhooks {
    constructor(client){
        this.client = client;
        this.defautConfig = {
            name: `${(client.user.username).split(" ").join("").toLowerCase()}Webhook`,
            avatar: client.user.displayAvatarURL({ dynamic: true })
        };
        this.noAvatar = "" 
    }
    async makeWebhookAndSend(opitions = {}, message){
        let webhook = await message.channel.fetchWebhooks();
        webhook = webhook.find(x => x.name === this.defautConfig.name);
        
        if (!webhook) {
            webhook = await message.channel.createWebhook(`${this.defautConfig.name}`, {
                avatar: `${this.defautConfig.avatar}`
            });
        }
        
        await webhook.edit({
            name: opitions.name ?? "webhook",
            avatar: opitions.avatar ?? this.noAvatar
        });
        webhook.send(opitions.msg).catch(err => {});
        await webhook.edit({
            name: this.defautConfig.name,
            avatar: this.defautConfig.avatar
        })
    }
}
module.exports = webhooks