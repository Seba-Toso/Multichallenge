import {login, searchHero} from './helpers'

export const LOGGIN = 'LOGGIN'
export const LOGGIN_ERROR = 'LOGGIN_ERROR'
export const LOGGIN_SUCCESS = 'LOGGIN_SUCCESS'
export const GET_HEROES = 'GET_HEROES'
export const GET_HEROES_ERROR = 'GET_HEROES_ERROR'
export const GET_HEROES_SUCCESS = 'GET_HEROES_SUCCESS'
export const GET_HEROE_DETAIL = 'GET_HEROE_DETAIL'
export const GET_HEROE_DETAIL_ERROR = 'GET_HEROE_DETAIL_ERROR'
export const GET_HEROE_DETAIL_SUCCESS = 'GET_HEROE_DETAIL_SUCCESS'
export const CLEAR_FETCHING = 'CLEAR_FETCHING'

export const logginAction = (email, password) => (dispatch, getState) => {
  dispatch({
      type: LOGGIN
  })

  login(email, password)
  .then((res) => {
    localStorage.setItem('token', res.token)
    return dispatch({
      type: LOGGIN_SUCCESS, 
      payload: true
    })
  })
  .catch((error)=>{
    return console.log(error)
  })
  .finally(() => {
    return dispatch({
      type: CLEAR_FETCHING
    })
  })
}

export const getHeroAction = (name, id, isForDetails) => (dispatch, getState) => {
  dispatch({
    type: GET_HEROE_DETAIL
  })
  console.log(isForDetails);
  if(isForDetails){
    searchHero(name, id)
    .then((result)=>{
      return dispatch({
        type: GET_HEROE_DETAIL_SUCCESS, 
        payload: result
      })
    })
    .catch( error => {
      console.log(error);
      return dispatch({
        type: GET_HEROE_DETAIL_ERROR
      })
    })
    .finally(() => {
      return dispatch({
        type: CLEAR_FETCHING
      })
    })
  }
  else{
    searchHero(name, id)
    .then((result)=>{
      return dispatch({
        type: GET_HEROES_SUCCESS, 
        payload: result
      })
    })
    .catch( error => {
      console.log(error);
      return dispatch({
        type: GET_HEROES_ERROR
      })
    })
    .finally(() => {
      return dispatch({
        type: CLEAR_FETCHING
      })
    })
  }
}


