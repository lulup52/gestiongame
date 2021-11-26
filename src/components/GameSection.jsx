import React, {useEffect, useState} from 'react';
import '../sass/gameSection.css'

export default function GameSection({setPropsToPlace, selectedProps, hintActivated, levelData, propsPlacementDetector, propsToPlace}) {

    const [gameIsOn, setGameIsOn] = useState(false)
    const [boardMap, setBoardMap] = useState([])
    const [mapSize, setMapSize] = useState(10)
    const [mapUpdater, setMapUpdater] = useState('')
    const [curentPropsHinted, setCurentPropsHinted] = useState('')
    
// peu etre a sup
    // const [houseHitbox, setHouseHitbox] = useState([])
    // const [treeHitbox, setTreeHitbox] = useState([])
    // const [storeHitbox, setStoreHitbox] = useState([])
    // const [industryHitbox, setIndustryHitbox] = useState([])
    
    const [propsHintHitbox, setPropsHintHitbox] = useState([])


    useEffect(() => {
      boardInit()
    },[])

    useEffect(() => {
    },[mapUpdater])
    

/*--------------création de la map------------------*/
    const boardInit = () => {
      let newMap = []
      for (let x = 0; x<mapSize; x++ ) {
        let row = []
        for (let y = 0; y<mapSize; y++ ) {
          if(levelData.map.includes(`${x}${y}`)) {
            let tile = {coord : `${x}${y}`, behavior : "voidTile"}
            row.push(tile)
          } else {
            let tile = {coord : `${x}${y}`, behavior : "basicTile"}
            row.push(tile)
          }
          
        }
        newMap.push(row)
      }
      setBoardMap(newMap)
    }


  /*---------------------debut de partie (fonction en atente pour le moment)-------------------------*/
  
  const StartTheGame = () => {
    setGameIsOn(!gameIsOn)
    const interval = setInterval(() => {
      update(gameIsOn);
    }, 1000);
    return () => clearInterval(interval);
  
     
  }
  /*---------------------gestion du hover en fonction de si la tuile est vide ou non-------------------------*/

const hoverCheck = (e) => {
  setMapUpdater('')

  let targetBehavior = e.target.dataset.behavior
  if(targetBehavior  !== "basicTile") {
    /*verification de l'activation du bouton hint*/
    if (!hintActivated) {
      
      /*si le bouton hint n'est pas activé, la verif de la case se fait normalement*/
      e.target.classList.add("redTile")

    } else {

        /*si le bouton hint activé,la verif de la case ne se fait pas mais on affichera la porté de tous 
        les props du même type que la case survolée qu'on stockera dans un tableau */
  
        let propsListe = document.getElementsByClassName(`boardTile ${targetBehavior}`)
        let allCaseToCheck = []
        for(let i = 0; i < propsListe.length; i++) {
  
          allCaseToCheck.push(propsListe[i].dataset.coord)
  
        }
        /*on récupère la liste de toutes les cases valides adjacentes aux cases insérées dans allCaseToCheck*/
        let aroundCases = checkAroundCase(allCaseToCheck)
        
  
  
        /*on aplique la classe correspondant à la portée du props selectioné*/      
        let tileToHilight = []
        
        aroundCases.forEach(tile => {
          let tileToUpdate = document.getElementsByName(tile)[0]
          
          /*la porté n'est mise a jour que si la case ne contient pas de props*/      
          if(tileToUpdate.dataset.behavior !== "house"&&
              tileToUpdate.dataset.behavior !== "store" &&
              tileToUpdate.dataset.behavior !== "tree" &&
              tileToUpdate.dataset.behavior !== "industry"
          ) {
              tileToHilight.push(tileToUpdate.dataset.coord)
          }
          
        })
        setCurentPropsHinted(targetBehavior)
        setPropsHintHitbox(tileToHilight)
       
        // updateMap(tileToHilight, "hint", targetBehavior)

    }
  }

}

const checkAroundCase = (propCasesCoord) => {
  let casesCoordListes = []
  /*on parcours la liste de toutes les cases contenant le même type que celui survolé grace a hint*/
  propCasesCoord.forEach(propCase => {
    let caseToCheck = parseInt(propCase)
    let caseHautGauche = ""
    let caseHaut = ""
    let caseHautDroit = ""
    let caseGauche = ""
    let caseDroit = ""
    let caseBasGauche = ""
    let caseBas = ""
    let caseBasDroit = ""

    /*on vérifie, par raport aux coordonées de la case si ses cases adjacentes ne dépacent pas de la grille */
    if(caseToCheck % 10 !== 0) {
      caseGauche = caseToCheck - 1
    }
    if(propCase[1] !== "9") {
      caseDroit = caseToCheck + 1
    }
    if(caseToCheck > 9) {
      caseHaut = caseToCheck - 10
      if(caseToCheck % 10 !== 0) {
        caseHautGauche = caseToCheck - 11
      }
      if(propCase[1] !== "9") {
        caseHautDroit = caseToCheck - 9
      }
    }
    if(caseToCheck < 90) {
      caseBas = caseToCheck + 10
      if(caseToCheck % 10 !== 0) {
        caseBasGauche = caseToCheck + 9

      }
      if(propCase[1] !== "9") {
        caseBasDroit = caseToCheck + 11
      }
    }
    /*création du tableau contenant toutes les cases potentiellement autour de la case cible, transformée en
    string pour que les coordonnées commencant par 0 (ex : 01, 02 ...) ne voient pas le 0 suprimé par la suite */
    let aroundArray = [caseHautGauche.toString(),caseHaut.toString(),caseHautDroit.toString(),caseGauche.toString(), caseDroit.toString(), caseBasGauche.toString(), caseBas.toString(), caseBasDroit.toString()]
    casesCoordListes.push(...aroundArray)

    /*on retire les doublons */
    casesCoordListes = casesCoordListes.map(coord=> {
      /*on rajoute le 0 devant les coordonées contant un chifre unique pour pour obtenir des données valdes (ex: 01,02 ...)  */
      
      if(coord.length === 1 ) {
        return `0${coord}`
      }else {
        return coord
      }
    })
    casesCoordListes = [...new Set(casesCoordListes)].sort()
    if (casesCoordListes[0] === "") {
      casesCoordListes.splice(0, 1);
    }
  })

  return casesCoordListes
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
        updateMap(coord, 'trash')

      } else {
        /*si la tuile est déjà occupée*/

        e.target.classList.add("tiltedTile")
        setTimeout(() => {
          e.target.classList.remove("tiltedTile")
          
        }, 1000);
      }

        
    } else {
      /*on ne déclanche cette étape que si on a sélectioné un props*/
      if (selectedProps !== "trash" && selectedProps !== "hint" ) {
          /*si la tuile est libre, on vérifie que le props sélectioné est encore disponible dans la réserve*/
          if (
            selectedProps === "house" &&  propsToPlace.house !==0 ||
            selectedProps === "store" &&  propsToPlace.store !==0 ||
            selectedProps === "industry" &&  propsToPlace.industry !==0 ||
            selectedProps === "tree" &&  propsToPlace.tree !==0 
          ){
          /* ----- si il reste encore des props du type séléctioné à placer --------*/
            let coord= e.target.dataset.coord
            console.log(`je build` )
            updateMap(coord, "build")
          } else {
            /* ----- si le stock de props sélectioné est a 0 le positionement du props est imposible, 
            <A FAIRE>une animation se joue dans le menu pour prévenir le joueur<A FAIRE>*/
            console.log(`a pu ${selectedProps}`)
            document.querySelector(`.${selectedProps}Menu`).classList.add("tiltedTile")
            setTimeout(() => {
              document.querySelector(`.${selectedProps}Menu`).classList.remove("tiltedTile")
              
            }, 1000);
            
          }
        }
      }
    }
  }


