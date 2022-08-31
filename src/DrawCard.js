import {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import Card from './Card';

const DrawCard = () => {
    const timerId = useRef();
    const [deck, setDeck] = useState(null)
    const [currCard, setCard] = useState(null);

    useEffect(() => {
        async function loadDeck() {
            const res = await axios.get("http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
            setDeck(res.data);
        }
        loadDeck();
    }, [])

    // useEffect(function drawCard() {

    //     timerId.current = setInterval(() => {
    //       draw();
    //     }, 1000);
    
    //     return function cleanUpClearTimer() {
    //       clearInterval(timerId.current);
    //     };
    //   }, [timerId]);
    

    const drawCard = useEffect(() => {
        timerId.current = setInterval(() => {
            async function draw() {
                const card = await axios.get(`http://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=1`);
                setCard(card.data);
                if(currCard.remaining == 0) {
                    alert("Error: No more cards!");
                    window.location.reload();
                }
            }
            draw();
        }, 1000);
        return function cleanUpClearTimer() {
            clearInterval(timerId.current);
        }
    }, [timerId])

    return (
        <>
            <button onClick={drawCard}>Draw a Card!</button>
            <Card image={currCard ? currCard.cards[0].image : null} remaining={currCard ? currCard.remaining : 52} />
        </>
    )
}

export default DrawCard;