const { Client } = require('discord.js-selfbot-v13')
const client = new Client()

var snipeChannel = null
// configure things here...
var channelId = ''
var time = {
    year: 2025,
    month: 1,
    day: 1
}
var msg = 'Happy New Year!'
var interval = 100

client.on('ready', async () => {
    client.user.setAFK(true)
    console.log(`${client.user.username} is ready!`)
    snipeChannel = client.channels.cache.get(channelId)  
    console.log(`Snipe channel: #${snipeChannel.name} (${snipeChannel.id})`)

    const checkDate = setInterval(async () => {
        const now = new Date();
        const timeNowFMT = `${now.toLocaleString('en-GB', { "hour12": false })}.${now.getMilliseconds()}`
        if (now.getFullYear() == time.year && now.getMonth() == time.month && now.getDate() == time.day) {
            await snipeChannel.send(msg)
            console.log(`-> [${timeNowFMT}] Sent message!`)
            process.exit(0)
            clearInterval(checkDate)
        }
        else {
            console.log(`-> [${timeNowFMT}] Not yet, waiting...`)
        }
    }, interval)
})

// export your Discord token as TOKEN env to run
client.login(process.env.TOKEN)