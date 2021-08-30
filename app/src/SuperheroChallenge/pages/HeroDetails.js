import {Link, useHistory, useParams} from 'react-router-dom'
import { usePersistedContext } from 'react-persist-context'
import { searchHero } from '../services/formSubmits'
import { useState, useEffect } from 'react'

const HeroDetails = () => {
    const { state, dispatch } = usePersistedContext()
    const [hero, setHero] = useState({})
    
    const history = useHistory()
    
    const goBack = () => {
        history.goBack()
    }

    const { id } = useParams();
    useEffect(() => {
        const fetchHero = async () => {
            let name=''
            try {
                const result = await searchHero(name,id)
                setHero(result[0])
            } catch (error) {
                console.log(error);
            }
        }

        if(state.team.heroes.find(hero => hero.id === id)){
            let heroInState = state.team.heroes.find(hero => hero.id === id)
            return setHero(heroInState)
        }else{
            fetchHero()
        }
    }, [id, state])
    

    const makeSlider = (id, stats) => {
        let arrayOfStats
        if(typeof stats === 'string'){
            arrayOfStats = stats.split(',')
        }else{
            arrayOfStats = stats
        }
        console.log(arrayOfStats);
        return (
            <div id={id} class="carousel carousel-dark slide w-75" data-bs-ride="carousel">
                <div class="carousel-inner w-100 h-100">
                    {
                        arrayOfStats.map((stat, index) => {
                            return (
                            
                                <div class={`carousel-item ${index === 0 ? 'active' : null } w-100`} data-bs-interval="10000" style={{height:'140%'}}>
                                    <div class="carousel-caption d-none d-md-block p-0 m-0">
                                        <h5 className='m-0 p-0 display-6' style={{fontSize: '1.9rem'}}>{stat}</h5>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                    <button class="carousel-control-prev" type="button" data-bs-target={'#'+id} data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target={'#'+id} data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
            </div>
        )
    }
    
    if(!hero){
        return null
    }
    return (
        <div className="mainHome-Container d-flex justify-content-center align-items-center flex-column">
            <div className='pb-5 h-25'>
                <h1 className='display-1 '> Hero Details </h1>
            </div>
            <div className='pb-4 w-75'>
                <div className="card w-100 h-100 border-warning" >
                    <div className="row g-0">
                        <div className="col-md-4">
                            <img src={hero?.image?.url || 'Hero Name'} className="img-fluid rounded-start h-100 w-100" alt="..."/>
                        </div>
                        <div className="col-md-8">
                            <div class="card-header bg-warning">
                                <h5 className="card-title display-2">{hero?.name || 'Hero Name'}</h5>
                            </div>
                            <div className="card-body">
                                <p className="card-text">
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item d-flex justify-content-between">
                                            <h5 className='d-inline display-6 m-0 p-0'>Nombre: </h5>
                                            <p className='d-inline display-6 m-0 p-0'>{hero?.biography?.['full-name']}</p>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between">
                                            <h5 className='d-inline display-6 m-0 p-0'>Alias: </h5>
                                            {hero?.biography?.aliases.length > 1 ? makeSlider('alias', hero?.biography?.aliases) : hero?.biography?.aliases}
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between">
                                            <h5 className='d-inline display-6 m-0 p-0'>Peso: </h5>
                                            {hero?.appearance?.weight.length > 1 ? makeSlider('peso', hero?.appearance?.weight) : hero?.appearance?.weight}
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between">
                                            <h5 className='d-inline display-6 m-0 p-0'>Altura: </h5>
                                            {hero?.appearance?.height.length > 1 ? makeSlider('altura', hero?.appearance?.height) : hero?.appearance?.height}
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between">
                                            <h5 className='d-inline display-6 m-0 p-0'>Ojos: </h5>
                                            <p className='d-inline display-6 m-0 p-0'>{hero?.appearance?.['eye-color']}</p>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between">
                                            <h5 className='d-inline display-6 m-0 p-0'>Cabello: </h5>
                                            <p className='d-inline display-6 m-0 p-0'>{hero?.appearance?.['hair-color']}</p>
                                        </li>  
                                        <li className="list-group-item d-flex justify-content-between">
                                            <h5 className='d-inline display-6 m-0 p-0'>Trabaja en: </h5>
                                            {hero?.work?.base.length > 1 ? makeSlider('trabajo', hero?.work?.base) : hero?.work?.base}
                                        </li>                               
                                    </ul>
                                </p>
                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='mainHome-Selector h-25'>
                <Link to='/Alkemy_Superhero' className="btn btn-outline-dark btn-sm">Home</Link>
                <button onClick={goBack}>Back</button>
            </div>
        </div>
    )
}

export default HeroDetails;