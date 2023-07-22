const fetch = require('node-fetch');

var URL = ''
fetch(URL, {
    'method': 'GET'
})
.then(async res=> console.log(await res.status))
.catch(err => console.error(err));