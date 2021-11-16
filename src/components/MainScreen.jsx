import React, {useEffect} from 'react';
import GameSection from './GameSection';
import MenuSection from './MenuSection';

import '../sass/mainScreen.css'
import { useState } from 'react/cjs/react.development';

import Levels from '../data/levels.json'
export default function MainScreen() {
/* ---------- on charge le lvl 1 par défaut ----------------- */
  const [levelData, /*setLevelData*/] = useState(Levels[1])


  const [propsPlaced, setPropsPlaced] = useState({
    house : 0,
    store : 0,
    industry : 0,
    tree : 0
  })

  const [selectedProps, setSelectedProps] = useState('')
  const [hintActivated, setHintActivated] = useState(false)

 


  const propsPlacementDetector =(props) => {
    console.log(selectedProps)
    switch(props) {
      case 'house' :
        setPropsPlaced({
          house : propsPlaced.house + 1,
          store : propsPlaced.store,
          industry : propsPlaced.industry,
          tree : propsPlaced.tree
        })    
        break
      case 'store' :
        setPropsPlaced({
          house : propsPlaced.house,
          store : propsPlaced.store + 1,
          industry : propsPlaced.industry,
          tree : propsPlaced.tree
        })    
        break
      case 'industry' :
        setPropsPlaced({
          house : propsPlaced.house,
          store : propsPlaced.store,
          industry : propsPlaced.industry + 1,
          tree : propsPlaced.tree
        })    
        break
      case 'tree' :
        setPropsPlaced({
          house : propsPlaced.house,
          store : propsPlaced.store,
          industry : propsPlaced.industry,
          tree : propsPlaced.tree + 1
        })    
        break
        
        
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
            <MenuSection propsPlaced={propsPlaced} selectedProps={selectedProps} holMenueSlect={holMenueSlect} hintManager={hintManager} levelData={levelData}/>
            <GameSection selectedProps={selectedProps} hintActivated={hintActivated} levelData={levelData} propsPlacementDetector={propsPlacementDetector}/>
        </div>
      )
    
  
}



