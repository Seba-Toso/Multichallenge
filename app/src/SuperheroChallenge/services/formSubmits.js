import axios from 'axios'

export const login = async (email, password) => {
  console.log(email, password);
  try {
    const response = await axios.post('http://challenge-react.alkemy.org/', {email,password})
    //console.log(response);
    localStorage.setItem('token', response.data.token)
  } catch (error) {
    console.log(error);
    console.log(error.config);
  }
}

export const searchHero = async (name, id) => {
  try {
    const response = await axios.get(`http://localhost:3001/SuperHeroApp/getHeroes`,{
      params:{
        name,
        id
      }
    })
    const {results} = response.data
    return results
  } catch (error) {
    console.log(error);
    console.log(error.config);
  }
}