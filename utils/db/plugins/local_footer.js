const mkdirp = require('mkdirp')
let stringify = function stringify(obj) {
	return JSON.stringify(obj, null, 2);
};
const fs =require("fs") 
const readFile = fs.readFileSync;
const writeFile = fs.writeFileSync;

class MyStorage {
	constructor(source,{ defaultValue = {}, serialize = stringify, deserialize = JSON.parse } = {}) {

		this.source = source.db+".yaml";
		this.defaultValue = defaultValue;
		this.serialize = serialize;
		this.deserialize = deserialize;
		this.f = "database/db/"+source.ftr
	}
	read() {
		try{
		if(fs.existsSync(this.f+"/"+this.source)){
			//console.log("\\")
		const data = readFile(this.f+"/"+this.source, 'utf-8').trim();
		return data ? this.deserialize(data) : this.defaultValue;
		} else {
		//	console.log("/")
			mkdirp(this.f).then((x)=>{
			writeFile(this.f+"/"+this.source, this.serialize(this.defaultValue));
			})
			return this.defaultValue;
		}
		} catch(e){
if (e instanceof SyntaxError) {
					e.message = `Malformed JSON in file: ${this.source}\n${e.message}`;
				}
				throw e;
		}
	}

	write(data) {
		if(fs.existsSync(this.f+"/"+this.source)){
		return writeFile(this.f+"/"+this.source, this.serialize(data));
		} else {
			
		}
	}
}

module.exports = MyStorage