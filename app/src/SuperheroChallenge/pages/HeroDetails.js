import { useState, useEffect } from 'react'
import {useHistory, useParams} from 'react-router-dom'
import { connect } from 'react-redux'
import { searchHero } from '../services/formSubmits'
import { addHeroAction, removeHeroAction } from '../services/teamActions';
import { useAlert } from 'react-alert'
import Header from '../components/Header'
import * as Ricons from 'react-icons/io5'

import '../styles/heroDetails.scss'

const HeroDetails = ({team, isFetching, dispatch}) => {
    const [hero, setHero] = useState({})
    
    const history = useHistory()
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

    const addHeroHandler = () =>{
        addHeroAction(hero, team, dispatch, fireAlert)
    }
    
    const removeHeroHandler = () => {
        removeHeroAction(hero, team, dispatch, fireAlert)
    }
    
    const { id } = useParams();
    const { heroes } = team
    useEffect(() => {
        dispatch({type: 'GET_HEROES'})
        const fetchHero = async () => {
            let name=''
            try {
                const result = await searchHero(name,id)
                dispatch({type: 'GET_HEROES_SUCCESS'})
                setHero(result[0])
            } catch (error) {
                dispatch({type: 'GET_HEROES_ERROR'})
                console.log(error);
            } finally{
                dispatch({type: 'CLEAR_FETCHING'})
            }
        }

        if(heroes.find(hero => hero.id === id)){
            let heroInState = heroes.find(hero => hero.id === id)
            dispatch({type: 'CLEAR_FETCHING'})
            return setHero(heroInState)
        }else{
            return fetchHero()
        }
    }, [id, heroes, dispatch])
    

    const makeSlider = (id, stats) => {
        let arrayOfStats
        if(typeof stats === 'string'){
            arrayOfStats = stats.split(',')
        }else{
            arrayOfStats = stats
        }
        return (
            arrayOfStats.map((stat, index) => {
                if(id === 'alias' || id === 'works'){
                    if(index === 0){
                        return (
                            <div key={stat} className='text-center'>
                                <p className='d-inline display-6 m-0 p-0'>{stat}</p>
                            </div>
                        )
                    } 
                    return null
                }
                return (
                    <div key={stat} className='text-center'>
                        <p className='d-inline display-6 m-0 p-0'>{stat}</p>
                    </div>
                )
            })
        )
    }
    
    if(isFetching && !hero){
        return null
    }
    return (
        <div className="Superhero-Home-Container">
            <Header 
                title={hero?.name || 'Hero Name'} 
                buttonAction={() => history.goBack()} 
                icon={<Ricons.IoArrowBack size={32}/>} 
            />
            <div className='py-2 w-100 my-5'>
                <div className='w-100 d-flex justify-content-center align-content-center'>
                    <div className="card w-75 h-100 border-warning Superhero-details" >
                    <div className="row g-0">
                        <div className="col-md-4">
                            <img src={hero?.image?.url || 'Hero Name'} className="img-fluid rounded" alt="Hero avatar"/>
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <div className="card-text">
                                    <ul className="list-group list-group-flush ">
                                        <li className="list-group-item d-flex justify-content-between">
                                            <h5 className='d-inline display-6 m-0 p-0'>Nombre: </h5>
                                            <p className='d-inline display-6 m-0 p-0'>{hero?.biography?.['full-name']}</p>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between">
                                            <h5 className='d-inline display-6 m-0 p-0'>Alias: </h5>
                                            {hero?.biography?.aliases.length > 1 ? makeSlider('alias', hero?.biography?.aliases) : hero?.biography?.aliases}
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between">
                                            <h5 className='d-inline display-6 m-0 p-0'>Weight: </h5>
                                            {hero?.appearance?.weight.length > 1 ? makeSlider('weight', hero?.appearance?.weight) : hero?.appearance?.weight}
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between">
                                            <h5 className='d-inline display-6 m-0 p-0'>Height: </h5>
                                            {hero?.appearance?.height.length > 1 ? makeSlider('height', hero?.appearance?.height) : hero?.appearance?.height}
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between">
                                            <h5 className='d-inline display-6 m-0 p-0'>Eye Color: </h5>
                                            <p className='d-inline display-6 m-0 p-0'>{hero?.appearance?.['eye-color']}</p>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between">
                                            <h5 className='d-inline display-6 m-0 p-0'>Hair Color: </h5>
                                            <p className='d-inline display-6 m-0 p-0'>{hero?.appearance?.['hair-color']}</p>
                                        </li>  
                                        <li className="list-group-item d-flex justify-content-between">
                                            <h5 className='d-inline display-6 m-0 p-0'>Works at: </h5>
                                            {hero?.work?.base.length > 1 ? makeSlider('works', hero?.work?.base) : hero?.work?.base}
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

            <div className='Superhero-Home-Footer d-flex justify-content-between display-4 text-center text-light'>
                <button className='bg-warning d-flex justify-content-around align-items-center p-4 m-0' onClick={() => history.goBack()}>
                    <Ricons.IoArrowBack size={24}/>
                </button>
                <button className='bg-danger d-flex justify-content-around align-items-center p-4 m-0' onClick={() => history.push('/Alkemy_Superhero/home')}>
                    <Ricons.IoHome size={24}/>
                </button>
            </div>
        </div>
    )
}


const mapStateToProps = (state) => {
    //console.log(state)
    const {team, isFetching} = state.heroReducer
    return {
        team,
        isFetching
    }
}

export default connect(mapStateToProps)(HeroDetails)