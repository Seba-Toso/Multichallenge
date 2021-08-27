
import {Link} from 'react-router-dom'

const Home = () => {
    return (
        <div className="mainHome-Container d-flex justify-content-center align-items-center flex-column">
            <div className='pb-5'>
                <h1 className='display-1 '> Welcome Hero </h1>
            </div>
            <div className='pb-4'>
                <p className='display-6 lead'> This are your cards </p>
            </div>
            <div className='mainHome-Selector'>
                <Link to='/Alkemy_Superhero/find-a-hero' className="btn btn-outline-dark btn-sm">Search for heroes</Link>
            </div>
        </div>
    )
}

export default Home;