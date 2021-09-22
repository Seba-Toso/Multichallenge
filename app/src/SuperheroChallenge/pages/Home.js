import {useHistory} from 'react-router-dom'
import { connect } from 'react-redux'
import Header from '../components/Header'
import Pagination from '../components/Pagination'
import PonderedStats from '../components/PonderedStats'
import * as Ricons from 'react-icons/io5'

import '../styles/home.scss'
import jokerCard from '../assets/jokercard.gif'

const Home = ({team, dispatch}) => {
  const history = useHistory()

  const logout = () => {
      dispatch({type: 'LOGGOUT'})
      dispatch({type: 'LOGGOUT_SUCCESS'})
      localStorage.removeItem('token')
      history.push('/Alkemy_Superhero/access')
  }

  const teamPowerstats = team.heroes.reduce( (a,b) => {

    const checkValue = (value) => {
      return (
        isNaN(value) ? 0 : value
      )
    }


    return a = {
      'Intelligence': a.Intelligence + checkValue(parseInt(b.powerstats.intelligence)) ,
      'Strength': a.Strength + checkValue(parseInt(b.powerstats.strength)),
      'Speed': a.Speed + checkValue(parseInt(b.powerstats.speed)),
      'Durability': a.Durability + checkValue(parseInt(b.powerstats.durability)),
      'Power': a.Power + checkValue(parseInt(b.powerstats.power)),
      'Combat': a.Combat + checkValue(parseInt(b.powerstats.combat)),
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
    if(team.heroes.length === 0){
      return (
        <div className='display-6 lead text-light d-flex flex-column justify-content-center align-items-center'>
          <p className='display-4 text-light'>Here you could see your team.</p>
          <img src={jokerCard} alt='joker card' className='img-fluid'/>
          <p className='display-2 text-warning'>¡IF YOU HAD ONE!</p>
        </div>
      )
    }
    return <Pagination findedHeros={team.heroes} />
  }

  return (
    <div className="Superhero-Home-Container">
      <Header 
        title='Team' 
        buttonAction={logout} 
        icon={<Ricons.IoLogOut size={32}/>} 
        secondButtonAction={() => history.push('/Alkemy_Superhero/find-a-hero')} 
        secondIcon={<Ricons.IoSearchCircle size={32}/>}
        />

        <div className='team-cards pb-4 d-md-flex align-content-center w-100 px-3'>
          <div className='col-md-4 px-5 my-5'>
            <PonderedStats unponderedStats={teamPowerstats} title='Team Powerstats'/>
          </div>
          <div className='col-md-8 px-3 my-5 team-cards'>
          {
            createTeamCards()
          }
          </div>
        </div>
      <div className='Superhero-Home-Footer d-flex justify-content-between display-4 text-center text-light'>
        <button className='bg-warning d-flex justify-content-around align-items-center p-4 m-0' onClick={() => history.push('/Alkemy_Superhero/find-a-hero')}>
          <Ricons.IoSearch size={24}/>
        </button>
        <button className='bg-danger d-flex justify-content-around align-items-center p-4 m-0' onClick={logout}>
          <Ricons.IoLogOut size={24} />
        </button>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  console.log(state)
  const {team} = state.heroReducer
  return {
    team
  }
}

export default connect(mapStateToProps)(Home)

