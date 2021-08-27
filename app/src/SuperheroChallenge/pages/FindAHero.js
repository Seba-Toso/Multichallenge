
import {Link} from 'react-router-dom'

const FindAHero = () => {

    return (
        <div className="mainHome-Container d-flex justify-content-center align-items-center flex-column">
            <div className='pb-5'>
                <h1 className='display-1 '> Search a New Hero </h1>
            </div>
            <div className='pb-4'>
                <p className='display-6 lead'> What hero will you choose? </p>
            </div>
            <div className='mainHome-Selector'>
                <Link to='/Alkemy_Superhero' className="btn btn-outline-dark btn-sm">Back Home</Link>
            </div>
        </div>
    )
}

export default FindAHero;