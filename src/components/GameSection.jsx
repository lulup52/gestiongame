import React, {useEffect, useState} from 'react';
import '../sass/gameSection.css'

export default function GameSection({selectedProps, hintActivated}) {

    const [gameIsOn, setGameIsOn] = useState(false)
    const [boardMap, setBoardMap] = useState([])
    const [mapSize, setMapSize] = useState(10)
    const [mapReseted, setMapReseted] = useState(true)

    useEffect(() => {
      boardInit()
    },[])

    useEffect(() => {
      
    },[mapReseted])
    

/*--------------création de la map------------------*/
    const boardInit = () => {
      let newMap = []
      for (let x = 0; x<mapSize; x++ ) {
        let row = []
        for (let y = 0; y<mapSize; y++ ) {
          let tile = {coord : `${x}${y}`, behavior : "basicTile"}
          row.push(tile)
        }
        newMap.push(row)
      }
      setBoardMap(newMap)
    }


  /*---------------------debut de pqrtie-------------------------*/
  
  const StartTheGame = () => {
    setGameIsOn(!gameIsOn)
    const interval = setInterval(() => {
      update(gameIsOn);
    }, 1000);
    return () => clearInterval(interval);
  
     
  }
  /*---------------------gestion du hover en fonction de si la tuile est vide ou non-------------------------*/

const checkEmpty = (e) => {
  let targetBehavior = e.target.dataset.behavior
  if(targetBehavior  !== "basicTile") {
    /*verification de l'activation du bouton hint*/
    if (!hintActivated) {
      /*si le bouton hint n'est pas activé, la verif de la case se fait normalement*/
      e.target.classList.add("redTile")

    } else {
      /*si le bouton hint activé,la verif de la case ne se fait mais on affichera la porté de tous 
      les props du même type que la case survolée*/

      console.log(`ceci est un ${targetBehavior }`)
      console.log(document.getElementsByClassName(`boardTile ${targetBehavior}`))
    }
  }
}

const cleanHover = (e) => {
  e.target.classList.remove("redTile")
}

/*---------------------remplacer la tile par le props selectioné dans le menu-------------------------*/
const aplyProps = (e) => {
  let curentBehavior = e.target.dataset.behavior
  /*vérification qu'un props a bien été selectioné dans le menu*/
  if (selectedProps !== "") {
    /*vérification si la case est déja occupée*/
    if (curentBehavior !== "basicTile") {
      if (selectedProps === 'trash') {
        /*si la corbeille est selectionnée*/
        let coord= e.target.dataset.coord
        updateMap(coord)

      } else {
        /*si la tuile est déjà occupée*/

        e.target.classList.add("tiltedTile")
        setTimeout(() => {
          e.target.classList.remove("tiltedTile")
          
        }, 1000);
      }

        
      } else {
        /*si la tuile est déjà occupée*/

        let coord= e.target.dataset.coord
        updateMap(coord)
      }
    }
  }


/*---------------------mise a jour de la map------------------------*/
const updateMap = (newCoord) => {
  let newMap = boardMap
  newMap.forEach(row => {
    row.forEach(tile => {
      if(tile.coord === newCoord) {
        selectedProps !== 'trash' ? tile.behavior = selectedProps : tile.behavior = 'basicTile'
      }
    })
  }) 
  setBoardMap(newMap)
  setMapReseted(!mapReseted)
}

/*---------------------mise a jour constate de la partie------------------------*/

const update = (on) => {
  if(on) {
    console.log('im updated')
    update()
  }  else {
    console.log('im stoped')
  }
}


 


  return (
        <div className="gameScreen">
          {
          /* <button onClick={e => resetButton()} >reset</button> */
            <button onClick={e => StartTheGame() } >{gameIsOn ? 'pause' : "play"}</button> 
          }
          
          <div className="board">
            {boardMap !== undefined &&
              boardMap.map(row => 
                <div className='boardRow'>
                  {
                    row.map(tile =>
                      <div className={`boardTile ${tile.behavior}`} data-coord={tile.coord} data-behavior={tile.behavior} onClick={e => aplyProps(e)} onMouseEnter={e => checkEmpty(e)} onMouseLeave={e => cleanHover(e)}></div>
                    )
                  }
                </div>
              )
            }
          </div>
        </div>
      )
    
  
}



