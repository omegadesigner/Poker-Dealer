const DOMIAN = 'https://deckofcardsapi.com/api/deck/';
const NEW_DECK = `${DOMIAN}new/shuffle/?deck_count=1`;
let cardCount = 10;

async function grabNewDeck()
{
    try
    {
        let newDeck = await axios.get(NEW_DECK);
        let newID = newDeck.data.deck_id;
        //grabNewHands(newID);
        return newID;
    }
    catch (error)
    {
        console.log(`Grab New Deck Error: ${error}`);
    }
}


async function grabNewHands(deckID)
{
    try 
    {
        let getCards = await axios.get(`${DOMIAN}${deckID}/draw/?count=${cardCount}`);
        //console.log(getCards.data.cards);
        return getCards.data.cards;
    } catch (error) 
    {
        console.log(`Grab New Hands Error: ${error}`);
    }
}

function dealHands(gameCards)
{
    let playerHand = [];
    let opponantHand = [];

    gameCards.forEach((card, index) => 
    {
           if(index % 2 == 0)
           {
               playerHand.push(card);
           }
           else
           {
               //console.log(index)
               opponantHand.push(card);
           }
    });
    console.log('Player Hand', playerHand);
    console.log('Opponant Hand', opponantHand);
}
async function gameLoop()
{
    let deckID = await grabNewDeck();
    console.log(deckID);
    let gameCards = await grabNewHands(deckID);
    console.log(gameCards);
    dealHands(gameCards);

}
gameLoop();
//console.log(gameCards);
//const SHUFFLE_DECK = `${DOMIAN}${deckID}/shuffle/`;
