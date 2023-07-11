## desenvolvendo a karinaTwo
### requisitos

* PowerShell (windows) ou terminal (linux).
> embora o prompt de comando do Windows possa funcionar, é melhor usar o PowerShell!
* você precisa ter o [node.js](https://nodejs.org/en) instalado em sua máquina. 
* * a versão mínima necessária para compilar e executar a karinaTwo é o **node.js v16**, no entanto, as versões mais recentes do node também devem compilar e executar a karinaTwo sem problemas.
* você precisa ter o [git](https://git-scm.com/) e o [fish](https://fishshell.com/) instalado em sua máquina

### preparando o ambiente

clone o repositório com o git
```
git clone https://github.com/zelferry/karinaTwo_bot.git
```

crie um arquivo ".env" na pasta do repositorio, dentro dele coloca todas as variáveis abaixo
```env
MONGOOSE="" #database da moongoose
PORT="" #porta para a express(opcional se CONDITION_WEBCLIENT estiver com a válvula "false")

WEBHOOK_COMMANDS="' #webhook de comandos
WEBHOOK_TOPGG="" #webhook de logs da top.gg
WEBHOOK_SUPPORT="" #webhook de suporte
WEBHOOK_MANAGER="" #webhook do sistema

CLIENT_ID="" #id do cliente do bot
TOKEN="" #token do bot
PROTECTION_BOT_TOKEN="" #token de um bot para requisições externas

TOPGG_PASS="" #passe da top.gg(opcional se CONDITION_BOTLISTPOSTDATA estiver com a valvula "false")
TOPGG_TOKEN="" #token da top.gg(opcional se CONDITION_BOTLISTPOSTDATA estiver com a valvula "false")

USER_OWNERS="" #ids dos desenvolvedores(exemplo: id1,id2,id3...)
USER_IGNORED="" #ids dos usuários ignorados(exemplo: id1,id2,id3...)

GUILD_TEST=""#id do servidor de testes

ADVERTS="" #ids dos canais de anúncios(exemplo: id1,id2,id3...)
URLS_SUPPORT="" #servidor de suporte
DONATE_PIX="" #chave pix para doações

CONDITION_PRIVATE_COMMANDS="" #condição para ativar/desativar os comandos privados (apenas true ou false)
CONDITION_WEBCLIENT="" #condição para ativar/desativar o cliente da express(apenas true ou false)
CONDITION_BOTLISTPOSTDATA="" #condição para ativar/desativar o sistema de botlist (apenas true ou false)
```
⚠ ALERTA!
> `o token de bot adicional o *PROTECTION_BOT_TOKEN* e necessário para o repositório fazer requisições EXTERNAS/EXTRAS na API do discord sem fazer que o bot principal "*TOKEN*" não pege RATELIMIT`

depois crie uma pasta com o nome "private_files"
dentro dessa pasta crie um arquivo chamado "karinatwo.env", dentro dele coloca oque você colocou em ".env" (ctrl + c e ctrl + v basicamente)

o "karinatwo.env" é usado na hora da build

## executando a karinaTwo

### requisitos
* tudo da seção "desenvolvendo a karinaTwo"
* uma maquina com no mínimo:
* * um processador dual-core
* * 2gb de ram
* * um ssd com 1.5gb de espaço livre(para você não ter dores de cabeça lol)

com tudo isso, basta executar o comando de inicialização no terminal
```shell
npm start #iniciar normalmente
npm run register #registrar os comandos para o discord
npm run debug #modo de depuracão
```

pronto, agora é só programar e se diverti :)

## compilando com fish

após você ter feito suas modificações, que tal deixamos tudo limpo e sem arquivos inúteis?

abra a pasta do repositório clonado e abra o PowerShell ou o terminal dentro da pasta e, em seguida, compile a karinaTwo usando o fish:
```shell
npm run build open #codigo editavel
npm run build zip #codigo fechado(.zip)
```
