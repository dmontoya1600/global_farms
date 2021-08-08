import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './HomePage.css'

function SlideShow() {
  const ownedShares = useSelector(state => state.session.ownedShares)
  const portfolioValue = useSelector(state => state.session.portfolio_value)
  const dispatch = useDispatch();
  const history = useHistory()
  let [currentSlideIndex, setCurrentSlideIndex] = useState(0)
  let [currentSlide, setCurrentSlide] = useState(ownedShares?.[currentSlideIndex])

  useEffect(() => {
      if(ownedShares){
          setCurrentSlide(ownedShares[currentSlideIndex])
      }
  }, [currentSlideIndex, ownedShares])

  function handleLeftArrow(){
      if(currentSlideIndex === 0){
          setCurrentSlideIndex(ownedShares.length - 1 )
      }else{
          setCurrentSlideIndex(currentSlideIndex - 1)
      }
  }

  function handleRightArrow(){
    if(currentSlideIndex === (ownedShares.length - 1)){
        setCurrentSlideIndex(0)
    }else{
        setCurrentSlideIndex(currentSlideIndex + 1)
    }

}


  return (
    <div className='slide_show_component'>
        <i className='fas fa-arrow-circle-left slide__arrow left__arrow' onClick={() => handleLeftArrow()}/>
        <i className='fas fa-arrow-circle-right slide__arrow right__arrow' onClick={() => handleRightArrow()}/>
        <img src={currentSlide?.image_url} className='slide__image'/>
        <div className='slide__overlay'/>
        <div className='slide__percentage'>{(currentSlide?.percentage_of_portfolio * 100).toFixed(2)}%</div>
        <div className='slide__val'>${currentSlide.usdAmount}</div>
        <div className='slide__name'>{currentSlide?.name}</div>
        <div className='slide__portfolio'>Portfolio Value: ${portfolioValue}</div>
    </div>
  );
}
export default SlideShow;
