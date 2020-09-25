const DOMIAN = 'https://deckofcardsapi.com/api/deck/';
const NEW_DECK = `${DOMIAN}new/shuffle/?deck_count=1`;
const playButton = document.querySelector('#playButton');

let newID = '';
let SHUFFLE_DECK = '';

let cardCount = 10;
let playerHand = [];
let opponantHand = [];
let playerHandProps = 
{
    flush: false,
    straight: false,
    duplicates: [],
    kinds: [],
    kicker: [],
    handName: '',
    handRank: 1
}
let opponantHandProps = 
{
    flush: false,
    straight: false,
    duplicates: [],
    kinds: [],
    kicker: [],
    handName: '',
    handRank: 1
}

playButton.style.display = 'none';

async function grabNewDeck()
{
    try
    {
        let newDeck = await axios.get(NEW_DECK);
        newID = newDeck.data.deck_id;
        SHUFFLE_DECK = `${DOMIAN}${newID}/shuffle/`;
        playButton.style.display = 'flex';
    }
    catch (error)
    {
        console.log(`Grab New Deck Error: ${error}`);
    }
}
grabNewDeck();

async function shuffleDeck()
{
    try 
    {
        await axios.get(SHUFFLE_DECK);
    } catch (error) 
    {
        console.log(`Grab New Hands Error: ${error}`); 
    }
}

async function grabNewHands()
{
    try 
    {
        let getCards = await axios.get(`${DOMIAN}${newID}/draw/?count=${cardCount}`);
        return getCards.data.cards;
    } catch (error) 
    {
        console.log(`Grab New Hands Error: ${error}`);
    }
}

function dealHands(gameCards)
{
    playerHand = [];
    opponantHand = [];
    gameCards.forEach((card, index) => 
    {
        if(index % 2 == 0)
        {
            playerHand.push(card);
            appendCards(card);
        }
        else
        {
            opponantHand.push(card);
        }
    });
}

async function gameLoop()
{
    await shuffleDeck();
    let gameCards = await grabNewHands();
    gameCards = handSort(gameCards);
    dealHands(gameCards);
    gameLogic(playerHand, opponantHand);
    appendHandName(playerHandProps.handName);
}

function appendCards(card)
{
    const grabPicContainer = document.querySelector('.cardsContainer');
    let picDiv = document.createElement('div');
    picDiv.className = 'card';
    let pic = document.createElement('img');
    pic.setAttribute('src', card.image);
    picDiv.appendChild(pic);
    grabPicContainer.appendChild(picDiv);
}

function appendHandName(handName)
{
    const grabHandDisplay = document.querySelector('.handDisplay');
    let handDiv = document.createElement('p');
    handDiv.innerHTML = handName;
    grabHandDisplay.appendChild(handDiv);
}

function destroyEverything()
{
    const grabPicContainer = document.querySelector('.cardsContainer');
    while(grabPicContainer.lastChild)
    {
        grabPicContainer.removeChild(grabPicContainer.lastChild);
    }
    const grabHandDisplay = document.querySelector('.handDisplay');
    while(grabHandDisplay.lastChild)
    {
        grabHandDisplay.removeChild(grabHandDisplay.lastChild);
    }
    const winLoss = document.querySelector('.winLoss');
    while(winLoss.lastChild)
    {
        winLoss.removeChild(winLoss.lastChild);
    }
    const winningHand = document.querySelector('.winningHand');
    while(winningHand.lastChild)
    {
        winningHand.removeChild(winningHand.lastChild);
    }
}

playButton.addEventListener('click', playAgain);

function playAgain()
{
    destroyEverything();
    gameLoop();
    playButton.innerHTML = 'PLAY AGAIN';
}

function gameLogic(playerHand, opponantHand)
{
    playerHandProps.flush = false;
    playerHandProps.straight = false;
    playerHandProps.duplicates = [];
    playerHandProps.kinds = [];
    playerHandProps.kicker = [];
    playerHandProps.handName = '';
    playerHandProps.handRank = 1;
    
    opponantHandProps.flush = false;
    opponantHandProps.straight = false;
    opponantHandProps.duplicates = [];
    opponantHandProps.kinds = [];
    opponantHandProps.kicker = [];
    opponantHandProps.handName = '';
    opponantHandProps.handRank = 1;

    playerHandProps.flush = isFlush(playerHand);
    playerHandProps.straight = isStraight(playerHand);
    playerHandProps.duplicates = hasDuplicates(playerHand);
    playerHandProps.kinds = hasLikeKinds(playerHandProps.duplicates);
    playerHandProps.kicker = hasKicker(playerHand);
    playerHandProps.handName = determineHand(playerHandProps);

    opponantHandProps.flush = isFlush(opponantHand);
    opponantHandProps.straight = isStraight(opponantHand);
    opponantHandProps.duplicates = hasDuplicates(opponantHand);
    opponantHandProps.kinds = hasLikeKinds(opponantHandProps.duplicates);
    opponantHandProps.kicker = hasKicker(opponantHand);
    opponantHandProps.handName = determineHand(opponantHandProps);
 
    determineWinner(playerHandProps,opponantHandProps);
}

