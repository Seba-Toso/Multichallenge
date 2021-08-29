import { useState } from 'react';
import Forms from '../components/Forms'
import Card from '../components/Card';
import {Link} from 'react-router-dom'
import { motion } from "framer-motion"

const FindAHero = () => {

    const [findedHeros, setFindedHeros] = useState([]);
    const[isFocus, setIsFocus] = useState(false)

    const displayFindedHeros = () => {
        return findedHeros.map( (hero, index) => {
            return (
                <motion.li key={hero.id} className='w-25' style={{zIndex: index+1, marginRight: '-150px'}} whileHover={{ marginRight: "10px", marginLeft: '10px', zIndex: 9999 }}>
                    <Card name={hero.name} image={hero.image.url}/>  
                </motion.li>
            )
        })
    }


    return (
        <div className="mainHome-Container d-flex justify-content-start align-items-start flex-column">
            <div className='pb-5'>
                <h1 className='display-1 '> Search a New Hero </h1>
            </div>
            <div className='pb-4'>
                <p className='display-6 lead'> What hero will you choose? </p>
            </div>
            <div className='mainHome-Selector d-flex w-100'>
                <span className='mx-5 w-25'>
                    <Forms name id type='search' setFindedHeros={setFindedHeros}/>
                </span>
                <ul className='mx-4 pl-5 mb-0 d-flex w-75' style={{listStyleType: 'none', overflow:'hidden'}}>
                    {displayFindedHeros()}
                </ul>
            </div>
            <div className='mainHome-Selector mt-3'>
                <Link to='/Alkemy_Superhero' className="btn btn-outline-dark btn-sm mx-2">Back Home</Link>
                <Link to='/Alkemy_Superhero/hero-detail' className="btn btn-outline-dark btn-sm">Check details</Link>
            </div>
        </div>
    )
}

export default FindAHero;