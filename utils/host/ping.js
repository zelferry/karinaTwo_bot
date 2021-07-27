let fetch = require('node-fetch');
let weblink = require('../../database/client/config.json');

let urls = weblink.host.links;

function send() {
	for (var i = 0; i < urls.length; i++) {
		fetch(urls[i]);
	}
}

module.exports = () => {
	send();
	setInterval(send, 120000);
};