/*---------------------mise a jour de la map------------------------*/
const updateMap = (newCoord, updater, newClass) => {
  setMapUpdater("")
  let newMap = boardMap

  newMap.forEach(row => {
    row.forEach(tile => {
      // if(updater === "hint") {
      //   newCoord.forEach(tileToHilight => {
      //     if(tileToHilight === tile.coord) {
      //     }     
      //   })
      //   } else 
        if(tile.coord === newCoord) {
          if (  selectedProps !== "trash") {
            propsPlacementDetector(selectedProps)

           tile.behavior = selectedProps
          } else {
            /*On va vérifier quel props on suprime du tableau et on incrémente dans le menu, le props corespondant*/
            switch (tile.behavior) {
              case "house" :
                setPropsToPlace(
                  {house : propsToPlace.house + 1 ,
                  store : propsToPlace.store,
                  industry : propsToPlace.industry,
                  tree : propsToPlace.tree}
                  )
              break;
              case "store" :
                setPropsToPlace(
                  {house : propsToPlace.house,
                  store : propsToPlace.store+1,
                  industry : propsToPlace.industry,
                  tree : propsToPlace.tree}
                  )
              break;
              case "industry" :
                setPropsToPlace(
                  {house : propsToPlace.house,
                  store : propsToPlace.store,
                  industry : propsToPlace.industry+1,
                  tree : propsToPlace.tree}
                  )
              break;
              case "tree" :
                setPropsToPlace(
                  {house : propsToPlace.house,
                  store : propsToPlace.store,
                  industry : propsToPlace.industry,
                  tree : propsToPlace.tree+1}
                  )
              break;
            }

            tile.behavior = 'basicTile'
          }
      }
    })
  }) 
  setBoardMap(newMap)
  setMapUpdater(updater)

}

/*---------------------mise a jour constate de la partie------------------------*/

const update = (on) => {
  if(on) {
    update()
  }  else {
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
                      propsHintHitbox.length !==0 && propsHintHitbox.includes(tile.coord)?
                      /* on vérifie est ce que la case fait parti de la range d'un props survolé ou si il s'agit d'une tuile normale*/ 
                      <div className={`boardTile ${curentPropsHinted}Range`} name={tile.coord} data-coord={tile.coord} data-behavior={tile.behavior} onClick={e => aplyProps(e)} onMouseEnter={e => hoverCheck(e)} onMouseLeave={e => cleanHover(e)}></div>
                      :
                      <div className={`boardTile ${tile.behavior}`} name={tile.coord} data-coord={tile.coord} data-behavior={tile.behavior} onClick={e => aplyProps(e)} onMouseEnter={e => hoverCheck(e)} onMouseLeave={e => cleanHover(e)}></div>
                      )
                  }
                </div>
              )
            }
          </div>
        </div>
      )
    
  
}



