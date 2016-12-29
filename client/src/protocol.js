const KEYPRESS = "CONTROL:KEYPRESS"

export const keypress = keyCode => ({
  type: KEYPRESS,
  keyCode
})
