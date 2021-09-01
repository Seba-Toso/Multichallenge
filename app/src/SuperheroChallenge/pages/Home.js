import {Link, useHistory} from 'react-router-dom'
import { usePersistedContext } from 'react-persist-context'
import Header from '../components/Header'
import Pagination from '../components/Pagination'
import PonderedStats from '../components/PonderedStats'


const Home = () => {
  const { state, dispatch } = usePersistedContext()
  const history = useHistory()

  const logout = () => {
      dispatch({type: 'LOGGOUT'})
      dispatch({type: 'LOGGOUT_SUCCESS'})
      localStorage.removeItem('token')
      history.push('/Alkemy_Superhero/access')
  }


  const teamPowerstats = state.team.heroes.reduce( (a,b) => {
    return a = {
      'Intelligence': a.Intelligence + parseInt(b.powerstats.intelligence),
      'Strength': a.Strength + parseInt(b.powerstats.strength),
      'Speed': a.Speed + parseInt(b.powerstats.speed),
      'Durability': a.Durability + parseInt(b.powerstats.durability),
      'Power': a.Power + parseInt(b.powerstats.power),
      'Combat': a.Combat + parseInt(b.powerstats.combat),
    }
  },{
    'Intelligence': 0,
    'Strength': 0,
    'Speed': 0,
    'Durability': 0,
    'Power': 0,
    'Combat': 0,
  })

  const createTeamCards = () => {
    if(state.team.heroes.length === 0){
      return <p className='display-6 lead text-light'> Here you could see your team. ¡IF YOU HAD ONE! </p>
    }
    return <Pagination findedHeros={state.team.heroes} />
  }

  return (
    <div className="mainHome-Container d-flex justify-content-center align-items-center flex-column">
          <Header title='Welcome Hero'/>
      <div className='pb-4 d-flex align-content-center w-100 px-3'>
        <div className='col-md-4'>
          <PonderedStats unponderedStats={teamPowerstats} title='Team Powerstats'/>
        </div>
        <div className='col-md-8 px-3'>
        {
          createTeamCards()
        }
        </div>
      </div>
      <div className='mainHome-Selector'>
          <Link to='/Alkemy-Superhero/find-a-hero' className="btn btn-outline-dark btn-sm">Search for heroes</Link>
      </div>
      <button onClick={logout}>LOGOUT</button>
      <div>
          {state.isLogged ? 'si' : 'no'}
      </div>
    </div>
  )
}

export default Home;