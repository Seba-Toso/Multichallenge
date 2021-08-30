import React from 'react'
import Card from './Card'
import { motion } from "framer-motion"

const Pagination = ({findedHeros, addHero, removeHero}) => {

  const makePagination = () => {
    const HeroPages = []
    const totalPages = new Array(Math.ceil(findedHeros.length / 10)).fill(1, 0, Math.ceil(findedHeros.length / 10))
    totalPages.forEach((Page, index) => {
        let lastHeroIndex = (index+1) * 10
        let firstHeroIndex = lastHeroIndex - 10
        let heroesArrayPaginated = findedHeros.slice(firstHeroIndex, lastHeroIndex)
        HeroPages.push(heroesArrayPaginated)
    });  
    return HeroPages.map( (page, index) => {
        return (
          <ul key={index} className='p-0 m-0 px-2 d-flex' style={{listStyleType: 'none', overflow:'hidden'}}>
            {displayFindedHeros(page)}
          </ul>
        )
    })
  }
  const displayFindedHeros = (heroesArrayPaginated) => {
    return heroesArrayPaginated.map( (hero, index) => {
        return (
            <motion.li key={hero.id} style={{zIndex: index+1, marginRight: '-300px', padding: '0.5rem', borderRadius: '5px'}} whileHover={{ marginRight: "0px", marginLeft: '10px', zIndex: 9999 }}>
                <Card id={hero.id} name={hero.name} image={hero.image.url} alignment={hero.biography.alignment} addHero={addHero} removeHero={removeHero}/>  
            </motion.li>
        )
    })
  }

  return (
    <ul className='px-5 m-0' style={{width: '100%', margin: 0, padding: 0}}>
      {
        makePagination()
      }
    </ul>
  )
}

export default Pagination 



