const Bot = require('anony-mpp-client');
const prefix = 'b'
const commands = ["help", "ping", "whoami", "myrole"]
const roles = ["Bot Owner", "Administator", "Beta Bot Tester"]

const bitbot = new Bot({
  token: process.env.TOKEN,
  color: "#be06cf",
  channel: "test/bitbot",
  name: `bitbot 「${prefix}help」`,
  onlineMessage: `Connected; Online`,
  logOnConnect: `Connected, test`,
  avoidServerCrash: true
}, 'wss://mppclone.com:8443').login(process.env.TOKEN)

/*
function checkrole(id, role) {
  if (msg.p._id === id) {
      bitbot.chat(msg.p.name + ', you have the role: ' + roles[0])
    } else {
      bitbot.chat(msg.p.name + ', You do not appear to have any roles!')
  }
}
*/

bitbot.client.on('a', msg => {
  cmd = msg.a.split(' ')[0].toLowerCase()
  if (cmd === `${prefix}help`) {
    bitbot.chat(`Commands: (${commands.length}) - ${prefix}` + commands.join(`, ${prefix}`))
  }
  
  if (cmd === `${prefix}ping`) {
    ping = Number(Date.now()) - Number(msg.t)
    bitbot.chat("Latency is " + ping + "ms.")
  }
  
  if (cmd === `${prefix}whoami`) {
    bitbot.chat(msg.p.name + " | ID: " + msg.p._id + ' | Color: '+ msg.p.color )
  }
  if (cmd === `${prefix}myrole`) {
    if (msg.p._id === "cedd04479c7028963568f1c0") {
      bitbot.chat(msg.p.name + ', you have the role: ' + roles[0])
    } else {
      if (msg.p._id === "d59ff25d610cd21593d5a00c") {
        bitbot.chat(msg.p.name + ', you have the role: ' + roles[2])
      } else {
        if (msg.p._id === "b28741a5c8548c845db04982") {
          bitbot.chat(msg.p.name + ', you have the role: ' + roles[2])
        } else {
          bitbot.chat(msg.p.name + ', You do not appear to have any roles!')
        }
      }
    }
    
    
  }
});
