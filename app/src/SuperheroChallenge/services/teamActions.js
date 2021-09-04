
export const addHero = (hero, team, dispatch, fireAlert) => {
    dispatch({type: 'ADD_HERO'})
    if(team.heroes.find( heroInTeam => heroInTeam.id === hero.id)){
        fireAlert('error', 'Hero already taken.')
        return dispatch({type: 'ADD_HERO_ERROR'})
    }
    if((team.bad === 3 && hero.biography.alignment === 'bad') || (team.good === 3 && hero.biography.alignment === 'good')){
        fireAlert('error', 'Max Heros of that alignment reached.')
        return dispatch({type: 'ADD_HERO_ERROR'})
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
    return dispatch({type: 'ADD_HERO_SUCCESS', payload: {good: updatedGood, bad: updatedBad, heroes: updatedHeroes}})
}


export const removeHero = (hero, team, dispatch, fireAlert) => {  
    dispatch({type: 'REMOVE_HERO'})
    const {heroes, good, bad} = team
    if(!team.heroes.find( heroInTeam => heroInTeam.id === hero.id)){
        fireAlert('error', "Can't remove a Hero that is not in the team.")
        return dispatch({type: 'REMOVE_HERO_ERROR'})
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
    return dispatch({type: 'REMOVE_HERO_SUCCESS', payload: {good: updatedGood, bad: updatedBad, heroes: updatedHeroes}})
}