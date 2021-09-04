import {useHistory} from 'react-router-dom'
import { usePersistedContext } from 'react-persist-context'
import Header from '../components/Header'
import Pagination from '../components/Pagination'
import PonderedStats from '../components/PonderedStats'
import * as Ricons from 'react-icons/io5'

import '../styles/home.scss'
import jokerCard from '../assets/jokercard.gif'

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
      return (
        <div className='display-6 lead text-light text-center'>
          <p className='display-5 text-light'>Here you could see your team.</p><p className='display-5 text-warning'>¡IF YOU HAD ONE!</p>
          <img src={jokerCard} alt='joker card' className='img-fluid rounded'/>
        </div>
      )
    }
    return <Pagination findedHeros={state.team.heroes} />
  }

  return (
    <div className="Superhero-Home-Container">
      <Header title='Welcome Hero'/>
      <div className='pb-4 d-md-flex align-content-center w-100 px-3'>
        <div className='col-md-4 p-1 my-2'>
          <PonderedStats unponderedStats={teamPowerstats} title='Team Powerstats'/>
        </div>
        <div className='col-md-8 px-3 my-3'>
        {
          createTeamCards()
        }
        </div>
      </div>
      <div className='Superhero-Home-Footer d-flex display-4 text-center text-light'>
        <button className='bg-warning w-50 d-flex justify-content-around align-items-center' onClick={() => history.push('/Alkemy_Superhero/find-a-hero')}>
          <p>Search heroes</p>
          <Ricons.IoSearch size={23}/>
        </button>
        <button className='bg-danger w-50 d-flex justify-content-around align-items-center' onClick={logout}>
          <p>Logout</p>
          <Ricons.IoLogOut size={23} />
        </button>
      </div>
    </div>
  )
}

export default Home;