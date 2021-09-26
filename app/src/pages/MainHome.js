import {Link} from 'react-router-dom'
import '../styles/MainHome.scss'

const MainHome = () => {
    //Add projects with objects
    const projects = [
        {
            title: 'Alkemy React Challenge - Superhero',
            url: '/Alkemy_Superhero/home'
        },
        {
            title: 'Puzzle React Challenge - Rick & Morty',
            url: 'https://rickandmortydatafinder.netlify.app/'
        },
    ]

    return (
        <div className="mainHome-Container d-flex justify-content-center align-items-center flex-column">
            <div className='white-decorator-top w-100 bg-light'></div>
            <div className='pb-5'>
                <h1 className='display-1'> Welcome </h1>
            </div>
            <div className='pb-4 w-75'>
                <p className='display-4 text-center'> In order to continue surfing this site, please select a Project.</p>
            </div>
            <div className='mainHome-Selector'>
                <div className="dropdown me-1">
                    <button className="btn btn-success btn-lg dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        Open this select menu
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        {
                            projects.map( project => <li><Link to={project.url} className='lead'>{project.title}</Link></li>)
                        }
                    </ul>
                </div>
            </div>
            <div className='white-decorator-bottom w-100 bg-light'></div>
        </div>
    )
}

export default MainHome;