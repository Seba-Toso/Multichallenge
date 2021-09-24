export const LOGGOUT = 'LOGGOUT'
export const LOGGOUT_ERROR = 'LOGGOUT_ERROR'
export const LOGGOUT_SUCCESS = 'LOGGOUT_SUCCESS'

export const loggoutAction = (history) => (dispatch, getState) => {
    dispatch({
      type: LOGGOUT
    })
    localStorage.removeItem('token')
    setTimeout(() => {
      history.push('/Alkemy_Superhero/access')
      dispatch({
        type: LOGGOUT_SUCCESS
      })
    }, 1000);
}
