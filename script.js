const emojis = ['🐶', '🐶', '🍕', '🍕', '🚗', '🚗', '🌟', '🌟', '🎵', '🎵', '👻', '👻', '⚽', '⚽', '🍓', '🍓'];
let shuffledEmojis = emojis.sort(() => 0.5 - Math.random());

const gameBoard = document.getElementById('gameBoard');
const movesDisplay = document.getElementById('moves');
const winMessage = document.getElementById('winMessage');

let flippedCards = [];
let matchedCards = 0;
let moves = 0;

shuffledEmojis.forEach((emoji, index) => {
  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.emoji = emoji;
  card.dataset.index = index;
  card.innerHTML = '';
  card.addEventListener('click', handleCardClick);
  gameBoard.appendChild(card);
});

function handleCardClick(e) {
  const card = e.target;
  const index = card.dataset.index;

  if (card.classList.contains('revealed') || flippedCards.length === 2) {
    return;
  }

  card.classList.add('revealed');
  card.innerHTML = card.dataset.emoji;
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    moves++;
    movesDisplay.textContent = moves;

    const [first, second] = flippedCards;
    if (first.dataset.emoji === second.dataset.emoji) {
      first.classList.add('matched');
      second.classList.add('matched');
      matchedCards += 2;
      flippedCards = [];

      if (matchedCards === emojis.length) {
        winMessage.classList.remove('hidden');
      }
    } else {
      setTimeout(() => {
        first.classList.remove('revealed');
        second.classList.remove('revealed');
        first.innerHTML = '';
        second.innerHTML = '';
        flippedCards = [];
      }, 1000);
    }
  }
}
