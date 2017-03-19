const state = {
    cards: [
        {faceId: 0, faceUp: false, matchFound: false, face: '/dist/assets/logo.png'},
        {faceId: 1, faceUp: false, matchFound: false, face: '/dist/assets/200-1.jpg'},
        {faceId: 2, faceUp: false, matchFound: false, face: '/dist/assets/200-2.jpg'},
        {faceId: 3, faceUp: false, matchFound: false, face: '/dist/assets/200-3.jpg'},
        {faceId: 4, faceUp: false, matchFound: false, face: '/dist/assets/200-4.jpg'},
        {faceId: 5, faceUp: false, matchFound: false, face: '/dist/assets/200-5.jpg'}
    ],
    // cardsInPlay: [
    // ],
    currentSelection: [],
    notification: {message: null, type: null},
    lockGameBoard: false
}

// This shuffle algorithm was lifted from:
// https://bost.ocks.org/mike/shuffle/
// (It's late and I didn't feel like working it out on my own :P)
function shuffle (array) {
    let m = array.length
    let t
    let i

    // While there remain elements to shuffle…
    while (m) {
        // Pick a remaining element…
        i = Math.floor(Math.random() * m--)

        // And swap it with the current element.
        t = array[m]
        array[m] = array[i]
        array[i] = t
    }

    return array
}

const getters = {
    // hmmmmmmmmmmmmmmmmmmmmmmmmmmwecantdoitthisway.
    // it's a decent way of duplicating and shuffling, but when we duplicate
    // via a getter, we then have no way of toggling faceup on any of the duplicate
    // cards becaue they don't actually exist in the state. We can still use this logic
    // to create the duplicates and shuffle, but it's going to need to happen at game
    // initiation to create the card object and inject them into the store's state. That
    // way when we flip a card we actually faceUp a card.
    cardsInPlay (state) {
        let deck = state.cards
            .map(card => {
                const dup = Object.assign({}, card)
                return [card, dup]
            })
            .reduce((carry, current) => carry.concat(current))
            .map((card, index) => {
                card.id = index
                return card
            })

        return shuffle(deck)
    }
}

const mutations = {
    flip (state, flippedCard) {
        let card = state.cards.filter(card => card.id === flippedCard.id)
        debugger
        card.faceUp = true
    }
}

const actions = {}

export default {state, getters, mutations, actions}
