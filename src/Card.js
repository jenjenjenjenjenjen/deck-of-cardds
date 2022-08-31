

const Card = (props) => {
    return (
        <>
            <img src={props.image} />
            <p>There are {props.remaining} cards left.</p>
        </>
    )
}

export default Card;