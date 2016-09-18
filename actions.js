class Actions {

  onMessage (message) {
    return message
  }

  onCommand (message, command, rest) {
    return { message, command, rest}
  }
}

import alt from './alt'
export default alt.createActions(Actions)
