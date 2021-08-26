const { APIMessage, Structures,UserFlags,MessageEmbed } = require("discord.js");
module.exports = (client) => {
class Message extends Structures.get("Message") {
    async inlineReply(content, options) {
        const mentionRepliedUser = typeof ((options || content || {}).allowedMentions || {}).repliedUser === "undefined" ? true : ((options || content).allowedMentions).repliedUser;
        delete ((options || content || {}).allowedMentions || {}).repliedUser;

        const apiMessage = content instanceof APIMessage ? content.resolveData() : APIMessage.create(this.channel, content, options).resolveData();
        Object.assign(apiMessage.data, { message_reference: { message_id: this.id } });
    
        if (!apiMessage.data.allowed_mentions || Object.keys(apiMessage.data.allowed_mentions).length === 0)
            apiMessage.data.allowed_mentions = { parse: ["users", "roles", "everyone"] };
        if (typeof apiMessage.data.allowed_mentions.replied_user === "undefined")
            Object.assign(apiMessage.data.allowed_mentions, { replied_user: mentionRepliedUser });

        if (Array.isArray(apiMessage.data.content)) {
            return Promise.all(apiMessage.split().map(x => {
                x.data.allowed_mentions = apiMessage.data.allowed_mentions;
                return x;
            }).map(this.inlineReply.bind(this)));
        }

        const { data, files } = await apiMessage.resolveFiles();
        return this.client.api.channels[this.channel.id].messages
            .post({ data, files })
            .then(d => this.client.actions.MessageCreate.handle(d).message);
    }
    
    //
    async lineReplyNoMention(content, options) {
    const apiMessage = content instanceof APIMessage ? content.resolveData() : APIMessage.create(this.channel, content, options).resolveData();
    Object.assign(apiMessage.data, { message_reference: { message_id: this.id } });

    if (!apiMessage.data.allowed_mentions || Object.keys(apiMessage.data.allowed_mentions).length === 0) {
      apiMessage.data.allowed_mentions = {
        parse: ["users", "roles", "everyone"]
      }
    }

    Object.assign(apiMessage.data.allowed_mentions, { replied_user: false });

    if (Array.isArray(apiMessage.data.content)) {
      return Promise.all(apiMessage.split().map(x => {
        x.data.allowed_mentions = apiMessage.data.allowed_mentions;
        return x;
      }).map(this.lineReply.bind(this)));
    }

    const { data, files } = await apiMessage.resolveFiles();
    return this.client.api.channels[this.channel.id].messages
      .post({ data, files })
      .then(d => this.client.actions.MessageCreate.handle(d).message);
  }
    //
async moreUserJson(inforUser){
    	
function cmd_img()  {
return {avatar: function(key,id,dynamic = false,format = 'webp',size = '2048') {
if (key) if (dynamic) format = key.startsWith('a_') ? 'gif' : format;
return key ? `https://cdn.discordapp.com/avatars/${id}/${key}.${format}${size ? `?size=${size}` : ``}`: this.defaultAvatar(5, size ? `?size=${size}` : ``);
				},

				banner: function(
					key,
					id,
					dynamic = false,
					format = 'webp',
					size = '2048'
				) {
					if (key) if (dynamic) format = key.startsWith('a_') ? 'gif' : format;
					return key
						? `https://cdn.discordapp.com/banners/${id}/${key}.${format}${
								size ? `?size=${size}` : ``
						  }`
						: null;
				},

				defaultAvatar: function(id, size) {
					if (id > 5) id = 5;
					let c = Math.floor(Math.random() * id);
					return `https://cdn.discordapp.com/embed/avatars/${c}.png${size}`;
				}
			};
		};
    	
    	let user = await this.client.api.users[inforUser].get()
    	
    	let userFlags = new UserFlags(user.public_flags);
    	
    	let flags_ = userFlags.serialize();
    	
    	return {
			user: {
				id: user.id,
				name: user.username,
				discriminator: user.discriminator,
				tag: `${user.username}#${user.discriminator}`,
				bot: user.bot ? true : false,
				verified: flags_.VERIFIED_BOT ? true : false,
				avatar: {
					key: user.avatar,
					url: cmd_img().avatar(user.avatar, user.id, true, 'png')
				},
				banner: {
					key: user.banner,
					url: cmd_img().banner(user.banner, user.id, true, 'png'),
					color: user.banner_color
				},
				flags: {
					key: user.public_flags,
					flags: userFlags.toArray(),
					info: user.bot ? 'no compatibility for bots' : flags_
				},
				toString: `<@${user.id}>`
			}
		};
    }


    async multipleEmbedSend(d,f){
    	return this.client.api.channels[this.channel.id].messages.post({ data:d, files:f }).then(d => this.client.actions.MessageCreate.handle(d).message);
    }
    
}

Structures.extend("Message", () => Message);
}