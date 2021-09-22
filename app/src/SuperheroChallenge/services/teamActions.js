export const ADD_HERO = 'ADD_HERO'
export const ADD_HERO_ERROR = 'ADD_HERO_ERROR'
export const ADD_HERO_SUCCESS = 'ADD_HERO_SUCCESS'
export const REMOVE_HERO = 'REMOVE_HERO'
export const REMOVE_HERO_ERROR = 'REMOVE_HERO_ERROR'
export const REMOVE_HERO_SUCCESS = 'REMOVE_HERO_SUCCESS'

export const addHeroAction = (hero, team, fireAlert) => (dispatch, getState) => {
    dispatch({
        type: ADD_HERO
    })
    console.log('esto');
    
    if(team.heroes.find( heroInTeam => heroInTeam.id === hero.id)){
        fireAlert('error', 'Hero already taken.')
        return dispatch({
            type: ADD_HERO_ERROR
        })
    }

    if((team.bad === 3 && hero.biography.alignment === 'bad') || (team.good === 3 && hero.biography.alignment === 'good')){
        fireAlert('error', 'Max Heros of that alignment reached.')
        return dispatch({
            type: ADD_HERO_ERROR
        })
    }

    const {heroes, good, bad} = team
    const updatedHeroes = heroes.concat(hero)
    let updatedGood = good
    let updatedBad = bad
    if(hero.biography.alignment === 'good'){
        updatedGood+=1
    }else{
        updatedBad+=1
    }

    fireAlert('success', 'Hero added to your team.')
    return dispatch({
        type: ADD_HERO_SUCCESS, 
        payload: {good: updatedGood, bad: updatedBad, heroes: updatedHeroes}
    })
}


export const removeHeroAction = (hero, team, fireAlert) => (dispatch, getState) => {  
    dispatch({
        type: REMOVE_HERO
    })

    const {heroes, good, bad} = team

    if(!team.heroes.find( heroInTeam => heroInTeam.id === hero.id)){
        fireAlert('error', "Can't remove a Hero that is not in the team.")
        return dispatch({
            type: REMOVE_HERO_ERROR
        })
    }

    const updatedHeroes = heroes.filter(heroInTeam => heroInTeam.id !== hero.id)
    let updatedGood = good
    let updatedBad = bad
    if(hero.biography.alignment === 'good'){
        updatedGood-=1
    }else{
        updatedBad-=1
    }

    fireAlert('success', 'Hero removed from your team.')
    return dispatch({
        type: REMOVE_HERO_SUCCESS, 
        payload: {good: updatedGood, bad: updatedBad, heroes: updatedHeroes}
    })
}