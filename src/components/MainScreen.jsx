import React from 'react';
import GameSection from './GameSection';
import MenuSection from './MenuSection';

import '../sass/mainScreen.css'
import { useState } from 'react/cjs/react.development';

export default function MainScreen() {

  const [selectedProps, setSelectedProps] = useState('')
  const [hintActivated, setHintActivated] = useState(false)

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
            <MenuSection selectedProps={selectedProps} holMenueSlect={holMenueSlect} hintManager={hintManager}/>
            <GameSection selectedProps={selectedProps} hintActivated={hintActivated}/>
        </div>
      )
    
  
}



