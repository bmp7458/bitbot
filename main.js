const express = require('express')
const app = express()
const port = 8080

app.get('/', (req, res) => {
  res.send('server started')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


var prefix = "b"
var sus = false
// sustain
var cursor = true
// cursor
var midipath = "./midi/"

var MidiPlayer = require('midi-player-js')
const { DownloaderHelper } = require('node-downloader-helper');
var midis = []
var fs = require('fs')
var Bot = require('anony-mpp-bot-js')
var files = fs.readdirSync(midipath)
var filesort = 0
for (var i = 0; i < files.length; i++) {
if (files[filesort].endsWith('.mid') === true) {
midis.push(files[filesort])
}
filesort += 1
}

const bot = new Bot({
    token: "",
    color: "#e8392c",
    room: "bot/testing",
name: "bitbot [bhelp]"
})

var length = 0
var start = 0


bot.connect()
multichat = msg => { msg.match(/.{0,1021}/g).forEach(function(x, i) { if (x == "") return; if (i !== 0) x = "..." + x; bot.chat(x) }); };
bot.client.on('a', msg => {
var cmd = msg.a.split(' ')[0].toLowerCase()
  var args = msg.a.split(" ");
      args = args.slice(1);
if (cmd === `${prefix}help` | cmd === `${prefix}h`) {
multichat(`Commands: ${prefix}help (${prefix}h), ${prefix}play (${prefix}p), ${prefix}list (${prefix}l), ${prefix}download (${prefix}d), ${prefix}stop (${prefix}s), ${prefix}about (${prefix}ab), ${prefix}sustain (${prefix}sus), ${prefix}cursor (${prefix}c)`)
}
if (cmd === `${prefix}play` | cmd === `${prefix}p`) {
if (args.length == 0) {bot.chat(`Usage: ${prefix}play (ID or name)`)} else {
if (isNaN(Number(msg.a.split(' ')[1])) === true) {

if (midis.indexOf(msg.a.split(' ').splice(1).join(' ')) == -1) {
foundmidi = midis.find(m => m.toLowerCase().includes(msg.a.split(' ').splice(1).join(' ').toLowerCase()))
if (foundmidi === undefined) {
bot.chat("There is no MIDI including that text.")
} else {
playmidi(midipath + foundmidi)
bot.chat(`Now playing ${foundmidi}`)
}
} else {
playmidi(midipath + msg.a.split(' ')[1])
bot.chat("Now playing " + msg.a.split(' ').splice(1).join(' '))
}
} else {
if (midis[Number(msg.a.split(' ')[1])] === undefined) {
bot.chat("There is no MIDI of that ID.")
} else {
playmidi(midipath + midis[Number(msg.a.split(' ')[1])])
bot.chat("Now playing " + midis[Number(msg.a.split(' ')[1])])
}
}
}
}
if (cmd === `${prefix}list` | cmd === `${prefix}l`) {
var foundmidi = []
var part = 0
if (args.length > 0) {
if (isNaN(Number(msg.a.split(' ')[1])) === false) {
part = Number(msg.a.split(' ')[1])
}
}
for (var i = 0; i < 5; i++) {

if (midis[part] === undefined) {
foundmidi.push("End.")
break;
} else {
foundmidi.push(`${part} - ${midis[part]}`)
}
part += 1
}
bot.chat(foundmidi.join(" | "))
}
if (cmd === `${prefix}download` | cmd === `${prefix}d`) {
if (args.length == 0) {bot.chat(`Usage: ${prefix}download (file)`)} else {
var file = msg.a.split(' ')[1];
// Path at which image will be downloaded
var filePath = midipath; 
  if (file.includes(".mid") === true) {
var dl = new DownloaderHelper(file , filePath);
  
dl.on('end', d => {
bot.chat(`Download finished; attempting to play...`)
playmidi(d.filePath)
})
bot.chat("Starting download.")
dl.start();
} else {
bot.chat("Please input an actual MIDI.")
}
}
}
if (cmd === `${prefix}stop` | cmd === `${prefix}s`) {
bot.chat("Stopped playing, or not.");
Midi.stop();
}
if (cmd === `${prefix}about` | cmd === `${prefix}ab`) bot.chat(`Bot base made by Someone8448#6969 commands coming soon; bmp7458, Songs: ${midis.length}, OS: ${process.platform}`)
if (cmd === `${prefix}sus` | cmd === `${prefix}sustain`) {
sus = !sus
bot.chat(`Sustain set to ${sus}`)
}
if (cmd === `${prefix}c` | cmd === `${prefix}cursor`) {
cursor = !cursor
bot.chat(`Cursor Movement set to ${cursor}`)
}
})


   const midikeys = ["a-1", "as-1", "b-1", "c0", "cs0", "d0", "ds0", "e0", "f0", "fs0", "g0", "gs0", "a0", "as0", "b0", "c1", "cs1", "d1", "ds1", "e1", "f1", "fs1", "g1", "gs1", "a1", "as1", "b1", "c2", "cs2", "d2", "ds2", "e2", "f2", "fs2", "g2", "gs2", "a2", "as2", "b2", "c3", "cs3", "d3", "ds3", "e3", "f3", "fs3", "g3", "gs3", "a3", "as3", "b3", "c4", "cs4", "d4", "ds4", "e4", "f4", "fs4", "g4", "gs4", "a4", "as4", "b4", "c5", "cs5", "d5", "ds5", "e5", "f5", "fs5", "g5", "gs5", "a5", "as5", "b5", "c6", "cs6", "d6", "ds6", "e6", "f6", "fs6", "g6", "gs6", "a6", "as6", "b6", "c7"];
    const Midi = new MidiPlayer.Player(function (event) {
        setTimeout(Midi.playLoop.bind(Midi), 0);
//if (Math.floor(Math.random() * 5) == 4) {
//tick = event.tick
//}
        let midikey = midikeys[event.noteNumber - 21];
        let midivel = event.velocity / 120;
        if (!!!event.name.startsWith("Note")) return;

        if (event.name == "Note on") {
if (midikey !== undefined) { 
bot.client.startNote(midikey, midivel)           
}
        } else {
if (sus === false && midikey !== undefined) {
bot.client.stopNote(midikey)
}
}
    })

var playmidi = function(file) {
Midi.stop();
Midi.loadFile(file);
start = Date.now()
length = Midi.totalTicks
Midi.play();
}
setInterval(() => {
midis = []
files = fs.readdirSync(midipath)
filesort = 0
for (var i = 0; i < files.length; i++) {
if (files[filesort].endsWith('.mid') === true) {
midis.push(files[filesort])
}
filesort += 1
}
}, 20000)
//process.on('uncaughtException', function (exception) {
//console.log(exception)
//}) 
setTimeout(() => {
setInterval(() => {
if (cursor === true) {
if (Midi.isPlaying() === true) {
//console.log( (((Midi.tick) / length) * 100) + "% Progress..")
bot.client.moveMouse((( (Midi.tick) / length ) * 80) + 10 ,50)
} else bot.client.moveMouse(100,100)
//bot.dropCrown()
}
//if (bot.room !== bot.client.channel.id) bot.client.setChannel(bot.room)
},200)
}, 10000)
//bot.client.moveMouse(((event.tick / start) * 80) + 10 ,50)
