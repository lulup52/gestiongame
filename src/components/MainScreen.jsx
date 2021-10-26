import React from 'react';
import GameSection from './GameSection';
import MenuSection from './MenuSection';

import '../sass/mainScreen.css'
import { useState } from 'react/cjs/react.development';

export default function MainScreen() {

  const [selectedProps, setSelectedProps] = useState('')

  const holMenueSlect = (option) => {
    if(selectedProps === option) {
    setSelectedProps("")

    } else {
      setSelectedProps(option)
    }
  }

  return (
        <div className="mainScreen">
            <MenuSection selectedProps={selectedProps} holMenueSlect={holMenueSlect}/>
            <GameSection selectedProps={selectedProps}/>
        </div>
      )
    
  
}



