const fetch_ = require('node-fetch');
let Discord = require('discord.js');

class _fetch {
	constructor(
		opts = {
			token: process.env.PROTECTION_BOT_TOKEN,
			version: 'v8'
		}
	) {
		this.fetchAPI = fetch_;
		this.version = opts.version;
		this.token = opts.token;
		this.baseURL = (input, type) =>
			`https://discord.com/api/${this.version}/${type}/${input}`;
		this.cmd_img = function() {
			return {
				avatar: function(
					key,
					id,
					dynamic = false,
					format = 'webp',
					size = '2048'
				) {
					if (key) if (dynamic) format = key.startsWith('a_') ? 'gif' : format;
					return key
						? `https://cdn.discordapp.com/avatars/${id}/${key}.${format}${
								size ? `?size=${size}` : ``
						  }`
						: this.defaultAvatar(5, size ? `?size=${size}` : ``);
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
		//	this.o = []
	}
	async user(id, opinions) {
		//	let _json;
		let response = await this.fetchAPI(`${this.baseURL(id, 'users')}`, {
			headers: {
				Authorization: `Bot ${this.token}`
			}
		});

		if (response.status == '429' || !response.ok || response.status == '404')
			return {
				success: false,
				error: response.status,
				text: response.statusText
			};

		let user = await response.json();
		let userFlags = new Discord.UserFlags(user.public_flags);
		let flags_ = userFlags.serialize();

		return {
			success: true,
			user: {
				id: user.id,
				name: user.username,
				discriminator: user.discriminator,
				tag: `${user.username}#${user.discriminator}`,
				bot: user.bot ? true : false,
				verified: flags_.VERIFIED_BOT ? true : false,
				avatar: {
					key: user.avatar,
					url: this.cmd_img().avatar(user.avatar, user.id, true, 'png')
				},
				banner: {
					key: user.banner,
					url: this.cmd_img().banner(user.banner, user.id, true, 'png'),
					color: user.banner_color
				},
				flags: {
					key: user.public_flags,
					flags: userFlags.toArray(),
					info: user.bot ? 'no compatibility for bots' : flags_
				},
				toString: `<@${user.id}>`
			},
			discordInput: user,
            resolve: function(){
                return {
                    id: user.id,
                    username: user.username,
                    tag: `${user.username}#${user.discriminator}`,
                    avatar: this.cmd_img().avatar(user.avatar, user.id, true, 'png')
                }
            }
		};
	}
}

//Object.defineProperty(o, '__esModule', { value: true });

module.exports = _fetch;