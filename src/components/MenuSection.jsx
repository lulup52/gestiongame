import React from 'react';
import "../sass/menuSection.css"

export default function MenuSection({holMenueSlect}) {

  const manageHolingProps = (propsSelected) => {
    let props = propsSelected.target
    holMenueSlect(props.id)
   document.querySelectorAll(".selected").forEach(e => e.classList.remove("selected"))
    // document.querySelectorAll(".selected").map(e => e.classList.remove("selected"))

    if(!props.classList.contains("selected")) {
      props.classList.add("selected")
    }

  }
    
  return (
        <div className="menuSection">
            
            <div className='menuOption' id='house' onClick={e => manageHolingProps(e)}></div>  
            <div className='menuOption' id='store' onClick={e => manageHolingProps(e)}></div>  
            <div className='menuOption' id='tree' onClick={e => manageHolingProps(e)}></div>  
            <div className='menuOption' id='industry' onClick={e => manageHolingProps(e)}></div>  
        </div>
      )
    
  
}



