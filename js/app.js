// initialize 
const keyboard = document.createElement('div')
const keyContainer = document.createElement('div')
const textArea = document.querySelector('.use-keyboard-input')
const keys = document.querySelectorAll('.keyboard__key')
let capslock = false

// main function

const main = () => {

    // Setup main elements
    keyboard.classList.add('keyboard', 'keyboard--hidden')
    keyContainer.classList.add('keyboard__keys')
    keyContainer.append(createKeys())

    // Add to DOM
    keyboard.append(keyContainer)
    document.body.append(keyboard)
}

// Making things work

textArea.addEventListener("focus", () => {
    keyboard.classList.remove("keyboard--hidden")
})

// Creating Keyboard

const createKeys = () => {
    const frag = document.createDocumentFragment()
    const keyLayout = [
        "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
        "q", "w", "e", "r", "t", "y", "u", "i", "o", "p",
        "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", "enter",
        "done", "z", "x", "c", "v", "b", "n", "m", ",", ".", "?",
        "space"
    ]

    // Create HTML for an icon
    const createIconHTML = (icon_name) => {
        return `<i class="material-icons">${icon_name}</i>`
    }

    keyLayout.forEach(key => {
        const keyElement = document.createElement('button')
        const insertLineBreak = ['backspace', 'p', 'enter', '?'].indexOf(key) !== -1


        // Add Attribute/Classes
        keyElement.setAttribute('type', 'button')
        keyElement.classList.add('keyboard__key')

        switch (key) {
            case 'backspace':
                keyElement.classList.add('keyboard__key--wide')
                keyElement.innerHTML = createIconHTML('backspace')

                keyElement.addEventListener('click', () => {
                    textArea.value = textArea.value.substring(0, textArea.value.length - 1)
                })

                break;

            case 'caps':
                keyElement.classList.add('keyboard__key--wide', 'keyboard__key--activatable')
                keyElement.innerHTML = createIconHTML('keyboard_capslock')

                keyElement.addEventListener('click', () => {
                    capslock = !capslock
                    for (const key of keys) {
                        key.innerHTML = capslock ? key.innerHTML.toUpperCase() : key.innerHTML.toLowerCase()
                    }
                    // keys.forEach(key => {
                    // key.innerHTML = capslock ? key.innerHTML.toUpperCase() : key.innerHTML.toLowerCase()
                    // })
                    keyElement.classList.toggle('keyboard__key--active')
                })

                break;

            case 'enter':
                keyElement.classList.add('keyboard__key--wide')
                keyElement.innerHTML = createIconHTML('keyboard_return')

                keyElement.addEventListener('click', () => {
                    textArea.value += '\n'
                })

                break;

            case 'space':
                keyElement.classList.add('keyboard__key--extra-wide')
                keyElement.innerHTML = createIconHTML('space_bar')

                keyElement.addEventListener('click', () => {
                    textArea.value += ' '
                })

                break;

            case 'done':
                keyElement.classList.add('keyboard__key--wide', 'keyboard__key--dark')
                keyElement.innerHTML = createIconHTML('check_circle')

                keyElement.addEventListener('click', () => {
                    keyboard.classList.add('keyboard--hidden')
                })

                break;

            default:
                keyElement.textContent = key.toLowerCase()

                keyElement.addEventListener('click', function () {
                    textArea.value += textArea.capslock ? key.toUpperCase() : key.toLowerCase()
                })
        }

        frag.append(keyElement)

        if (insertLineBreak) {
            frag.append(document.createElement('br'))
        }
    })

    return frag;
}

window.addEventListener('DOMContentLoaded', () => {
    main();
})