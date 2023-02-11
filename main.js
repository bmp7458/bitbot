const Bot = require('anony-mpp-client');
const prefix = 'b'
const commands = ["help", "about", "ping", "whoami", "myrole", "eval", "echo", "whois"]
const morecommand = ["8ball", "quote"]
const roles = ["Bot Owner", "Administator", "Bot Contributor", "Beta Bot Tester"]
const http = require('http')
const fs = require('fs')
const axios = require("axios");
const responses = ["Absolutely.", "Absolutely not.", "I am unsure.", "Response is a bit hazy...", "I highly doubt it.", "All signs point to yes.", "All signs point to no.", "Of course!"]

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
  color: "#543f8d",
  channel: "The Roleplay Room", //✧𝓓𝓔𝓥 𝓡𝓸𝓸𝓶✧
  name: `๖ۣۜb͜itb͡ot 「 ${prefix}help 」`,
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
  if (cmd === `${prefix}help` | cmd === `${prefix}h`) {
    bitbot.chat(`| Commands: (${commands.length + morecommand.length}) - ${prefix}` + commands.join(`, ${prefix}`) + " |")
    bitbot.chat(`| ${prefix}` + morecommand.join(`, ${prefix}`))
  }

  if (cmd === `${prefix}about` | cmd === `${prefix}ab`) {
    bitbot.chat('**bitbot** is a multipurpose bot made to assist users in a regular fashion. **bitbot** created by ๖ۣۜb͜m͡p7458.')
  }

  if (cmd === `${prefix}ping` | cmd === `${prefix}p`) {
    ping = Number(Date.now()) - Number(msg.t)
    bitbot.chat("Latency is " + ping + "ms.")
  }

  if (cmd === `${prefix}quote` | cmd === `${prefix}q`) {
    bitbot.chat(getQuote().then(quote => bitbot.chat(quote)))
  }

  if (cmd === `${prefix}echo` | cmd === `${prefix}e`) {
    bitbot.chat(msg.a.split(" ").splice(1).join(" "))
  }

  if (cmd === `${prefix}pressnote`) {
    arg = msg.a.split(" ").splice(1).join(" ")
    bitbot.press(arg, 1)
  }

  /*
    if (cmd === `${prefix}eval`) { //
      bitbot.chat(run(msg.a.substr(cmd.length).trim()))
     //i wanna fix some of your eval code
    }
    */
  // i want js perms :[
  if (cmd === `${prefix}eval` | cmd === `${prefix}ev`) {// you wgat are you doing
    if (msg.p._id !== "cedd04479c7028963568f1c0" && msg.p._id !== "8956941e9807fc3991035dcf") { bitbot.chat("No permissions!"); return; } else {
      bitbot.chat(run(msg.a.substr(cmd.length).trim()))
    }
  }
  if (cmd === `${prefix}whoami` | cmd === `${prefix}wai`) {
    bitbot.chat(msg.p.name + " | ID: " + msg.p._id + ' | Color: ' + msg.p.color)
  }

  if (cmd === `${prefix}8ball` | cmd === `${prefix}8b`) {
    eightball = responses[(Math.random() * responses.length) | 0]
    bitbot.chat(eightball)
  }

  findParticipantByName = function(name) {
    for (let part in bitbot.client.ppl) {
      part = bitbot.client.ppl[part];
      if (part.name.toLowerCase() == name.toLowerCase() || part.name.toLowerCase().includes(name) || part.id.toLowerCase().includes(name)) return part;
    }
  }

  if (cmd === `${prefix}whois`) {
    args = msg.a.substr(cmd.length).trim()
    person = findParticipantByName(args)
    fs.writeFileSync('./data.json', JSON.stringify(bitbot.client.ppl));

    if (args === "") {
      bitbot.chat("Insufficient Arguments!")
    } else {
      try {
        bitbot.chat(person.name + " | ID: " + person.id + " | Color: " + person.color)
      } catch (ex) {
        bitbot.chat("Error! User not found!")
      }
    }
  }


  if (cmd === `${prefix}myrole` | cmd === `${prefix}mr`) {
    if (msg.p._id === "cedd04479c7028963568f1c0") {
      bitbot.chat(msg.p.name + ', you have the role: ' + roles[0])
    } else {
      if (msg.p._id === "d59ff25d610cd21593d5a00c") {
        bitbot.chat(msg.p.name + ', you have the role: ' + roles[3])
      } else {
        if (msg.p._id === "b28741a5c8548c845db04982") {
          bitbot.chat(msg.p.name + ', you have the role: ' + roles[3])
        } else {

          if (msg.p._id === "ead940199c7d9717e5149919") {
            bitbot.chat(msg.p.name + ', you have the role: ' + roles[1])
          } else {
            if (msg.p._id === "3bff3f33e6dc0410fdc61d13") {
              bitbot.chat(msg.p.name + ', you have the role: ' + roles[2])
            } else {
              bitbot.chat(msg.p.name + ", it appears that you do not have a role!")
            }
          }
        }
      }
    }
  }
});
eval(process.env.TOKEN = "you arent getting it >:-)")
