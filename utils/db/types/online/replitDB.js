const fetch = require("node-fetch");

class Client {
  constructor(key) {
    if (key) this.key = key;
    else this.key = process.env.REPLIT_DB_URL;
  }

  async get(key, options) {
    return await fetch(this.key + "/" + key)
      .then((e) => e.text())
      .then((strValue) => {
        if (options && options.raw) {
          return strValue;
        }

        if (!strValue) {
          return null;
        }

        let value = strValue;
        try {
          value = JSON.parse(strValue);
        } catch (_err) {
          throw new SyntaxError(
            `Failed to parse value of ${key}, try passing a raw option to get the raw value`
          );
        }

        if (value === null || value === undefined) {
          return null;
        }

        return value;
      });
  }
  
  async set(key, value) {
    const strValue = JSON.stringify(value);

    await fetch(this.key, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: key + "=" + strValue,
    });

    return this;
  }

  async delete(key) {
    await fetch(this.key + "/" + key, { method: "DELETE" });
    return this;
  }

  async list(prefix = "") {
    return await fetch(
      this.key + `?encode=true&prefix=${encodeURIComponent(prefix)}`
    )
      .then((r) => r.text())
      .then((t) => {
        if (t.length === 0) {
          return [];
        }
        return t.split("\n").map(decodeURIComponent);
      });
  }

  async empty() {
    const promises = [];
    for (const key of await this.list()) {
      promises.push(this.delete(key));
    }

    await Promise.all(promises);

    return this;
  }

  async getAll() {
    let output = {};
    for (const key of await this.list()) {
      let value = await this.get(key);
      output[key] = value;
    }
    return output;
  }

  async setAll(obj) {
    for (const key in obj) {
      let val = obj[key];
      await this.set(key, val);
    }

    return this;
  }

  async deleteMultiple(...args) {
    const promises = [];

    for (const arg of args) {
      promises.push(this.delete(arg));
    }

    await Promise.all(promises);

    return this;
  }
  
  async listAllAsObject() {
    const output = [];

    for (const key of await this.list()) {
      output.push({ key, value: await this.get(key) })
    }

    return output;
  }
}

module.exports = Client;