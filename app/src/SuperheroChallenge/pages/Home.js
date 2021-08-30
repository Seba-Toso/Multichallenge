import { useEffect } from 'react';
import {Link, useHistory} from 'react-router-dom'
import { usePersistedContext } from 'react-persist-context'


const Home = ({test}) => {
  const { state, dispatch } = usePersistedContext()
  const history = useHistory()

  console.log(test);

  useEffect(() => {
    console.log(state.team.heroes);
  }, [state])

  const logout = () => {
      dispatch({type: 'LOGGOUT'})
      dispatch({type: 'LOGGOUT_SUCCESS'})
      localStorage.removeItem('token')
      history.push('/Alkemy_Superhero/access')
  }

  return (
    <div className="mainHome-Container d-flex justify-content-center align-items-center flex-column">
      <div className='pb-5'>
          <h1 className='display-1 '> Welcome Hero </h1>
      </div>
      <div className='pb-4'>
          <p className='display-6 lead'> This are your cards </p>
      </div>
      <div className='mainHome-Selector'>
          <Link to='/Alkemy_Superhero/find-a-hero' className="btn btn-outline-dark btn-sm">Search for heroes</Link>
          <Link to='/Alkemy_Superhero/hero-detail' className="btn btn-outline-dark btn-sm">Check details</Link>
      </div>
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
      <div>
          {state.isFetching ? 'si' : 'no'}
      </div>
      <button onClick={logout}>LOGOUT</button>
      <div>
          {state.isLogged ? 'si' : 'no'}
      </div>
    </div>
  )
}

export default Home;