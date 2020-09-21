# Project Overview

## Poker Dealer

[Poker Dealer Github](https://github.com/omegadesigner/Poker-Dealer)

## Project Description

This is a very basic poker game, the card deck API will create a new deck and shuffle it. The player and their virtual opponent will be dealt five cards each. The two hands will then be compared to determine a winner and display the winning hand on screen for the player. The player will then be asked if they wish to play again.

## API and Data Sample

[Card Deck API Documentation](http://deckofcardsapi.com/)

```
{
    "success": true,
    "deck_id": "1n6meszz9aas",
    "cards": [
        {
            "code": "QH",
            "image": "https://deckofcardsapi.com/static/img/QH.png",
            "images": {
                "svg": "https://deckofcardsapi.com/static/img/QH.svg",
                "png": "https://deckofcardsapi.com/static/img/QH.png"
            },
            "value": "QUEEN",
            "suit": "HEARTS"
        },
        {
            "code": "JC",
            "image": "https://deckofcardsapi.com/static/img/JC.png",
            "images": {
                "svg": "https://deckofcardsapi.com/static/img/JC.svg",
                "png": "https://deckofcardsapi.com/static/img/JC.png"
            },
            "value": "JACK",
            "suit": "CLUBS"
        },
        {
            "code": "KH",
            "image": "https://deckofcardsapi.com/static/img/KH.png",
            "images": {
                "svg": "https://deckofcardsapi.com/static/img/KH.svg",
                "png": "https://deckofcardsapi.com/static/img/KH.png"
            },
            "value": "KING",
            "suit": "HEARTS"
        },
        {
            "code": "9C",
            "image": "https://deckofcardsapi.com/static/img/9C.png",
            "images": {
                "svg": "https://deckofcardsapi.com/static/img/9C.svg",
                "png": "https://deckofcardsapi.com/static/img/9C.png"
            },
            "value": "9",
            "suit": "CLUBS"
        },
        {
            "code": "6S",
            "image": "https://deckofcardsapi.com/static/img/6S.png",
            "images": {
                "svg": "https://deckofcardsapi.com/static/img/6S.svg",
                "png": "https://deckofcardsapi.com/static/img/6S.png"
            },
            "value": "6",
            "suit": "SPADES"
        }
    ],
    "remaining": 47
}
```

## Wireframes

![Wireframe Decktop](https://i.imgur.com/FqyOf76.jpg)
![Wireframe Mobile](https://i.imgur.com/S3CZzbU.jpg)

### MVP/PostMVP

#### MVP 

- Get a new deck, shuffle it, and pull the cards from the Card Deck API.
- Display the 5 cards that make up the players hand.
- Cycle through the opponant and player hands to determine a winner.
- Display a Win/Loss message with the name of the winning hand (i.e...Full House, Two Pair)
- Ask the player if they wish to play again.

#### PostMVP  

- Add discard and draw functionality.
- Add starting money and betting functionality
- Add a choice of different betting structures.
- Add a choice of different Poker games.

## Project Schedule

|  Day | Deliverable | Status
|---|---| ---|
|Sept 18-21| Prompt / Wireframes / Priority Matrix / Timeframes | Incomplete
|Sept 21| Project Approval | Incomplete
|Sept 22| Core Application Structure (HTML, CSS, etc.) | Incomplete
|Sept 23| MVP | Incomplete
|Sept 24| Post MVP/Styling | Incomplete
|Sept 25| Presentations | Incomplete

## Priority Matrix

![Priority Matrix](https://i.imgur.com/SFkijDi.jpg)

## Timeframes

| Component | Priority | Estimated Time | Time Invested | Actual Time |
| --- | :---: |  :---: | :---: | :---: |
| Creating API calls (new deck, shuffle, deal) | H | 1hrs| NA | NA |
| Cycling thround hand to determine score| H | 3hrs| NA | NA |
| Creating Logic Tree to reference score | H | 3hrs| NA | NA |
| Comparing player and opponant hand to determine winner | H | 6hrs| NA | NA |
| Styling Visuals of player hand | H | 3hrs| NA | NA |
| Styling for mobile version | M | 3hrs| NA | NA |
| Card Shuffle and Deal Visuals | L | 3hrs| NA | NA |
| Total | H | 22hrs| NA | NA |

## Code Snippet

Currently not Coding 

```
No_Code_Yet()
{
	face.sad();
}
```

## Change Log

No changes to project as of 9/20/20.
