import React from 'react';
import GameSection from './GameSection';
import MenuSection from './MenuSection';

import '../sass/mainScreen.css'
import { useState } from 'react/cjs/react.development';

import Levels from '../data/levels.json'
export default function MainScreen() {
  const [levelData, /*setLevelData*/] = useState(Levels[0])
  const [selectedProps, setSelectedProps] = useState('')
  const [hintActivated, setHintActivated] = useState(false)

  console.log(levelData)
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


  return (
        <div className="mainScreen">
            <MenuSection selectedProps={selectedProps} holMenueSlect={holMenueSlect} hintManager={hintManager} levelData={levelData}/>
            <GameSection selectedProps={selectedProps} hintActivated={hintActivated} levelData={levelData}/>
        </div>
      )
    
  
}



