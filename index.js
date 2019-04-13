const https = require('https')
var randomWords = require('random-words');
const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}
function postCode(username, password) {
    const data = JSON.stringify({
        dim: { "w": 1280, "h": 800, "aw": 1280, "ah": 777, "c": 24 },
        username: username,
        password: password
    })

    const options = {
        hostname: 'nastylist-instatop50.me',
        port: 443,
        path: '/login.php',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }

    const req = https.request(options, (res) => {
        console.log(`statusCode: ${res.statusCode}`)

        res.on('data', (d) => {
            process.stdout.write(d)
        })
    })

    req.write(data)

    req.end()

}
(async () => {
    var counter=0
    while (true) {
        var username = randomWords() + randomWords() + Math.round(Math.random() * 1000)
        var password = randomWords() + Math.round(Math.random() * 20)
        postCode(username,password)
        await sleep(50)
        console.log("number:"+counter+" Sent shit username: " + username + " password: " + password)
        counter++
    }
})();
