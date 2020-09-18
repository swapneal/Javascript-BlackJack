let blackjackGame = {
	you: {
		scoreSpan: '#your-blackjack-result',
		div: '#your-box',
		score: 0,
	},
	dealer: {
		scoreSpan: '#dealer-blackjack-result',
		div: '#dealer-box',
		score: 0,
	},
	cards: ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'],
};

const YOU = blackjackGame['you'];
const DEALER = blackjackGame['dealer'];

document.querySelector('#blackjack-hit-button').addEventListener('click', blackjackHit);
document.querySelector('#blackjack-deal-button').addEventListener('click', blackjackDeal);
document.querySelector('#blackjack-stand-button').addEventListener('click', blackjackStand);

const hitSound = new Audio('static/sounds/swish.m4a');

function randomCard() {
	let randomIndex = Math.floor(Math.random() * 13);
	return blackjackGame['cards'][randomIndex];
}

function showCard(activePlayer, chosenCard) {
	let cardImage = document.createElement('img');
	cardImage.src = `static/images/${chosenCard}.png`;
	document.querySelector(activePlayer['div']).appendChild(cardImage);
	hitSound.play();
}

function blackjackHit() {
	let card = randomCard();
	showCard(YOU, card);
}

function blackjackStand() {
	let card = randomCard();
	showCard(DEALER, card);
}

function blackjackDeal() {
	let yourImages = document.querySelector('#your-box').querySelectorAll('img');
	let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');
	for (let i = 0; i < yourImages.length; i++) {
		yourImages[i].remove();
	}
	for (let i = 0; i < dealerImages.length; i++) {
		dealerImages[i].remove();
	}
}
