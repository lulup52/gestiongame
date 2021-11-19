import React, {useEffect} from 'react';
import GameSection from './GameSection';
import MenuSection from './MenuSection';

import '../sass/mainScreen.css'
import { useState } from 'react/cjs/react.development';

import Levels from '../data/levels.json'
export default function MainScreen() {
/* ---------- on charge le lvl 1 par défaut ----------------- */
  const [levelData, /*setLevelData*/] = useState(Levels[0])
  const [refreshMenu, setRefreshMenu] = useState(true)
  const [propsToDisable, setPropsToDisable] = useState({
    house : false,
    store : false,
    industry : false,
    tree : false
    })
  const [propsToPlace, setPropsToPlace] = useState("")

  useEffect(() => {
    setPropsToPlace({
      house : levelData.props.house,
      store : levelData.props.store,
      industry : levelData.props.industry,
      tree : levelData.props.tree
      }
    )
    },[])

  useEffect(() => {
    console.log("je met a jour le menu")
  },[propsToPlace])


  const [selectedProps, setSelectedProps] = useState('')
  const [hintActivated, setHintActivated] = useState(false)

 
  const disablePlacement = (state) => {
  }

  /*------gérer le stock le décompte des props a placer --------*/
  const propsPlacementDetector =(props) => {
    console.log(props)
    switch(props) {
      case "house":
        setPropsToPlace({
          house : propsToPlace.house - 1,
          store : propsToPlace.store,
          industry : propsToPlace.industry,
          tree : propsToPlace.tree
          })
      break;
      case "store":
        setPropsToPlace({
          house : propsToPlace.house ,
          store : propsToPlace.store - 1,
          industry : propsToPlace.industry,
          tree : propsToPlace.tree
          })
      break;
      case "industry":
        setPropsToPlace({
          house : propsToPlace.house,
          store : propsToPlace.store,
          industry : propsToPlace.industry - 1,
          tree : propsToPlace.tree
          })
      break;
      case "tree":
        setPropsToPlace({
          house : propsToPlace.house ,
          store : propsToPlace.store,
          industry : propsToPlace.industry,
          tree : propsToPlace.tree - 1
          })
      break;
    }
    
  }

  const holMenueSlect = (option) => {
    if(selectedProps === option) {
    setSelectedProps("")

    } else {
      setSelectedProps(option)
    }
  }

  const hintManager = (hintState) => {
    hintState === "clearHint" ? setHintActivated(false) : setHintActivated(!hintActivated)
  }

  const lvlSelector = () => {
    
  }

  return (
        <div className="mainScreen">
            <MenuSection disablePlacement={disablePlacement} propsToPlace={propsToPlace } selectedProps={selectedProps} holMenueSlect={holMenueSlect} hintManager={hintManager} levelData={levelData}/>
            <GameSection setPropsToPlace={setPropsToPlace} propsToPlace={propsToPlace} selectedProps={selectedProps} hintActivated={hintActivated} levelData={levelData} propsPlacementDetector={propsPlacementDetector}/>
        </div>
      )
    
  
}



