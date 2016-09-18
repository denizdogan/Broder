// babel-node index.js

// configuration
import config from './config.json'

// discord
import Discord from 'discord.js'

// alt/flux
import alt from './alt'
import Actions from './actions'
import PingPlugin from './plugins/PingPlugin'

// configure discord client
const client = new Discord.Client()

// on ready
client.on('ready', () => {
  console.log('I am ready!')
})

// set up listeners
client.on('message', (message) => {

  // tell everyone we got a message
  Actions.onMessage(message)

  // check if it's a command
  let COMMAND_REGEXP = /^!(\S+)\s*(.*)/
  let m = message.content.match(COMMAND_REGEXP)
  if (m) {
    // message.content === '!foobar hello there'
    let command = m[1] // === 'foobar'
    let rest = m[2] // === 'hello there'
    Actions.onCommand(message, command, rest)
  }
})

// log in to discord
client.login(config.token)

// log every action that passes through the dispatcher
alt.dispatcher.register(console.log.bind(console))
