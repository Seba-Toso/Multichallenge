import axios from 'axios'

export const login = async (email, password) => {
  try {
    const response = await axios.post('http://challenge-react.alkemy.org/', {email,password})
    return response.data
  } catch (error) {
    console.log(error);
    console.log(error.config);
  }
}

export const searchHero = async (name, id) => {
  try {
    const response = await axios.get(`/SuperHeroApp/getHeroes`,{
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