let express = require('express');
let colors = require("colors");
let fetch = require('node-fetch');
let app = express();

app.use("/api", require("./routers/api.js"));

app.get('/', (req, res) => {
    res.status(200);
    res.send("o site foi movido para <code>https://karinatwo.repl.co</code>")
});

app.get('/ping_1', (req, res) => {
    res.sendStatus(200);
    console.log(`[${colors.green(`${new Date().toString().split(' ', 5).join(' ')}`)}] ping recebido!`);
});

app.post("/ping_2", (req, res) => res.sendStatus(200));
app.get("/ping_2", (req, res) => {
    //console.log("7");
    res.sendStatus(200)
});

app.get('/teapot', (req, res) => { res.sendStatus(418) });

/*function sendping(){
    for(var i = 0; i < urls.length; i++){
        fetch(urls[i], { method: 'GET', headers: { 'User-Agent': 'crosdid/1.0' } })
    }
}
sendping();*/

module.exports = () => {
    function normalizaPort(val) {
        let port = parseInt(val, 10);
        
        if (isNaN(port)) {
            return val;
        }
        if (port >= 0) {
            return port;
        }
        
        return false;
    }
    app.listen(normalizaPort(process.env.PORT || 3000), () => {
        console.log(colors.green(`[SERVER] - servidor iniciado com sucesso na Porta ${normalizaPort(process.env.PORT || 3000)};`));
    });
    //setInterval(sendping, 180000);
}