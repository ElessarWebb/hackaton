import JSON from 'json3'
import _ from 'lodash'

const SEND = "CONTROL/SEND"
const RECEIVE = "CONTROL/RECEIVE"
const SUBSCRIBE = "CONTROL/SUBSCRIBE"
const UNSUBSCRIBE = "CONTROL/UNSUBSCRIBE"
const SOCKET_CREATE = "CONTROL/SOCKET_CREATE"
const SOCKET_OPEN = "CONTROL/SOCKET_OPEN"
const SOCKET_CLOSE = "CONTROL/SOCKET_CLOSE"

const socketOpen = socket => ({
  type: SOCKET_OPEN,
  socket
})

const receive = msg => ({
  type: RECEIVE,
  msg
})

const subscribe = handler => ({
  type: SUBSCRIBE,
  handler
})

const unsubscribe = handler => ({
  type: UNSUBSCRIBE,
  handler
})

const createSocket = (host, port, path) => dispatch => {
  let socket = new WebSocket(`ws://${host}:${port}/${path}`)
  socket.onopen = () => dispatch(socketOpen(socket))
  socket.onmessage = (msg) => dispatch(receive(msg))

  return {
    type: SOCKET_CREATE
  }
}

const send = msg => ({
  type: SEND,
  msg: JSON.stringify(msg)
})

export const actions = {
  createSocket,
  send,
  subscribe,
  unsubscribe
}

const actionHandlers = {
  [SOCKET_OPEN]: (state, {socket}) => ({
    ...state,
    controlSocket: socket,
  }),

  [SEND]: (state, {msg}) => {
    state.controlSocket.send(msg)

    return state
  },

  [RECEIVE]: (state, {msg}) => {
    console.log("Received: " + msg)

    let parsed = JSON.parse(msg)
    _.each(state.handlers, h => h(parsed))

    return state
  },

  [SUBSCRIBE]: (state, {handler}) => ({
    ...state,
    handlers: [...state.handlers, handler]
  }),

  [UNSUBSCRIBE]: (state, {hander}) => ({
    ...state,
    handlers: _.filter(state.handlers, h => h !== handler)
  })
}

const initial = {
  controlSocket: null,
  handlers: []
}

export default (state = initial, action) => {
  let handler = actionHandlers[action.type]

  if (handler) {
    return handler(state, action)
  } else {
    return state
  }
}

