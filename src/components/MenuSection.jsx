import React from 'react';
import "../sass/menuSection.css"

export default function MenuSection({holMenueSlect}) {

  const manageHolingProps = (propsSelected) => {
    let props = propsSelected.target

    if (props.classList.contains("selected")) {
      document.querySelectorAll(".selected").forEach(e => e.classList.remove("selected"))
      
    } else {
      document.querySelectorAll(".selected").forEach(e => e.classList.remove("selected"))
      props.classList.add("selected")

    }
    holMenueSlect(props.id)




  }
    
  return (
        <div className="menuSection">
            
            <button className='menuOption' id='trash' onClick={e => manageHolingProps(e)}></button>  
            <div className='menuOption' id='house' onClick={e => manageHolingProps(e)}></div>  
            <div className='menuOption' id='store' onClick={e => manageHolingProps(e)}></div>  
            <div className='menuOption' id='tree' onClick={e => manageHolingProps(e)}></div>  
            <div className='menuOption' id='industry' onClick={e => manageHolingProps(e)}></div>  
        </div>
      )
    
  
}



