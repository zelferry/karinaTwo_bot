const { Structures, Invite } = require('discord.js');
const fetch = require('node-fetch');

module.exports = (client1) => {
	Structures.extend('VoiceChannel', VoiceChannel => {
		return class EpicVoiceChannel extends VoiceChannel {
			constructor(client, data) {
				super(client, data);
			}

		async activityInvite(ApplicationID) {
				return new Promise(res => {
					let fetched = fetch(
						`https://discord.com/api/v8/channels/${this.id}/invites`,
						{
							method: 'POST',
							body: JSON.stringify({
								max_age: 86400,
								max_uses: 0,
								target_application_id: ApplicationID,
								target_type: 2,
								temporary: false,
								validate: null
							}),
							headers: {
								Authorization: `Bot ${this.client.token}`,
								'Content-Type': 'application/json'
							}
						}
					).then(response => response.json());
					res(fetched);
				});
			}
		};
	});
};
