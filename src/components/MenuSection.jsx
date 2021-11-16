import React, { useEffect, useState } from 'react';
import "../sass/menuSection.css"

export default function MenuSection({holMenueSlect, hintManager, levelData, propsPlaced}) {


  const [houseToPlace, setHouseToPlace] = useState(levelData.props.house)
  const [storeToPlace, setStoreToPlace] = useState(levelData.props.store)
  const [industryToPlace, setIndustryToPlace] = useState(levelData.props.industry)
  const [treeToPlace, setTreeToPlace] = useState(levelData.props.tree)
  const [menuUpdator, setMenuUpdator] = useState(true)

   
   useEffect(() => {
    setMenuUpdator(!menuUpdator)
    setHouseToPlace(levelData.props.house - propsPlaced.house)
    setStoreToPlace(levelData.props.store - propsPlaced.store)
    setIndustryToPlace(levelData.props.industry - propsPlaced.industry)
    setTreeToPlace(levelData.props.tree - propsPlaced.tree)
  },[propsPlaced])

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
    
  /*--------------- gérer le décompte des ééments a placer par lvl ------------------ */

  
  return (
    <>
      <div className="menuSection">
          <div>
            <div className='menuOption trash' id='trash' onClick={e => manageHolingProps(e)}></div>  
          </div>
          <div className='propsAndCounter'>
            <div className='menuOption house' id='house' onClick={e => manageHolingProps(e)}></div>  
            <p>{houseToPlace}</p>
          </div>
          <div className='propsAndCounter'>
            <div className='menuOption store' id='store' onClick={e => manageHolingProps(e)}></div>  
            <p>{storeToPlace}</p>
          </div>
          <div className='propsAndCounter'>
            <div className='menuOption tree' id='tree' onClick={e => manageHolingProps(e)}></div>  
            <p>{treeToPlace}</p>
          </div>  
          <div className='propsAndCounter'>
            <div className='menuOption industry' id='industry' onClick={e => manageHolingProps(e)}></div>  
            <p>{industryToPlace}</p>
          </div>
          <div>
            <div className='menuOption hint' id='hint' onClick={e => manageHint(e)}></div>  
          </div>
      </div>

    </>
      )
    
  
}



