let Discord = require('discord.js');
let { EventEmitter } = require('events');

let axios = require('axios')
let tf = require('@tensorflow/tfjs-node')
let nsfw = require('nsfwjs')

class antiNsfw extends EventEmitter{
    construtor(options, cache){
        this.options = {
            ignoredMembers: options.ignoredMembers || [],
            ignoredPermissions: options.ignoredPermissions || []
        }
        
        this.cache = {
            messages: [],
            warnedUsers: [],
            kickedUsers: [],
            bannedUsers: []
        }
    }
    format(string, message){
        const content = string.replace(/{@user}/g, message.author.toString()).replace(/{user_tag}/g, message.author.tag).replace(/{server_name}/g, message.guild.name);
        return { content }
    }
    async banUser(message, member){
        this.cache.bannedUsers.push(message.author.id);
        if(!member.bannable){
            message.channel.send(this.format("🚫**|** não e possível banir o `{user_tag}` por falta de permissões", message));
            return false
        } else {
            await message.member.ban().catch(e => {
                console.log(e)
            });
            message.channel.send(this.format("😡**|** o usuário **{user_tag}** foi banido com sucesso por mandar nsfw/gore", message))
            return true
        }
    }
    async muteUser(message, member){
        let userCanBeMuted = message.guild.me.permissions.has('MODERATE_MEMBERS') && (message.guild.me.roles.highest.position > message.member.roles.highest.position && message.member.id !== message.guild.ownerId);
        
        if(!userCanBeMuted){
            message.channel.send(this.format("🚫**|** não foi possível multar o usuário **{user_tag}** por falta da permissão **membros de castigo** e/ou **administrador**", message))
            return false
        }
        await message.member.timeout(3600000);
        message.channel.send(this.format("😤**|** o usuário **{user_tag}** foi multado com sucesso por mandar nsfw/gore", message))
        return true
    }
    async kickUser(message, member){
        this.cache.kickedUsers.push(message.author.id);
        if(!member.kickable){
            message.channel.send(this.format("🚫**|** não foi possível expulsar o usuário **{user_tag}** por falta de permissões", message))
            return false
        } else {
            await message.member.kick()
            message.channel.send(this.format("😤**|** o usuário **{user_tag}** foi expulso com sucesso por mandar nsfw/gore", message));
            return true
        }
    }
    async warnUser(message, member){
        this.cache.warnedUsers.push(message.author.id);
        message.channel.send({
            embeds: [new Discord.MessageEmbed().setTitle("sem nsfw").setDescription(`<@${message.author.id}> não poste nsfw fora dos canais nsfw\n\ne nem gore em nenhum dos canais`).setColor("DARK_RED")]
        });
        return true
    }
    async getData(url){
        let r = false;
        
        let pic = await axios.get(url, { responseType: 'arraybuffer' });
        
        let model = await nsfw.load();
        let image = await tf.node.decodeImage(pic.data, 3);
        let predictions = await model.classify(image);
        
        image.dispose();
        predictions.map((pr) => {
            pr.probability = Math.round(pr.probability * 100);

            if(pr.className == "Hentai" && pr.probability > 35) r = true
            if(pr.className == "Porn" && pr.probability > 35) r = true
            if(pr.className == "Sexy" && pr.probability > 35) r = true
        })
        return r
    }
    async message(message){
        let options = this.options;

        if (!message.guild || message.author.id === message.client.user.id || (message.guild.ownerId === message.author.id)){
            return false
        }
        let isMemberIgnored = typeof options.ignoredMembers === 'function' ? options.ignoredMembers(message.member) : options.ignoredMembers.includes(message.author.id);
        let member = message.member || await message.guild.members.fetch(message.author);
        
        if(isMemberIgnored) return false
        if(options.ignoredPermissions.some((permission) => member.permissions.has(permission))) return false
        
        let currentMessage = {
            authorID: message.author.id,
            guildID: message.guild.id,
            channelID: message.channel.id,
            counts: 0,
            sentTimestamp: message.createdTimestamp
        }
        this.cache.messages.push(currentMessage);

        let cachedMessages = this.cache.messages.filter((m) => m.authorID === message.author.id && m.guildID === message.guild.id);

        let sanctioned = false
        
        let userCanBeMuted = !sanctioned
    }
}