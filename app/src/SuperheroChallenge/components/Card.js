import { motion } from "framer-motion"
import * as Ricons from 'react-icons/gr'
import '../styles/cards.scss'

const Card = ({name, image}) => {
  return (
    <div className="card" >
      <div className="row g-0">
        <div className="col-md-8">
          <img src={image} className="img-fluid rounded-start " alt={name} />
        </div>
        <div className="col-md-4">
          <div className="card-title lead mb-0 pb-0 h-50">
          <h5 className="card-title lead mb-0 pb-0 h-75">{name}</h5>
          <button className='btn-sm btn-outline-warning w-100 h-25'>Details</button>
          </div>
          <div className='d-flex-fluid flex-column justify-content-around align-items-center h-50'>
            <button className='substract w-100 h-50'><Ricons.GrSubtractCircle size={25}/></button>
            <button className='add w-100 h-50'><Ricons.GrAddCircle size={25}/></button>
          </div>
        </div>
      </div>
    </div>              
  )
}

export default Card;