const gameContainer = document.getElementById('game')
const restart = document.querySelector(".restart")

let isFlipped = false
let firstCard
let secondCard
let flippedCards = 0

const COLORS = [
  'red',
  'blue',
  'green',
  'orange',
  'purple',
  'red',
  'blue',
  'green',
  'orange',
  'purple',
]

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter)

    // Decrease counter by 1
    counter--

    // And swap the last element with it
    let temp = array[counter]
    array[counter] = array[index]
    array[index] = temp
  }

  return array
}

let shuffledColors = shuffle(COLORS)

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement('div')

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color)

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener('click', handleCardClick)

    // append the div to the element with an id of game
    gameContainer.append(newDiv)
  }
}

// TODO: Implement this function!
function handleCardClick(e) {
  let selectedCard = e.target

  if (isFlipped) return //<-- if card is unflipped return
  if (selectedCard.classList.contains('flipped')) return //<-- return if card contains flipped class

  selectedCard.style.backgroundColor = selectedCard.classList[0]

  if (!firstCard || !secondCard) { //<-- confirming cards are null
    selectedCard.classList.add('flipped') //<-- adding flipped class to clicked card
    firstCard = firstCard || selectedCard //<-- making sure first card is the clicked card

    if (selectedCard === firstCard) { //<-- setting second clicked card 
      return null // as a new unflipped card and not card 1
    } else {
      secondCard = selectedCard
    }
  }

  if (firstCard && secondCard) { //<-- allowing a maximum of two cards at a time,
    isFlipped = true // by setting the flipped property to true for BOTH cards

    // using ternary to clean up the code
    firstCard.className === secondCard.className ? matchingCards() : unflippedCards()

    gameOver() //<-- alerting the user that game is over
  }
}

const matchingCards = () => {
  firstCard.removeEventListener('click', handleCardClick) //<-- removing events
  secondCard.removeEventListener('click', handleCardClick) //<-- removign events
  firstCard = null //<-- resetting the properties 
  secondCard = null //<-- resetting the properties
  isFlipped = false //<-- resetting the properties
  flippedCards += 2 //<-- adding 2 cards to the count
}

const unflippedCards = () => {
  setTimeout(() => {
    firstCard.classList.remove('flipped') //<-- using timer to reset properties
    secondCard.classList.remove('flipped') //<-- using timer to reset properties
    firstCard.style.backgroundColor = null //<-- using timer to reset properties
    secondCard.style.backgroundColor = null //<-- using timer to reset properties
    firstCard = null //<-- restting firstCard to null
    secondCard = null //<-- restting secondCard to null
    isFlipped = false //<-- restting the flipped property to false
  }, 1000)
}

const gameOver = () => {
  flippedCards === COLORS.length && alert("Game Over!")
}

// === RESTART THE GAME === //
restart.addEventListener('click', () => {
  window.location.reload()
})

// when the DOM loads
createDivsForColors(shuffledColors)