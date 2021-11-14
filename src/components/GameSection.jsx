import React, {useEffect, useState} from 'react';
import '../sass/gameSection.css'

export default function GameSection({selectedProps, hintActivated}) {

    const [mapSeed, setMapSeed] = useState(['00','01','02','03','04','05','06','07','08','09', '10'])
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
      console.log("map is updated")
    },[mapUpdater])
    

/*--------------création de la map------------------*/
    const boardInit = () => {
      let newMap = []
      for (let x = 0; x<mapSize; x++ ) {
        let row = []
        for (let y = 0; y<mapSize; y++ ) {
          if(mapSeed.includes(`${x}${y}`)) {
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


  /*---------------------debut de pqrtie-------------------------*/
  
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
  
        console.log(`ceci est un ${targetBehavior }`)
        let propsListe = document.getElementsByClassName(`boardTile ${targetBehavior}`)
        let allCaseToCheck = []
        for(let i = 0; i < propsListe.length; i++) {
  
          allCaseToCheck.push(propsListe[i].dataset.coord)
  
        }
        /*on récupère la liste de toutes les cases valides adjacentes aux cases insérées dans allCaseToCheck*/
        let aroundCases = checkAroundCase(allCaseToCheck)
        console.log(aroundCases)
        
  
  
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
    // console.log(aroundArray)
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
        /*si la tuile est libre*/

        let coord= e.target.dataset.coord
        updateMap(coord, "build")
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
      //       console.log('test')
      //     }     
      //   })
      //   } else 
        if(tile.coord === newCoord) {
        selectedProps !== 'trash' ? tile.behavior = selectedProps : tile.behavior = 'basicTile'
      }
    })
  }) 
  setBoardMap(newMap)
  setMapUpdater(updater)
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



