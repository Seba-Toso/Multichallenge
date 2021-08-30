import { useState } from 'react';
import Forms from '../components/Forms'
import {Link} from 'react-router-dom'
import Pagination from '../components/Pagination';
import { usePersistedContext } from 'react-persist-context'

const FindAHero = () => {
    const { state, dispatch } = usePersistedContext()

    const [findedHeros, setFindedHeros] = useState([]);

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
        <div className="mainHome-Container d-flex justify-content-start align-items-start flex-column">
            <div className='pb-5'>
                <h1 className='display-1 '> Search a New Hero </h1>
                <div className='mainHome-Selector mt-3'>
                    <Link to='/Alkemy_Superhero' className="btn btn-outline-dark btn-sm mx-2">Back Home</Link>
                </div>
            </div>
            <div className='pb-4'>
                <p className='display-6 lead'> What hero will you choose? </p>
            </div>
            <div className='mainHome-Selector d-flex w-100'>
                <span className='mx-2 w-25'>
                    <Forms name id type='search' setFindedHeros={setFindedHeros}/>
                </span>
                <span className='mx-3 w-75'>
                {
                    findedHeros.length > 0 && 
                    <Pagination findedHeros={findedHeros} addHero={addHero} removeHero={removeHero}/>
                }
                </span>
            </div>

        </div>
    )
}

export default FindAHero;