/*

*/
const fs = require('fs');

function searchByExtension(directory, extension = 'js') {
	let files = fs.readdirSync(directory);

	const accumulator = [];
	const currentDirFiles = [];

	for (const file of files) {
		if (file.split('.').length === 1) {
			const result = searchByExtension(`${directory}/${file}`, extension);
			accumulator.push(...result);
			continue;
		}

		if (file.split('.').pop() === extension) {
			currentDirFiles.push(`${directory}/${file}`);
		}
	}

	if (currentDirFiles.length > 0) {
		accumulator.push({
			directory: directory,
			files: currentDirFiles
		});
	}

	return accumulator;
}


class events {
	constructor(dir, client,clusterID, ipc) {
		for (const dirInfo of searchByExtension(dir, 'js')) {
			for (const file of dirInfo.files) {
				let events = require(file);
				if (!Array.isArray(events)) {
					events = [events];
				}

				for (const event of events) {
					if (!event.type || !event.start) {
						continue;
					}
					if(event.type == "INTERACTION_CREATE"){
						client.ws.on(event.type, (...args) => event.start(client,clusterID,ipc,...args))
					}
					client.on(event.type, (...args) => event.start(client,clusterID,ipc, ...args));
				}
			}
		}
	}
}
module.exports = events