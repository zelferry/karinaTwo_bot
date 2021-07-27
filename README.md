<p align="center">
<img width="65%" src="https://cdn.discordapp.com/attachments/853133669581193216/869368588543348766/84_Sem_Titulo_20210618214446.png">
<br>


<h1 align="center">✴ karinaTwo ✴</h1>

<p align="center">
<a href="https://top.gg/bot/793530706319114261">
  <img src="https://top.gg/api/widget/793530706319114261.svg" alt="KarinaTwo" />
  </a>
</p>

<p align="center">
<a href="https://top.gg/bot/793530706319114261">
  <img src="https://top.gg/api/widget/status/793530706319114261.svg" alt="KarinaTwo" />
  </a>
<a href="https://top.gg/bot/793530706319114261">
  <img src="https://top.gg/api/widget/servers/793530706319114261.svg" alt="KarinaTwo" />
  </a>
<a href="https://top.gg/bot/793530706319114261">
  <img src="https://top.gg/api/widget/owner/793530706319114261.svg" alt="KarinaTwo" />
  </a>
</p>


<p align="center">
<a href="https://top.gg/bot/793530706319114261">
  <img src="https://img.shields.io/badge/website-karinaTwo.zelferry.repl.co-9cf
" alt="website" />
  </a>
<img alt="GitHub code size in bytes" src="https://img.shields.io/github/languages/code-size/zelferry/karinaTwo_bot">
<img alt="GitHub repo file count" src="https://img.shields.io/github/directory-file-count/zelferry/karinaTwo_bot">
<img alt="GitHub repo size" src="https://img.shields.io/github/repo-size/zelferry/karinaTwo_bot">
</p>


## 💜 introdução

😊| Finalmente depois de muito tempo, eu finalmente mostrei a Source da **karina**!
E eu estou muito feliz de retirar esse fardo das minhas costas, pelo medo de mostrar o código fonte dela, mais hoje é o dia! A **karina** foi a minha bot que mais me deu trabalho, e **hoje** estarei mostrando tudo que já desenvolvi nela, como comandos e funções!

🕛| atualmente focando a maioria do meu tempo nela, contando com mais de **67** comandos dentre eles comandos de **diversão**,**administração**,**nsfw**, **micelanea** dentre outros!

😉| Espero que todos respeitem esse repositório, e não usem para ganhar fama em sua aplicação(`bot`), use apenas para aprender as funções que a **karinaTwo** Possui!
Não quero saber de usuários que estão usando essa Source para criar outros bots e ganhando dinheiro com isso!(`se não serão banidos de usar a karinaTwo!`)

## 🔋 estrutura

 💻| karinaTwo foi feita usando a linguagem **JavaScript** e tendo como livraria de conecção com a **API** do **Discord**  a **Discord.js**, para o Banco de Dados, eu usei a **lowdb** e a **megaDB** (`em breve o banco de dados pode mudar, como por exemplo moongoose ser a nova banca de dados no futuro!`)
 
#### 💾 **- arquivo** `config.json`
(na pasta **database/client**)

```json
{
  "client":{}, //opções do CLIENT(opcional)
  
  //opcional
  "shard":{
  	"totalShards":"auto",
    "token": "{!token}"
  },
  "functions":{
  	"ignoredUsers":[] //usuários ignorados
  },
  "host":{
  	"links":[] //lind da host do seu bot
  },
  "adverts":{
  	"auto":true,
  	"guilds":[] //servidores que vão ser a função de auto post de anúncios
  },
  "footer":{
  	"root":"" //sua root global(exemplos: ../../ , home/runner/bot , C:/myname/bots/bot
  },
  "webhooks":{ 
 "commands":{
 	"id":"", //id do WEBHOOK que avisa se alguém usou um comando
 	"token":"" //token do WEBHOOK que avisa se alguém usou um comando
 },
 "topgg":{
 	"id":"", //id do WEBHOOK da top.gg
 	"token":"" //token do WEBHOOK da top.gg
 },
 "suport":{
 	"id":"", //id do WEBHOOK do comando de suporte
 	"token":"" //token do WEBHOOK do comando de suporte
 },
 "exit_":{
 	"id":"", //id do WEBHOOK que avisa se o bot saiu de um servido
 	"token":"" //token do WEBHOOK que avisa se o bot saiu de um servidor
   }
  }
}
```

#### 📄 **- arquivo** `.env`

```
TOKEN="" # token do bot
PROTECTION_BOT_TOKEN="" # TOKEN de um bot para fazer requisições EXTERNAS/EXTRAS na api do discord

LINK_ADD="" # link para adicionar o bot
BOT_ID="" # id do bot

PORT="" # PORT para o express

TOP_GG_API="" # token do bot na top.gg
topggpas="" # seu passe para a top.gg
```
⚠ALERTA!
`o toke de bot adicional o *PROTECTION_BOT_TOKEN* e necessário para o repositório fazer requisições EXTERNAS/EXTRAS na API do discord sem fazer que o bot principal "*TOKEN*" não pege RATELIMIT`

#### :electric_plug: **- Script de Inicialização**
```npm
npm start
```
ou...
```node
node shard.js
```

## 🔗 links

> - [:bird: Twitter do zelferry](https://twitter.com/zelferry?s=09)
> - [🐱 server de suporte da karina](https://discord.gg/Xmu7HrH3yy)
> - [🔗 linktree do zelferry(preguiça de colocar todos os meus links kk)](https://linktr.ee/zelferry)

# Menções Incriveis:

## criador(es) da karinaTwo:

| [<img src="https://pbs.twimg.com/profile_images/1381692504614051845/8-Q91QGT_400x400.jpg" width=115><br><sub>@zelferry bunny</sub>](https://linktr.ee/zelferry) |
| :---: |  

## desenhista do avatar da karinaTwo

| [<img src="https://pbs.twimg.com/profile_images/1403780860483190790/2z93DHEk_400x400.jpg" width=115><br><sub>@M&M</sub>](https://twitter.com/Miguel94244829) |
| :---: |  