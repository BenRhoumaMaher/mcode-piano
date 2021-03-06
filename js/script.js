let createKey = (type, note, octave) => {
  let key = document.createElement('button')
  key.className = `piano__key piano__key--${type}`
  key.dataset.letterNote = type == 'white' ? note + octave : note + '#' + octave
  key.dataset.letterNoteFileName =
    type == 'white' ? note + octave : note + 's' + octave
  key.textContent = key.dataset.letterNote
  keys.push(key)
  key.addEventListener('mousedown', () => {
    playsound(key)
    key.classList.add('piano__key--playing')
  })
  key.addEventListener('mouseup', () => {
    key.classList.remove('piano__key--playing')
  })
  key.addEventListener('mouseleave', () => {
    key.classList.remove('piano__key--playing')
  })
  return key
}
let keyboard = document.querySelector('.piano__keyboard')
let controls = document.querySelectorAll('.piano__control__option')
let pianoNotes = ['C', 'D', 'E', 'F', 'G', 'A', 'B']
let keyboardMap = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '0',
  'A',
  'Z',
  'E',
  'R',
  'T',
  'Y',
  'U',
  'I',
  'O',
  'P',
  'Q',
  'S',
  'D',
  'F',
  'G',
  'H',
  'J',
  'K',
  'L',
  'M',
  'W',
  'X',
  'C',
  'V',
  'B'
]
let keys = []
let init = () => {
  for (let i = 1; i <= 5; i++) {
    for (let j = 0; j < 7; j++) {
      let key = createKey('white', pianoNotes[j], i)
      key.dataset.keyboard = keyboardMap[j + (i - 1) * 7]
      keyboard.appendChild(key)
      if (j != 2 && j != 6) {
        key = createKey('black', pianoNotes[j], i)
        key.dataset.keyboard = '⇧+' + keyboardMap[j + (i - 1) * 7]
        let emptySpace = document.createElement('div')
        emptySpace.className = 'empty-space'
        emptySpace.appendChild(key)
        keyboard.appendChild(emptySpace)
      }
    }
  }
}
let playsound = key => {
  let audio = document.createElement('audio')
  audio.src = 'sounds/' + key.dataset.letterNoteFileName + '.mp3'
  audio.play().then(() => audio.remove())
}
controls.forEach(input => {
  input.addEventListener('input', () => {
    let value = input.value
    let type
    switch (value) {
      case 'letterNotes':
        type = 'letterNote'
        break
      case 'keyboard':
        type = 'keyboard'
        break
      case 'none':
        type = ''
    }
    keys.forEach(key => {
      key.textContent = key.dataset[type]
    })
  })
})
init()
document.addEventListener('keydown', e => {
  if (e.repeat) {
    return
  }
  pressKey('mousedown', e)
})
document.addEventListener('keyup', e => {
  pressKey('mouseup', e)
})
let pressKey = (mouseEvent, e) => {
  let lastLetter = e.code.substring(e.code.length - 1)
  let isShiftPressed = e.shiftKey
  let selector
  if (isShiftPressed) {
    selector = `[data-keyboard="⇧+${lastLetter}"]`
  } else {
    selector = `[data-keyboard=${lastLetter}]`
  }
  let key = document.querySelector(selector)
  if (key !== null) {
    let event = new Event(mouseEvent)
    key.dispatchEvent(event)
  }
}
