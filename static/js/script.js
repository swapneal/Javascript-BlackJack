let blackjackGame = {
	you: {
		scoreSpan: '#your-blackjack-score',
		div: '#your-box',
		score: 0,
	},
	dealer: {
		scoreSpan: '#dealer-blackjack-score',
		div: '#dealer-box',
		score: 0,
	},
	cards: ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'],
	cardsMap: { 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, 10: 10, J: 10, Q: 10, K: 10, A: [1, 11] },
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
	if (activePlayer['score'] <= 21) {
		let cardImage = document.createElement('img');
		cardImage.src = `static/images/cards/${chosenCard}.png`;
		document.querySelector(activePlayer['div']).appendChild(cardImage);
		hitSound.play();
	}
}

function showScore(activePlayer) {
	if (activePlayer['score'] > 21) {
		document.querySelector(activePlayer['scoreSpan']).textContent = 'BUSTED!!';
		document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
	} else {
		document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
		document.querySelector(activePlayer['scoreSpan']).style.color = '#7CFC00';
	}
}

function blackjackHit() {
	let card = randomCard();
	showCard(YOU, card);
	updateScore(YOU, card);
	showScore(YOU);
}

function blackjackStand() {
	dealerLogic();
}

function blackjackDeal() {
	let yourImages = document.querySelector('#your-box').querySelectorAll('img');
	let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');
	if (yourImages[1]) {
		for (let i = 1; i < yourImages.length; i++) {
			yourImages[i].remove();
		}
	}
	if (dealerImages[1]) {
		for (let i = 1; i < dealerImages.length; i++) {
			dealerImages[i].remove();
		}
	}
	YOU['score'] = 0;
	DEALER['score'] = 0;

	document.querySelector('#your-blackjack-score').textContent = 0;
	document.querySelector('#dealer-blackjack-score').textContent = 0;
	document.querySelector('#your-blackjack-score').style.color = '#ffffff';
	document.querySelector('#dealer-blackjack-score').style.color = '#ffffff';
}

function updateScore(activePlayer, card) {
	if (card === 'A') {
		if (activePlayer['score'] + blackjackGame['cardsMap'][card][1] <= 21) {
			activePlayer['score'] += blackjackGame['cardsMap'][card][1];
		} else {
			activePlayer['score'] += blackjackGame['cardsMap'][card][0];
		}
	} else {
		activePlayer['score'] += blackjackGame['cardsMap'][card];
	}
}

function dealerLogic() {
	let card = randomCard();
	showCard(DEALER, card);
	updateScore(DEALER, card);
	showScore(DEALER);
}
