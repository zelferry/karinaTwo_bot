const giveawayModel = require('../../../mongoDB/models/giveaway.js')

const { GiveawaysManager } = require('discord-giveaways');

class GiveawayManagerWithOwnDatabase extends GiveawaysManager {
    async getAllGiveaways() {
        return await giveawayModel.find().lean().exec();
    }
    async saveGiveaway(messageId, giveawayData) {
        await giveawayModel.create(giveawayData);
        return true;
    }
    async editGiveaway(messageId, giveawayData) {
        await giveawayModel.updateOne({ messageId }, giveawayData, { omitUndefined: true }).exec();
        return true;
    }
    async deleteGiveaway(messageId) {
        await giveawayModel.deleteOne({ messageId }).exec();
        return true;
    }
    async refreshStorage() {
        return this.client.cluster.broadcastEval(() => this.giveawaysManager.getAllGiveaways());
    }
};

module.exports = GiveawayManagerWithOwnDatabase