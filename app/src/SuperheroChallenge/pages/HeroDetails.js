import { useState, useEffect } from 'react'
import {useHistory, useParams} from 'react-router-dom'
import { usePersistedContext } from 'react-persist-context'
import { searchHero } from '../services/formSubmits'
import { addHero, removeHero } from '../services/teamActions';
import Header from '../components/Header'
import * as Ricons from 'react-icons/io5'

import '../styles/heroDetails.scss'

const HeroDetails = () => {
    const { state, dispatch } = usePersistedContext()
    const [hero, setHero] = useState({})
    
    const history = useHistory()
    
    const goBack = () => {
        history.goBack()
    }

    const addHeroHandler = () =>{
        addHero(hero, state['team'], dispatch)
    }
    
    const removeHeroHandler = () => {
        removeHero(hero, state['team'], dispatch)
    }
    

    const { id } = useParams();
    const { heroes } = state.team
    useEffect(() => {
        dispatch({type: 'GET_HEROES'})
        const fetchHero = async () => {
            let name=''
            try {
                const result = await searchHero(name,id)
                setHero(result[0])
                dispatch({type: 'GET_HEROES_SUCCESS'})
            } catch (error) {
                console.log(error);
                dispatch({type: 'GET_HEROES_ERROR'})
            }
        }

        if(heroes.find(hero => hero.id === id)){
            let heroInState = heroes.find(hero => hero.id === id)
            return setHero(heroInState)
        }else{
            fetchHero()
        }
    }, [id, heroes, dispatch])
    

    const makeSlider = (id, stats) => {
        let arrayOfStats
        if(typeof stats === 'string'){
            arrayOfStats = stats.split(',')
        }else{
            arrayOfStats = stats
        }
        console.log(arrayOfStats);
        return (
            <div id={id} className="carousel carousel-dark slide w-75" data-bs-ride="carousel">
                <div className="carousel-inner w-100 h-100">
                    {
                        arrayOfStats.map((stat, index) => {
                            return (
                                <div key={stat} className={`carousel-item ${index === 0 ? 'active' : null } w-100`} data-bs-interval="10000" style={{height:'140%'}}>
                                    <div className="carousel-caption d-none d-md-block p-0 m-0">
                                        <h5 className='m-0 p-0 display-6' style={{fontSize: '1.9rem'}}>{stat}</h5>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target={'#'+id} data-bs-slide="prev" style={{visibility: arrayOfStats.length >= 2 ? 'visible' : 'hidden'}}>
                    <span className="carousel-control-prev-icon" aria-hidden="false"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target={'#'+id} data-bs-slide="next" style={{visibility: arrayOfStats.length >= 2 ? 'visible' : 'hidden'}}>
                    <span className="carousel-control-next-icon" aria-hidden="false"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        )
    }
    
    if(state.isFetching && !hero){
        return null
    }
    return (
        <div className="Superhero-Home-Container">
            <Header title={hero?.name || 'Hero Name'}/>
            <div className='py-2 w-100'>
                <div className='w-100 d-flex justify-content-center align-content-center'>
                    <div className="card w-75 h-100 border-warning" >
                    <div className="row g-0">
                        <div className="col-md-4">
                            <img src={hero?.image?.url || 'Hero Name'} className="img-fluid rounded h-100 w-100" alt="Hero avatar"/>
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <div className="card-text">
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
                                        <li className="list-group-item"> 
                                            <div className='d-flex-fluid justify-content-around align-items-center bg-light mt-2'>
                                                <button className='substract w-50 h-100 p-2 m-0' onClick={removeHeroHandler}><Ricons.IoRemoveCircleOutline size={25} className='text-light'/></button>
                                                <button className='add w-50 h-100 p-2 m-0' onClick={addHeroHandler}><Ricons.IoAddCircleOutline size={25} className='text-light'/></button>
                                            </div>
                                        </li>                               
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
            <div className='Superhero-Home-Footer d-flex display-4 text-center text-light'>
                <button className='bg-warning w-50 d-flex justify-content-around align-items-center flex-row-reverse' onClick={() => history.goBack()}>
                    <p>Back</p>
                    <Ricons.IoArrowBack size={23}/>
                </button>
                <button className='bg-danger w-50 d-flex justify-content-around align-items-center' onClick={() => history.push('/Alkemy_Superhero')}>
                    <p>Home</p>
                    <Ricons.IoHome size={23}/>
                </button>
            </div>
        </div>
    )
}

export default HeroDetails;