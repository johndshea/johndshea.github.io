var Game = {

	player: {
		//name: prompt("What's your name?"), //uncomment this when done testing
		name: 'Player One', // comment this when done testing
		balance: 500,
		currentBet: 5,
		cards: [],
		increaseBet: function () {
			this.currentBet += 5;
			Game.updateBetView();
		},
		decreaseBet: function () {
			this.currentBet -= 5;
			Game.updateBetView();
		},
		// returns a string for blackjack or bust, or an interger for any other hand score
		score: function () {
			var total = 0;
			var ace = false;
   			for (var i = 0; i < this.cards.length; i++) {
				if (this.cards[i].face == 'ace') {
					ace = true;
					if (total + 11 <= 21) {
						total += 11;
					} else {
						total += 1;
					}
				} else {
					total += this.cards[i].value;
				}
			}
			if (total == 21) {
				return 'blackjack';
			} else if (total > 21) {
				if ((ace) && (total-10 < 22)) {
					total -=10;
					return total;
				} else {
					return 'bust';
				}
			} else {
				return total;
			}
		},
		// adds a card to the player's hand, adds a corresponding card element to the DOM, and checks if player is bust
		hit: function () {
			this.cards.push(Game.deck.splice(0,1)[0]);
			var newCard = $("<div class='card'>").text('');
			newCard.addClass(this.cards[(this.cards.length - 1)].name);
			$('.player-hand').append(newCard);
			console.log(this.name + " has been dealt a new card.");
			console.log(this.name + " hand now contains: ");
			console.log(this.cards);
			if (Game.player.score() == 'bust') {
				Game.player.bust();
			} 
			if (this.score == 'blackjack') {
				this.blackjack();
			}
		}, // end hit function
		// if player is bust, depletes player balance
		bust: function () {
			this.balance -= (this.currentBet);
			// need to fix this line to make it portable (or prototypeable)
			Game.dealer.balance += (this.currentBet);
			Game.updateBalanceView();
			console.log("player is bust!");
			$('.info').html("player is bust!");
		}, // end bust function
		// if player has blackjack, credits player balance
		blackjack: function () {
			this.balance += (this.currentBet * 1.5);
			Game.dealer.balance -= (this.currentBet * 1.5);
			Game.updateBalanceView();
			console.log("player has blackjack!");
			$('.info').html("player has blackjack!");
		}, // end blackjack function
	}, // end player object
	
	dealer: {
		name: "Dealer",
		balance: 1000000,
		cards:[],
		// returns a string for blackjack or bust, or an interger for any other hand score
		score: function () {
			var total = 0;
			var ace = false;
   			for (var i = 0; i < this.cards.length; i++) {
				if (this.cards[i].face == 'ace') {
					ace = true;
					if (total + 11 <= 21) {
						total += 11;
					} else {
						total += 1;
					}
				} else {
					total += this.cards[i].value;
				}
			}
			if (total == 21) {
				return 'blackjack';
			} else if (total > 21) {
				if ((ace) && (total-10 < 22)) {
					total -=10;
					return total;
				} else {
					return 'bust';
				}
			} else {
				return total;
			}
		},
		// adds a card to the dealer's hand, adds a corresponding card element to the DOM, and checks if dealer is bust
		hit: function () {
			this.cards.push(Game.deck.splice(0,1)[0]);
			var newCard = $("<div class='card'>").text('');
			newCard.addClass(this.cards[(this.cards.length - 1)].name);
			$('.dealer-hand').append(newCard);
			console.log(this.name + " has been dealt a new card.");
			console.log(this.name + " hand now contains: ");
			console.log(this.cards);
			if (this.score == 'bust') {
				this.bust();
			}
			if (this.score == 'blackjack') {
				this.blackjack();
			}
		}, // end hit function
		// if dealer is bust, depletes dealer balance
		bust: function () {
			this.balance -= (Game.player.currentBet);
			// need to fix this line to make it portable (or prototypeable)
			Game.player.balance += (Game.player.currentBet);
			Game.updateBalanceView();
			console.log("dealer is bust!");
			$('.info').html("dealer is bust!");
		}, // end bust function
		// if dealer has blackjack, credits player balance
		blackjack: function () {
			this.balance += (Game.player.currentBet);
			Game.player.balance -= (Game.player.currentBet);
			Game.updateBalanceView();
			console.log("dealer has blackjack!");
			$('.info').html("dealer has blackjack!");
		}, // end blackjack function
	}, // end dealer object
	
	// the deck "in play," as opposed to the "unopened deck(s)"
	deck: [],

	/* main gameplay mechanics function: makes sure all prior-dealt cards are discarded, 
	triggers new dealing, and else waits for user input */
	newRound: function () {
		this.discardAll();
		this.initialDeal();
	}, // end newRound function

	// initial function run when page loads. Opens and shuffles the deck, and stores cards in the Game.deck array.
	// Then sets listeners on buttons. 
	openDeck: function () {
		for (i=0; i < 416; i++) {
			var shuffle = Math.floor(Math.random() * unopenedDeck.length);
			dealtCard = unopenedDeck.splice(shuffle, 1)[0];
			this.deck.push(dealtCard);
		}
		$('.info').html('The deck has been shuffled. To begin play, please click "new round."');
		console.log('The deck has been shuffled. To begin play, please click "new round."');
		$('.new_round').on('click', function () {
			Game.newRound();
		});
		$('.increase-bet').on('click', function () {
			Game.player.increaseBet();
		});
		$('.decrease-bet').on('click', function () {
			Game.player.decreaseBet();
		});
		$('.hit').on('click', function () {
			Game.player.hit();
		});
		$('.stand').on('click', function () {
			Game.stand();
		});
		$('.double').on('click', function () {
			Game.player.currentBet = (Game.player.currentBet * 2);
	        console.log("Current bet is now " + Game.player.currentBet);
	        Game.player.hit();
			console.log("must stand");
			Game.stand();
		});
		$('.surrender').on('click', function () {
			if (Game.player.cards.length == 2) {
	        	Game.dealer.balance += (Game.player.currentBet * 0.5);
				Game.player.balance -= (Game.player.currentBet * 0.5);
	        	console.log("You have surrendered. Your current balance is " + Game.player.balance);
				$('.info').html("You have surrendered. Your current balance is " + Game.player.balance);
	        } else {
	        	console.log("You may only surrender as the first decision of a hand.");
	        	$('.info').html("You may only surrender as the first decision of a hand.");
	        }
        });
	}, // end openDeck function

	// Deals initial two cards to both dealer and player, and creates corresponding DOM elements. 
	// deals cards, reveals one dealer card, checks for blackjack for both dealer and player,
	initialDeal: function () {
		Game.player.cards.push(Game.deck.splice(0,1)[0]);
		Game.player.cards.push(Game.deck.splice(0,1)[0]);
		this.player.cardOne = $("<div class='card'>").text('');
		this.player.cardOne.addClass(Game.player.cards[0].name);
		this.player.cardTwo = $("<div class='card'>").text('');
		this.player.cardTwo.addClass(Game.player.cards[1].name);
		$('.player-hand').append(this.player.cardOne);
		$('.player-hand').append(this.player.cardTwo);
		Game.dealer.cards.push(Game.deck.splice(0,1)[0]);
		Game.dealer.cards.push(Game.deck.splice(0,1)[0]);
		this.dealer.cardOne = $("<div class='card'>").text('');
		this.dealer.cardOne.addClass(Game.dealer.cards[0].name);
		this.dealer.cardOne.addClass("face-down");
		this.dealer.cardTwo = $("<div class='card'>").text('');
		this.dealer.cardTwo.addClass(Game.dealer.cards[1].name);
		this.dealer.cardTwo.addClass("face-down");
		$('.dealer-hand').append(this.dealer.cardOne);
		$('.dealer-hand').append(this.dealer.cardTwo);
		$('.info').html("Initial cards have been dealt. The player has " + 
			Game.player.cards[0].name + " and " + Game.player.cards[1].name);
		console.log("The dealer has " + 
			Game.dealer.cards[0].name + " and " + Game.dealer.cards[1].name);
		console.log("The player has " + 
			Game.player.cards[0].name + " and " + Game.player.cards[1].name);
		this.dealer.cardOne.removeClass('face-down');
		if (this.dealer.score() == 'blackjack') {
			this.dealer.cardTwo.removeClass('face-down');
			if (this.player.score() == 'blackjack') {
				console.log("both players have blackjack");
				this.tieHand();
			} else {
				console.log("dealer has blackjack");
				this.dealer.blackjack();
			}
		} else if (this.player.score() == 'blackjack') {
			console.log("player has blackjack");
			this.dealer.cardTwo.removeClass('face-down');
			this.player.blackjack();
		} else if (this.player.score() == 'bust') {
			this.player.bust();
		} else {
			console.log("neither player has blackjack");
			$('.info').html('Please choose whether to hit, stand, double, split, or surrender');
		}
	}, // end initialDeal function

	// If game is tied, essentially do nothing.
	tieHand: function () {
		console.log("There's a tie!");
		$('.info').html("There's a tie!");
	}, // end tieHand function

	// Pushes all cards in dealer and player hands to discardPile array, and removes corresponding DOM elements.
	discardAll: function () {
		for (i=Game.player.cards.length-1;i>-1;i--) {
			var discardCard = Game.player.cards.pop();
			discardPile.push(discardCard);
		}
		for (i=Game.dealer.cards.length-1;i>-1;i--) {
			var discardCard = Game.dealer.cards.pop();
			discardPile.push(discardCard);
		}
		$('.dealer-hand').empty();
		$('.player-hand').empty();
		console.log("all dealt cards have been discarded");
		console.log("discard pile now contains: ")
		console.log(discardPile);
	}, // end discard function

	stand: function () {
		console.log("stood");
		this.dealer.cardTwo.removeClass('face-down');
		if (this.player.score() == 'bust') {
			this.player.bust();
		}
		while (this.dealer.score() < 17) {
			this.dealer.hit();
			console.log("hit dealer");
		};
		if (this.dealer.score() == 'bust') {
			this.dealer.bust();
		} else if (this.dealer.score() == 'blackjack' && this.player.score() == 'blackjack') {
			this.tieHand();
		} else if (this.dealer.score() == 'blackjack') {
			this.dealer.blackjack();
		} else if (this.player.score() == 'blackjack') {
			this.player.blackjack();
		} else  if (Game.dealer.score() > Game.player.score()) {
			console.log("dealer wins!");
			$('.info').html("dealer wins!");
			Game.dealer.balance += (Game.player.currentBet);
			Game.player.balance -= (Game.player.currentBet);
			this.updateBalanceView();
		} else  if (Game.dealer.score() < Game.player.score()) {
			console.log("player wins!");
			$('.info').html("player wins!");
			Game.player.balance += (Game.player.currentBet);
			Game.dealer.balance -= (Game.player.currentBet);
			this.updateBalanceView();
		} else  if (Game.dealer.score() == Game.player.score()) {
			this.tieHand();
		} else {return 'something went wrong'};
	}, // end stand function

	updateBetView: function () {
		$('#currentBet').html('$' + this.player.currentBet);
	},

	updateBalanceView: function () {
		$('#balance').html('$' + this.player.balance);
		return $('#balance').html();
	},		
} // end Game object

Game.openDeck();