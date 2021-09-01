import * as Ricons from 'react-icons/gr'
import '../styles/cards.scss'
import {Link} from 'react-router-dom'
import { usePersistedContext } from 'react-persist-context'
import { addHero, removeHero } from '../services/teamActions';

const Card = ({hero}) => {
  const { state, dispatch } = usePersistedContext()

  const addHeroHandler = () =>{
    addHero(hero, state['team'], dispatch)
  }

  const removeHeroHandler = () => {
    removeHero(hero, state['team'], dispatch)
  }

  return (
    <div className={`card bg-${hero.biography.alignment === 'bad' ? 'danger' : 'warning'}`}>
      <img src={hero.image.url} className="img-fluid rounded-start" alt={hero.name} />
      <div className="card-body m-0 p-0">
        <div className="card-title mb-0 pb-0 d-flex flex-column justify-content-between">
          <h5 className="card-title lead mb-0 pb-0 mx-1 my-1">{hero.name}</h5>
          <Link className='btn-sm btn-dark w-100 card-detail-button lead' to={`/Alkemy_Superhero/hero-detail-${hero.id}`}>View hero stats</Link>
        </div>
        <div className='d-flex-fluid justify-content-around align-items-center bg-light'>
          <button className='substract w-50 h-100' onClick={removeHeroHandler}><Ricons.GrSubtractCircle size={25} className='text-light'/></button>
          <button className='add w-50 h-100' onClick={addHeroHandler}><Ricons.GrAddCircle size={25} className='text-light'/></button>
        </div>
      </div>
    </div>              
  )
}

export default Card;