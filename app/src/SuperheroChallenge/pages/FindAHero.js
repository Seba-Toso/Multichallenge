import { useState } from 'react';
import {useHistory} from 'react-router-dom'
import { usePersistedContext } from 'react-persist-context'
import Forms from '../components/Forms'
import Header from '../components/Header';
import Pagination from '../components/Pagination'
import Alerts from '../components/Alerts';
import * as Ricons from 'react-icons/io5'

import '../styles/findHero.scss'
import batiLoader from '../assets/comicLoader.gif'

const FindAHero = () => {
    const { state, dispatch } = usePersistedContext()
    const [alertState, setAlertState] = useState({type: 'success', trigger: 'fade'})
    const [findedHeros, setFindedHeros] = useState([]);
    const history = useHistory()
    
    const addHero = (id) => {
        dispatch({type: 'ADD_HERO'})
        const selectedHero = findedHeros.find(hero => hero.id === id)
        if(state.team.heroes.find( hero => hero.id === selectedHero.id)){
            alert('Hero already taken')
            return dispatch({type: 'ADD_HERO_ERROR'})
        }
        if((state.team.bad === 3 && selectedHero.biography.alignment === 'bad') || (state.team.good === 3 && selectedHero.biography.alignment === 'good')){
            alert('Max Heros of that alignment reached')
            return dispatch({type: 'ADD_HERO_ERROR'})
        }
        const {heroes, good, bad} = state.team
        const updatedHeroes = heroes.concat(selectedHero)
        let updatedGood = good
        let updatedBad = bad
        if(selectedHero.biography.alignment === 'good'){
            updatedGood+=1
        }else{
            updatedBad+=1
        }
        setAlertState({type: 'success', trigger: ''})
        alert('Hero added to your team')
        dispatch({type: 'ADD_HERO_SUCCESS', payload: {good: updatedGood, bad: updatedBad, heroes: updatedHeroes}})
    }
    const removeHero = (id) => {  
        dispatch({type: 'REMOVE_HERO'})
        const selectedHero = findedHeros.find(hero => hero.id === id)
        console.log(selectedHero.biography.alignment);
        const {heroes, good, bad} = state.team
        if(!state.team.heroes.find( hero => hero.id === selectedHero.id)){
            alert("Can't remove a Hero that is not in the team.")
            return dispatch({type: 'REMOVE_HERO_ERROR'})
        }
        const updatedHeroes = heroes.filter(hero => hero.id !== selectedHero.id)
        let updatedGood = good
        let updatedBad = bad
        if(selectedHero.biography.alignment === 'good'){
            updatedGood-=1
        }else{
            updatedBad-=1
        }
        alert('Hero removed from your team')
        dispatch({type: 'REMOVE_HERO_SUCCESS', payload: {good: updatedGood, bad: updatedBad, heroes: updatedHeroes}})
    }

    return (
        <div className="Superhero-Home-Container">
            <Header title='Hall of Fame'/>
            <Alerts type={alertState.type} trigger={alertState.trigger}/>
            <div className='mainHome-Selector d-md-flex w-100 py-4'>
                <div className='mx-5 pb-5 find-hero-form' >
                    <Forms name id type='search' setFindedHeros={setFindedHeros}/>
                </div>
                <div className='mx-3 my-5 find-hero-cards'>
                {
                    (
                        state.isFetching 
                        && 
                        <div className='display-6 lead text-light d-flex flex-column justify-content-center align-items-center' >
                            <div style={{borderRadius: '100%', overflow: 'hidden'}} className='w-25'>
                                <img src={batiLoader} alt='joker card' className='img-fluid'/>
                            </div>
                        </div>
                    )
                    ||
                    (
                        findedHeros.length > 0 && 
                        <Pagination findedHeros={findedHeros} addHero={addHero} removeHero={removeHero}/>
                    )
                }
                </div>
            </div>
            <div className='Superhero-Home-Footer d-flex display-4 text-center'>
                <button className='bg-warning w-50 d-flex justify-content-around align-items-center flex-row-reverse text-light' onClick={() => history.goBack()}>
                    <p>Back</p>
                    <Ricons.IoArrowBack size={23}/>
                </button>
                <button className='bg-danger w-50 d-flex justify-content-around align-items-center' onClick={() => window.scrollTo(0,0)}>
                    <p>Go Top</p>
                    <Ricons.IoArrowUp size={23}/>
                </button>
            </div>
        </div>
        
    )
}

export default FindAHero;