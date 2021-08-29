import { useReducer } from 'react';
import { initialState, HeroReducer } from '../services/state';
import {Link, useHistory} from 'react-router-dom'


const HeroDetails = () => {
    const [state, dispatch] = useReducer(HeroReducer, initialState);
    const history = useHistory()

    const goBack = () => {
      history.goBack()
    }

    return (
        <div className="mainHome-Container d-flex justify-content-center align-items-center flex-column">
            <div className='pb-5'>
                <h1 className='display-1 '> Hero Details </h1>
            </div>
            <div className='pb-4'>
                <p className='display-6 lead'> Your Hero is really Strong </p>
            </div>
            <div className='mainHome-Selector'>
                <Link to='/Alkemy_Superhero' className="btn btn-outline-dark btn-sm">Home</Link>
                <button onClick={goBack}>Back</button>
            </div>
        </div>
    )
}

export default HeroDetails;