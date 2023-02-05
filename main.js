const Bot = require('anony-mpp-client');
const prefix = 'b'
const commands = ["help", "about", "ping", "whoami", "myrole", "eval", "echo", "quote"]
const roles = ["Bot Owner", "Administator", "Beta Bot Tester"]
const http = require('http')
const fs = require('fs')
const indivroles = require('./roles.json')
const axios = require("axios");

function run(code) {
  if (new String(code) == "[object Object]" == false && new String(code) == "[object JSON]" == false) {
    try {
      return '► ' + eval(code);
    } catch (error) {
      return '► ❌ ' + error + ''
    }
  } if (new String(code) == "[object Object]" || new String(code) == "[object JSON]") {
    try { return '► ' + JSON.stringify(eval(code)); } catch (error) {
      return '► ❌ ' + error + ' '
    }
  }
}

function getQuote() {
  return fetch("https://zenquotes.io/api/random")
    .then(res => {
      return res.json()
    })
    .then(data => {
      return data[0]["q"] + " -" + data[0]["a"]
    })
}


http.createServer(function(req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('bitbot http server');
}).listen(4040)


const bitbot = new Bot({
  token: process.env.TOKEN,
  color: "#be06cf",
  channel: "✧𝓓𝓔𝓥 𝓡𝓸𝓸𝓶✧",
  name: `bitbot 「${prefix}help」`,
  onlineMessage: `Connected; Online`,
  logOnConnect: `Connected, test`,
  avoidServerCrash: true
}, 'wss://mppclone.com:8443').login(process.env.TOKEN)

function checkrole(id, role) {
  if (msg.p._id === id) {
    bitbot.chat(msg.p.name + ', you have the role: ' + roles[0])
  } else {
    bitbot.chat(msg.p.name + ', You do not appear to have any roles!')
  }
}

bitbot.client.on('a', msg => {
  cmd = msg.a.split(' ')[0].toLowerCase()
  if (cmd === `${prefix}help`) {
    bitbot.chat(`Commands: (${commands.length}) - ${prefix}` + commands.join(`, ${prefix}`))
  }

  if (cmd === `${prefix}about`) {
    bitbot.chat('**bitbot** is a multipurpose bot made to assist users in a regular fashion. **bitbot** created by ๖ۣۜb͜m͡p7458.')
  }

  if (cmd === `${prefix}ping`) {
    ping = Number(Date.now()) - Number(msg.t)
    bitbot.chat("Latency is " + ping + "ms.")
  }

  if (cmd === `${prefix}quote`) {
    bitbot.chat(getQuote().then(quote => bitbot.chat(quote)))
  }

  if (cmd === `${prefix}echo`) {
    bitbot.chat(msg.a.split(" ").splice(1).join(" "))
  }
  /*
    if (cmd === `${prefix}eval`) { //
      bitbot.chat(run(msg.a.substr(cmd.length).trim()))
     //i wanna fix some of your eval code
    }
    */

  if (cmd === `${prefix}eval`) {
    if (msg.p._id !== "cedd04479c7028963568f1c0") { bitbot.chat("No permissions!"); return; } else {
      bitbot.chat(run(msg.a.substr(cmd.length).trim()))
    }

    if (cmd === `${prefix}whoami`) {
      bitbot.chat(msg.p.name + " | ID: " + msg.p._id + ' | Color: ' + msg.p.color)
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
  }
});
