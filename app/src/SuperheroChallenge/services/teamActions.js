
export const addHero = (hero, team, dispatch) => {
    dispatch({type: 'ADD_HERO'})
    if(team.heroes.find( heroInTeam => heroInTeam.id === hero.id)){
        alert('Hero already taken')
        return dispatch({type: 'ADD_HERO_ERROR'})
    }
    if((team.bad === 3 && hero.biography.alignment === 'bad') || (team.good === 3 && hero.biography.alignment === 'good')){
        alert('Max Heros of that alignment reached')
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
    alert('Hero added to your team')
    dispatch({type: 'ADD_HERO_SUCCESS', payload: {good: updatedGood, bad: updatedBad, heroes: updatedHeroes}})
}


export const removeHero = (hero, team, dispatch) => {  
    dispatch({type: 'REMOVE_HERO'})
    const {heroes, good, bad} = team
    if(!team.heroes.find( heroInTeam => heroInTeam.id === hero.id)){
        alert("Can't remove a Hero that is not in the team.")
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
    alert('Hero removed from your team')
    dispatch({type: 'REMOVE_HERO_SUCCESS', payload: {good: updatedGood, bad: updatedBad, heroes: updatedHeroes}})
}