function handSort(hand)
{
    let handValue = [];
    hand.forEach(card => 
    {
        handValue.push(card.value);
    });
    handValue.forEach((card, index) =>
    {
        switch (card) 
        {
            case '2':
            {   
                hand[index].numValue = 1;
                break;
            }
            case '3':
            {   
                hand[index].numValue = 2;
                break;
            }
            case '4':
            {   
                hand[index].numValue = 3;
                break;
            }
            case '5':
            {   
                hand[index].numValue = 4;
                break;
            }
            case '6':
            {   
                hand[index].numValue = 5;
                break;
            }
            case '7':
            {   
                hand[index].numValue = 6;
                break;
            }
            case '8':
            {   
                hand[index].numValue = 7;
                break;
            }
            case '9':
            {   
                hand[index].numValue = 8;
                break;
            }
            case '10':
            {   hand[index].numValue = 9;
                break;}
            case 'JACK':
            {   
                hand[index].numValue = 10;
                break;
            }
            case 'QUEEN':
            {   
                hand[index].numValue = 11;
                break;
            }
            case 'KING':
            {   
                hand[index].numValue = 12;
                break;
            }
            case 'ACE':
            {   
                hand[index].numValue = 13;
                break;
            }
            default:
            {   
                break;
            }  
        };
    });
    let sortedHand = hand.sort((a, b) => a.numValue - b.numValue);
    return sortedHand;
}

function isFlush(hand)
{
    let flushCheck = false;
    let handSuit = [];
    hand.forEach(card => 
    {
        handSuit.push(card.suit);
    });

    switch(handSuit.join())
    {
        case 'SPADES,SPADES,SPADES,SPADES,SPADES':
        case 'HEARTS,HEARTS,HEARTS,HEARTS,HEARTS':
        case 'CLUBS,CLUBS,CLUBS,CLUBS,CLUBS':
        case 'DIAMONDS,DIAMONDS,DIAMONDS,DIAMONDS,DIAMONDS':
        {
            flushCheck = true;
            break;
        }
        default:
        {
            break;
        }
    };
    return flushCheck;
}

function isStraight(hand)
{
    let straightCheck = false;
    let cardValue = [];
    hand.forEach(card => 
    {
        cardValue.push(card.value);
    });

    switch(cardValue.join())
    {
        case '2,3,4,5,ACE':
        case '2,3,4,5,6': 
        case '3,4,5,6,7': 
        case '4,5,6,7,8': 
        case '5,6,7,8,9': 
        case '6,7,8,9,10': 
        case '7,8,9,10,JACK': 
        case '8,9,10,JACK,QUEEN': 
        case '9,10,JACK,QUEEN,KING': 
        case '10,JACK,QUEEN,KING,ACE':
        {
            straightCheck = true;
            break;
        }
        default:
        {
            break;
        }
    };
    return straightCheck;
}

function hasDuplicates(hand)
{
    let dupcheck = [];
    let duplicateTracker =
    {
        Deuces: 0,
        Threes: 0,
        Fours: 0,
        Fives: 0,
        Sixes: 0,
        Sevens: 0,
        Eights: 0,
        Nines: 0,
        Tens: 0,
        Jacks: 0,
        Queens: 0,
        Kings: 0,
        Aces: 0
    };

    hand.forEach(card => 
    {
        dupcheck.push(card.value);
    });
    
    dupcheck.forEach((card) => 
    {
        switch (card) 
        {
            case '2':
            {
                duplicateTracker.Deuces++;
                break;
            }
            case '3':
            {
                duplicateTracker.Threes++;
                break;
            }
            case '4':
            {
                duplicateTracker.Fours++;
                break;
            }
            case '5':
            {
                duplicateTracker.Fives++;
                break;
            }
            case '6':
            {
                duplicateTracker.Sixes++;
                break;
            }
            case '7':
            {
                duplicateTracker.Sevens++;
                break;
            }
            case '8':
            {
                duplicateTracker.Eights++;
                break;
            }
            case '9':
            {
                duplicateTracker.Nines++;
                break;
            }
            case '10':
            {
                duplicateTracker.Tens++;
                break;
            }
            case 'JACK':
            {
                duplicateTracker.Jacks++;
                break;
            }
            case 'QUEEN':
            {
                duplicateTracker.Queens++;
                break;
            }
            case 'KING':
            {
                duplicateTracker.Kings++;
                break;
            }
            case 'ACE':
            {
                duplicateTracker.Aces++;
                break;
            }
            default:
            {
                break;
            }
        };
    });
    return duplicateTracker;
}

function hasLikeKinds(duplicateTracker)
{
    let duplicateFilter = [];
    let tempObj = {};
    let tempName = '';
    let tempValue = 0;
    for (let index in duplicateTracker) 
    {
        if(duplicateTracker[index] > 1)
        {
            tempName = (`${index}`);
            tempValue = duplicateTracker[index];
        }
        if(tempName != '' && tempValue != 0)
        {
            tempObj[tempName] = tempValue;
        }
    }
    duplicateFilter.push(tempObj);
    return duplicateFilter;
}

