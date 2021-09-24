import { useState } from 'react';
import {Link} from 'react-router-dom'
import * as Ricons from 'react-icons/io5'
import { connect } from 'react-redux'
import { addHeroAction, removeHeroAction } from '../services/teamActions';
import { useAlert } from 'react-alert'

import '../styles/cards.scss'
import jokerImagePlaceholder from '../assets/jokerCardImage.jpg'

const Card = ({hero, displayOneByOne, addHeroAction, removeHeroAction}) => {

  const [url, setUrl] = useState(hero.image.url || '')
  
  const alert = useAlert()
  const fireAlert = (type, message) => {
    alert.show(message, {
      timeout: 2000,
      type: type,
      containerStyle: {
        zIndex: 9999
      }
    })
  }

  const addHeroHandler = () => {
    addHeroAction(hero, fireAlert)
  }

  const removeHeroHandler = () => {
    removeHeroAction(hero, fireAlert)
  }
  
  
  return (
    <div className={`card bg-${hero.biography.alignment === 'bad' ? 'danger' : 'warning'}`} style={{borderRadius: '10px', margin: displayOneByOne? '0 auto' : 'inherit'}}>
      <img src={url} className="img-fluid" alt={url}  onError={(e) => setUrl(jokerImagePlaceholder)} />
      <div className="card-body m-0 p-0">
        <div className="card-title mb-0 pb-0 d-flex flex-column justify-content-between">
          <h5 className="card-title lead mb-0 pb-0 mx-1 my-1">{hero.name}</h5>
          <Link className='btn-sm btn-dark w-100 card-detail-button lead' to={`/Alkemy_Superhero/hero-detail-${hero.id}`}>View hero stats</Link>
        </div>
        <div className='d-flex-fluid justify-content-around align-items-center bg-light'>
          <button className='substract w-50 h-100' onClick={removeHeroHandler}><Ricons.IoRemoveCircleOutline size={25} className='text-light'/></button>
          <button className='add w-50 h-100' onClick={addHeroHandler}><Ricons.IoAddCircleOutline size={25} className='text-light'/></button>
        </div>
      </div>
    </div>              
  )
}

const mapStateToProps = (state) => {
	//console.log(state)
	const {isFetching} = state.heroReducer
	return {
			isFetching,
	}
}

export default connect(mapStateToProps, {addHeroAction, removeHeroAction})(Card)