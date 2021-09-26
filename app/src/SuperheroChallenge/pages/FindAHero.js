import {useHistory} from 'react-router-dom'
import { connect } from 'react-redux'
import Forms from '../components/Forms'
import Header from '../components/Header';
import Pagination from '../components/Pagination'
import * as Ricons from 'react-icons/io5'

import '../styles/findHero.scss'
import batiLoader from '../assets/comicLoader.gif'
import batiNotFound from '../assets/batmanNotFound.gif'

const FindAHero = ({isFetching, findedHeroes}) => {
    const history = useHistory()
    const displayOneByOne = window.innerWidth <= 426

    return (
        <div className="Superhero-Home-Container">
            <Header 
                title='Hall of Fame' 
                buttonAction={() => history.goBack()} 
                icon={<Ricons.IoArrowBack size={32}/>} 
            />
            <div className='mainHome-Selector d-md-flex w-100 py-4'>
                <div className='mx-5 py-3 find-hero-form'>
                    <div className='pb-5'>
                        <h1 className='display-1'>Make your team.</h1>
                    </div>
                    <div className='pb-4 w-100'>
                        <p className='display-4'>Type your hero name or id. Search priorizes name over id.</p>
                    </div>
                    <Forms name id type='search'/>
                </div>
                <div className='mx-3 my-5 find-hero-cards'>
                {
                    findedHeroes !== undefined && displayOneByOne && findedHeroes.length > 0  &&
                    <div className='p-1 my-5 text-muted text-center'>
                        <Ricons.IoChevronBack size={11}/>
                        <Ricons.IoChevronBack size={13}/>
                        <Ricons.IoChevronBack size={15}/>
                        <Ricons.IoChevronBack size={17}/>
                        <p className='display-5 mx-2 my-0' style={{display: 'inline-block', verticalAlign: 'middle'}}>Swipe to change</p>
                        <Ricons.IoChevronForward size={17}/>
                        <Ricons.IoChevronForward size={15}/>
                        <Ricons.IoChevronForward size={13}/>
                        <Ricons.IoChevronForward size={10}/>
                    </div>
                }
                {
                    (
                        isFetching 
                        && 
                        <div className='display-6 lead text-light d-flex flex-column justify-content-center align-items-center' >
                            <div style={{borderRadius: '100%', overflow: 'hidden'}} className='w-25'>
                                <img src={batiLoader} alt='joker card' className='img-fluid'/>
                            </div>
                        </div>
                    )
                    ||
                    (
                        findedHeroes === undefined && 
                        <div className='text-light text-center d-flex flex-column-reverse justify-content-center align-items-center' >
                            <div className='w-50 mx-5'>
                                <img src={batiNotFound} alt='joker card' className='img-fluid'/>
                            </div>
                            <div>
                                <h1 className='display-2  my-4'>Sorry Bats</h1>
                                <p className='display-3 my-4'>Your search didn't find a hero</p>
                                <p className='display-5 my-4' style={{color: 'rgba(240, 248, 255, 0.2)'}}>Make shure you wrote it correctly</p>
                            </div>    
                        </div>
                    )
                    ||
                    (
                        findedHeroes.length > 0 && 
                        <Pagination findedHeros={findedHeroes}/>
                    )
                }
                </div>
            </div>
            <div className='Superhero-Home-Footer d-flex justify-content-between display-4 text-center text-light'>
                <button className='bg-warning d-flex justify-content-around align-items-center p-4 m-0' onClick={() => history.goBack()}>
                    <Ricons.IoArrowBack size={24}/>
                </button>
                <button className='bg-danger d-flex justify-content-around align-items-center p-4 m-0' onClick={() => window.scrollTo(0,0)}>
                    <Ricons.IoArrowUp size={24}/>
                </button>
            </div>
        </div>
        
    )
}


const mapStateToProps = (state) => {
    const {isFetching, findedHeroes} = state.heroReducer
    return {
        isFetching,
        findedHeroes
    }
}

export default connect(mapStateToProps)(FindAHero)