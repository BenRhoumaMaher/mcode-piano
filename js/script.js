// function that serves for the creation of one key
// first argument is type : it's to define wether the key is black or white
// note is for the musical note : A,B,C,D,E,F,G
// octave is third argument it's for do ri me fa .... between 1 and 8
// this is the arrow function : a way to declare a function
let createKey = (type, note, octave) => {
  // use createelement to create an element
  let key = document.createElement('button')
  // classname to apply a class to an element
  // here the type is either black of white
  key.className = `piano__key piano__key--${type}`
  // dataset is used to get or set the value of custom data attribute of an element
  // letterNote here is the data attribute
  // if the type of letterNote is white, then give it note + octave, if not then give it the other option
  // above is called the ternary operator
  key.dataset.letterNote = type == 'white' ? note + octave : note + '#' + octave
  // because the # is s in the folder
  key.dataset.letterNoteFileName =
    type == 'white' ? note + octave : note + 's' + octave
  // textContent returns or sets the text of an element
  key.textContent = key.dataset.letterNote
  // use addeventlister to add an event whenever the element is clicked
  //mousedown used when the left mouse is clicked
  key.addEventListener('mousedown', () => {
    playsound(key)
    // classlist return the css classname of an element, use it to add some style to specific class of an element
    key.classList.add('piano__key--playing')
  })
  //mouseup occures when the left mouse is released
  key.addEventListener('mouseup', () => {
    key.classList.remove('piano__key--playing')
  })
  //mouseleave occures when the pointer leaves the selected element
  key.addEventListener('mouseleave', () => {
    key.classList.remove('piano__key--playing')
  })
  // use return so that we can use the result of this function in other functions
  return key
}
let keyboard = document.querySelector('.piano__keyboard')
//store all the notes in a variable
let pianoNotes = ['C', 'D', 'E', 'F', 'G', 'A', 'B']
//function will be called to create all the piano keys
let init = () => {
  //first for loop is for octaves : and here we have 5 octaves in total : 1,2,3,4,5
  for (let i = 1; i <= 5; i++) {
    //second loop is for notes : here every octave have 7 notes : a1,b1,c1,d1,e1,f1,h1
    for (let j = 0; j < 7; j++) {
      //call the key function 'createkey' to create key
      //here white is the type, pianoNotes[j] is for the note, and i is the octave
      let key = createKey('white', pianoNotes[j], i)
      // appenchiled is used to attach element at the end of a parent
      // but here we used to insert key inside of the keyboard
      keyboard.appendChild(key)

      //create a black key when it's not the third and seventh note
      //here 2 is the index of seventh note and 6 is index of the seventh note
      if (j != 2 && j != 6) {
        // here we delete the let because we've already created key variable
        key = createKey('black', pianoNotes[j], i)
        // create element div with class empty-space because the blackkeys are placed inside of the div
        let emptySpace = document.createElement('div')
        emptySpace.className = 'empty-space'
        //insert the key inside the div
        emptySpace.appendChild(key)
        keyboard.appendChild(emptySpace)
      }
    }
  }
}
let playsound = key => {
  let audio = document.createElement('audio')
  //src specified url of external script folder
  // mp3 is the extension of the audio
  audio.src = 'sounds/' + key.dataset.letterNoteFileName + '.mp3'
  // .play used to play the audio
  //audio.remove to delete the audio after it's played, because without audio.remove, every time click on key a new audio will be added
  audio.play().then(() => audio.remove())
}
//call the init function
init()
