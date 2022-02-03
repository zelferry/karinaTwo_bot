
module.exports = {
    Member: (command, interaction) => {
        let permissions = [];

        if (command.MemberPerm.includes('ADMINISTRATOR')) permissions.push(`\`Administrador\``);
        if (command.MemberPerm.includes('VIEW_AUDIT_LOG')) permissions.push(`\`Ver o registro de auditoria\``);
        if (command.MemberPerm.includes('MANAGE_GUILD')) permissions.push(`\`Gerenciar servidor\``);
        if (command.MemberPerm.includes('MANAGE_ROLES')) permissions.push(`\`Gerenciar cargos\``);
        if (command.MemberPerm.includes('MANAGE_CHANNELS')) permissions.push(`\`Gerenciar canais\``);
        if (command.MemberPerm.includes('KICK_MEMBERS')) permissions.push(`\`Expulsar membros\``);
        if (command.MemberPerm.includes('BAN_MEMBERS')) permissions.push(`\`Banir membros\``);
        if (command.MemberPerm.includes('CREATE_INSTANT_INVITE')) permissions.push(`\`Criar convite\``);
        if (command.MemberPerm.includes('CHANGE_NICKNAME')) permissions.push(`\`Alterar apelido\``);
        if (command.MemberPerm.includes('MANAGE_NICKNAMES')) permissions.push(`\`Gerenciar apelidos\``);
        if (command.MemberPerm.includes('MANAGE_EMOJIS')) permissions.push(`\`Gerenciar emojis\``);
        if (command.MemberPerm.includes('MANAGE_WEBHOOKS')) permissions.push(`\`Gerenciar webhooks\``);
        if (command.MemberPerm.includes('VIEW_CHANNEL')) permissions.push(`\`Ler canais de texto e ver canais de voz\``);
        if (command.MemberPerm.includes('SEND_MESSAGES')) permissions.push(`\`Enviar mensagens\``);
        if (command.MemberPerm.includes('SEND_TTS_MESSAGES')) permissions.push(`\`Enviar mensagens em TTS\``);
        if (command.MemberPerm.includes('MANAGE_MESSAGES')) permissions.push(`\`Gerenciar mensagens\``);
        if (command.MemberPerm.includes('EMBED_LINKS')) permissions.push(`\`Inserir links\``);
        if (command.MemberPerm.includes('ATTACH_FILES')) permissions.push(`\`Anexar arquivos\``);
        if (command.MemberPerm.includes('READ_MESSAGE_HISTORY')) permissions.push(`\`Ver histórico de mensagens\``);
        if (command.MemberPerm.includes('MENTION_EVERYONE')) permissions.push(`\`Mencionar @everyone, @here e todos os cargos\``);
        if (command.MemberPerm.includes('USE_EXTERNAL_EMOJIS')) permissions.push(`\`Usar emojis externos\``);
        if (command.MemberPerm.includes('ADD_REACTIONS')) permissions.push(`\`Adicionar reações\``);
        if (command.MemberPerm.includes('CONNECT')) permissions.push(`\`Conectar\``);
        if (command.MemberPerm.includes('SPEAK')) permissions.push(`\`Falar\``);
        if (command.MemberPerm.includes('STREAM')) permissions.push(`\`Vídeo\``);
        if (command.MemberPerm.includes('MUTE_MEMBERS')) permissions.push(`\`Silenciar membros\``);
        if (command.MemberPerm.includes('DEAFEN_MEMBERS')) permissions.push(`\`Ensurdecer membros\``);
        if (command.MemberPerm.includes('MOVE_MEMBERS')) permissions.push(`\`Mover membros\``);
        if (command.MemberPerm.includes('USE_VAD')) permissions.push(`\`Usar detecção de voz\``);
        if (command.MemberPerm.includes('PRIORITY_SPEAKER')) permissions.push(`\`Voz Prioritária\``);

        return interaction.followUp({
            content: `❌**|** você não pode executar esse comandos, pois você precisa das permissões de ${permissions.join(", ")}.`
        })
    },
    Client: (command, interaction) => {
        let permissions = [];

        if (command.ClientPerm.includes('ADMINISTRATOR')) permissions.push(`\`Administrador\``);
        if (command.ClientPerm.includes('VIEW_AUDIT_LOG')) permissions.push(`\`Ver o registro de auditoria\``);
        if (command.ClientPerm.includes('MANAGE_GUILD')) permissions.push(`\`Gerenciar servidor\``);
        if (command.ClientPerm.includes('MANAGE_ROLES')) permissions.push(`\`Gerenciar cargos\``);
        if (command.ClientPerm.includes('MANAGE_CHANNELS')) permissions.push(`\`Gerenciar canais\``);
        if (command.ClientPerm.includes('KICK_MEMBERS')) permissions.push(`\`Expulsar membros\``);
        if (command.ClientPerm.includes('BAN_MEMBERS')) permissions.push(`\`Banir membros\``);
        if (command.ClientPerm.includes('CREATE_INSTANT_INVITE')) permissions.push(`\`Criar convite\``);
        if (command.ClientPerm.includes('CHANGE_NICKNAME')) permissions.push(`\`Alterar apelido\``);
        if (command.ClientPerm.includes('MANAGE_NICKNAMES')) permissions.push(`\`Gerenciar apelidos\``);
        if (command.ClientPerm.includes('MANAGE_EMOJIS')) permissions.push(`\`Gerenciar emojis\``);
        if (command.ClientPerm.includes('MANAGE_WEBHOOKS')) permissions.push(`\`Gerenciar webhooks\``);
        if (command.ClientPerm.includes('VIEW_CHANNEL')) permissions.push(`\`Ler canais de texto e ver canais de voz\``);
        if (command.ClientPerm.includes('SEND_MESSAGES')) permissions.push(`\`Enviar mensagens\``);
        if (command.ClientPerm.includes('SEND_TTS_MESSAGES')) permissions.push(`\`Enviar mensagens em TTS\``);
        if (command.ClientPerm.includes('MANAGE_MESSAGES')) permissions.push(`\`Gerenciar mensagens\``);
        if (command.ClientPerm.includes('EMBED_LINKS')) permissions.push(`\`Inserir links\``);
        if (command.ClientPerm.includes('ATTACH_FILES')) permissions.push(`\`Anexar arquivos\``);
        if (command.ClientPerm.includes('READ_MESSAGE_HISTORY')) permissions.push(`\`Ver histórico de mensagens\``);
        if (command.ClientPerm.includes('MENTION_EVERYONE')) permissions.push(`\`Mencionar @everyone, @here e todos os cargos\``);
        if (command.ClientPerm.includes('USE_EXTERNAL_EMOJIS')) permissions.push(`\`Usar emojis externos\``);
        if (command.ClientPerm.includes('ADD_REACTIONS')) permissions.push(`\`Adicionar reações\``);
        if (command.ClientPerm.includes('CONNECT')) permissions.push(`\`Conectar\``);
        if (command.ClientPerm.includes('SPEAK')) permissions.push(`\`Falar\``);
        if (command.ClientPerm.includes('STREAM')) permissions.push(`\`Vídeo\``);
        if (command.ClientPerm.includes('MUTE_MEMBERS')) permissions.push(`\`Silenciar membros\``);
        if (command.ClientPerm.includes('DEAFEN_MEMBERS')) permissions.push(`\`Ensurdecer membros\``);
        if (command.ClientPerm.includes('MOVE_MEMBERS')) permissions.push(`\`Mover membros\``);
        if (command.ClientPerm.includes('USE_VAD')) permissions.push(`\`Usar detecção de voz\``);
        if (command.ClientPerm.includes('PRIORITY_SPEAKER')) permissions.push(`\`Voz Prioritária\``);

        return interaction.followUp({
            content: `❌**|** eu não posso executar esse comandos, pois eu preciso das permissões de ${permissions.join(", ")} nesse servidor.`
        })
    }
};