function hasKicker(hand)
{
    let handValue = [];
    hand.forEach(card => 
    {
        handValue.push(card.value);
    });
    let singleCards = [];
    handValue.forEach((card, index) => 
    {
        if(card != handValue[index+1] && card != handValue[index-1])
        {
            singleCards.unshift(hand[index]);
        }
    });
    return singleCards;
}

function determineHand(handProps)
{
    let name = '';
    let straightName = '';
    let flushName = '';
    let pairName = '';
    let numberOfDups = Object.keys(handProps.kinds[0]).length;
    let highCard = '';
    let tempHighCard = '';

    if(handProps.kicker[0])
    {
        tempHighCard = handProps.kicker[0].value;
    }

    if(handProps.straight && handProps.flush)
    {
        if(tempHighCard == 'ACE')
        {
            straightName = 'ROYAL FLUSH';
            handProps.handRank = 1000;
        }
        else
        {
            straightName = `Straight Flush to the ${tempHighCard}`;
            handProps.handRank = 900 + handProps.kicker[0].numValue;
        }
    }
    else if(handProps.straight)
    {
        straightName = `Straight to the ${tempHighCard}`;
        handProps.handRank = 500 + handProps.kicker[0].numValue;
    }
    else if(handProps.flush)
    {       
        flushName = `${tempHighCard} High Flush`;
        handProps.handRank = (600 + 
            handProps.kicker[0].numValue +
            handProps.kicker[1].numValue +
            handProps.kicker[2].numValue +
            handProps.kicker[3].numValue +
            handProps.kicker[4].numValue);
    }
    else if(numberOfDups > 0)
    {
        let dupKeys = Object.keys(handProps.kinds[0]);
        let keyValue = handProps.kinds[0][`${dupKeys[0]}`];
        if(numberOfDups > 1)
        {
            let keyName = '';
            dupKeys.forEach((key, index) =>
            {
                keyName = key;
                let keyValues = handProps.kinds[0][`${dupKeys[index]}`];
                pairName += `${keyName}`;
                if(keyValues > 2 && index < dupKeys.length - 1)
                {
                    pairName += ' full of ';
                    handProps.handRank = 700;;
                }
                else if(index < dupKeys.length - 1)
                {
                    pairName += ' and ';
                    handProps.handRank = 300 + handProps.kicker[0].numValue;
                }
            })
        }
        else
        {
            switch (keyValue) 
            {
                case 2:
                {
                    pairName = (`Pair of ${dupKeys[0]} `+ 
                    `With a ${handProps.kicker[0].value}, `+
                    `${handProps.kicker[1].value}, `+
                    `${handProps.kicker[2].value} High`);
                    handProps.handRank = (200 + 
                        handProps.kicker[0].numValue +
                        handProps.kicker[1].numValue +
                        handProps.kicker[2].numValue);
                    break;
                }
                case 3:
                {
                    pairName = (`Three ${dupKeys[0]} `+
                    `With a ${handProps.kicker[0].value}, `+
                    `${handProps.kicker[1].value} Kicker`);
                    handProps.handRank = (400 + 
                        handProps.kicker[0].numValue +
                        handProps.kicker[1].numValue);
                    break;
                }
                case 4:
                {
                    pairName = (`Four ${dupKeys[0]} `+
                    `With a ${handProps.kicker[0].value} Kicker`);
                    handProps.handRank = 800 + handProps.kicker[0].numValue;
                    break;
                }
                default:
                {
                    break;
                }  
            }
        }
    }
    else
    {
        highCard = (`${handProps.kicker[0].value}, `+
        `${handProps.kicker[1].value}, `+ 
        `${handProps.kicker[2].value}, High`);
        handProps.handRank = (100 + 
            handProps.kicker[0].numValue +
            handProps.kicker[1].numValue +
            handProps.kicker[2].numValue +
            handProps.kicker[3].numValue +
            handProps.kicker[4].numValue);
    }
    name = `${straightName}${flushName}${pairName}${highCard}`;
    return name;
}

function determineWinner(playerProps, opponantProps)
{
    const winLoss = document.querySelector('.winLoss')
    const winningHand = document.querySelector('.winningHand')
    if(playerProps.handRank > opponantProps.handRank)
    {
        let playerWins = document.createElement('div');
        playerWins.innerHTML = "You Win";
        winLoss.appendChild(playerWins);
        let playerHandWins = document.createElement('div');
        playerHandWins.innerHTML = playerProps.handName;
        winningHand.appendChild(playerHandWins);
    }
    else if(playerProps.handRank == opponantProps.handRank)
    {
        let draw = document.createElement('div');
        draw.innerHTML = "It's a Draw";
        winLoss.appendChild(draw);
        let drawHands = document.createElement('div');
        drawHands.innerHTML = playerProps.handName;
        winningHand.appendChild(drawHands);
    }
    else
    {
        let opponantWins = document.createElement('div');
        opponantWins.innerHTML = "You Lose";
        winLoss.appendChild(opponantWins);
        let opponantHandWins = document.createElement('div');
        opponantHandWins.innerHTML = opponantProps.handName;
        winningHand.appendChild(opponantHandWins);
    }
}