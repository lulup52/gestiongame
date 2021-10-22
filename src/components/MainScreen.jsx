import React from 'react';
import GameSection from './GameSection';
import MenuSection from './MenuSection';

import '../sass/mainScreen.css'
import { useState } from 'react/cjs/react.development';

export default function MainScreen() {

  const [selectedProps, setSelectedProps] = useState('')

  const holMenueSlect = (option) => {
    setSelectedProps(option)
  }

  
    
  return (
        <div className="mainScreen">
            <MenuSection holMenueSlect={holMenueSlect}/>
            <GameSection selectedProps={selectedProps}/>
        </div>
      )
    
  
}



