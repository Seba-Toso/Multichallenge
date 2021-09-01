import '../styles/MainHome.scss'
import {Link} from 'react-router-dom'

const MainHome = () => {
    return (
        <div className="mainHome-Container d-flex justify-content-center align-items-center flex-column">
            <div className='pb-5'>
                <h1 className='display-1 '> Welcome </h1>
            </div>
            <div className='pb-4'>
                <p className='display-6 lead'> In order to continue surfing this site, please select a Project.</p>
            </div>
            <div className='mainHome-Selector'>
                <div className="dropdown">
                    <button className="btn btn-success btn-lg dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        Open this select menu
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li><Link to='/Alkemy_Superhero' className='lead'>Alkemy React Challenge - Superhero</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default MainHome;