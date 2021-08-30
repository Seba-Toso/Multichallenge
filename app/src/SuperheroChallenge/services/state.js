export const initialState = {
  isFetching: false,
  isLogged: false,
  error: false,
  team: {
    good: 0,
    bad: 0,
    heroes: [],
  }
}

export const HeroReducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case 'LOGIN': 
      return {...state, isFetching: true, error: false};

    case 'LOGIN_SUCCESS': 
      return {...state, isLogged: true, isFetching: false};

    case 'LOGIN_ERROR': 
      return {...state, isLogged: false, isFetching: false, error: false};

    case 'LOGGOUT': 
      return {...state, isFetching: true, error: false};

    case 'LOGGOUT_SUCCESS': 
      return {...state, isFetching: false, isLogged: false, error: false};
    
    case 'GET_HEROES': 
      return {...state, isFetching: true, error: false};

    case 'GET_HEROES_SUCCESS': 
      return {...state, findedHeroes: action.payload, isFetching: false};

    case 'GET_HEROES_ERROR': 
      return {...state, isFetching: false, error: action.payload};

    case 'ADD_HERO': 
      return {...state, isFetching: true};

    case 'ADD_HERO_SUCCESS': 
      return {...state, isFetching: false, team: action.payload};

    case 'ADD_HERO_ERROR':
      return {...state, isFetching: false}

    case 'REMOVE_HERO': 
      return {...state, isFetching: true};

    case 'REMOVE_HERO_SUCCESS': 
      return {...state, isFetching: false, team: action.payload};
      
    case 'REMOVE_HERO_ERROR': 
      return {...state, isFetching: false};
      
    default:
      return state;
  }
}