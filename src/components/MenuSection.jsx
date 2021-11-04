import React, { useState } from 'react';
import "../sass/menuSection.css"

export default function MenuSection({holMenueSlect, hintManager}) {

  const manageHint = (e) => {
    hintManager()
    manageHolingProps(e)
  }
  

  const manageHolingProps = (propsSelected) => {
    let props = propsSelected.target

    if (props.classList.contains("selected")) {
      document.querySelectorAll(".selected").forEach(e => e.classList.remove("selected"))
      
    } else {
      document.querySelectorAll(".selected").forEach(e => e.classList.remove("selected"))
      props.classList.add("selected")

    }
    holMenueSlect(props.id)
    props.id !== 'hint' && hintManager("clearHint")
  }
    
  return (
    <>
      <div className="menuSection">
          <div>
            <div className='menuOption trash' id='trash' onClick={e => manageHolingProps(e)}></div>  
          </div>
          <div className='propsAndCounter'>
            <div className='menuOption house' id='house' onClick={e => manageHolingProps(e)}></div>  
            <p>0</p>
          </div>
          <div className='propsAndCounter'>
            <div className='menuOption store' id='store' onClick={e => manageHolingProps(e)}></div>  
            <p>0</p>
          </div>
          <div className='propsAndCounter'>
            <div className='menuOption tree' id='tree' onClick={e => manageHolingProps(e)}></div>  
            <p>0</p>
          </div>  
          <div className='propsAndCounter'>
            <div className='menuOption industry' id='industry' onClick={e => manageHolingProps(e)}></div>  
            <p>0</p>
          </div>
          <div>
            <div className='menuOption hint' id='hint' onClick={e => manageHint(e)}></div>  
          </div>
      </div>

    </>
      )
    
  
}



