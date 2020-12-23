import React, { useState, useEffect } from 'react'
import TinderCard from 'react-tinder-card'
import "./TinderCard.css"
import axios from 'axios'

function TinderCards() {
  const [people, setPeople] = useState([])
  const [lastDirection, setLastDirection] = useState("")

  useEffect(() => {
    axios.get('https://tinder-clone-backend-tes.herokuapp.com/tinder/cards').then(res => {
      console.log(res.data)
      setPeople(res.data)
    })
  },[])

  const swipe = (direction, nameToDelete) => {
    console.log("removing" + nameToDelete);
    // setLastDirection(direction)
  }

  const outFrame = (name) => {
    console.log(name + "left the screen")
  }


  return (
    <div className="tinderCard__cardContainer">
      {
        people.map(person => (
          <TinderCard
            className="swipe"
            key={person.name}
            preventSwipe={["up", "down"]}
            onSwipe={(dir) => swipe(dir, person.name)}
            onCardLeftScreen={() => outFrame(person.name)}
          >
            <div
              style={{ backgroundImage: `url(${person.imgUrl})` }}
              className="card"
            >
            <h3 className="card__h3">{person.name}</h3>
            </div>
          </TinderCard>
        ))
      }
    </div>
  )
}

export default TinderCards
