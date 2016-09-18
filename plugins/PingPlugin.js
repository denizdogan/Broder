import Actions from '../actions'

const WAIT_TIME = 5000

class PingPlugin {

  constructor() {
    this.timeouts = {}

    this.bindListeners({
      onCommand: Actions.onCommand
    })
  }

  onCommand(command) {
    if (command.command !== 'ping') {
      return
    }

    // check if the username is on a timeout
    let username = command.message.author.username
    if (username in this.timeouts) {
      return
    }

    this.timeouts[username] = true
    command.message.channel.sendMessage('pong!')
    setTimeout(() => {
      delete this.timeouts[username]
    }, WAIT_TIME)
  }
}

import alt from '../alt'
export default alt.createStore(PingPlugin)
