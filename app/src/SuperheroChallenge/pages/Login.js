import {useHistory} from 'react-router-dom'
import { connect } from 'react-redux'
import Forms from '../components/Forms'

const Login = ({isFetching, isLogged}) => {
	const history = useHistory()

    const backStart = () => {
        history.push('/')
    }

    if(!isFetching && isLogged){
        return history.push('/Alkemy_Superhero/home')
    }

    if(isFetching){
        return (
            <div className="mainHome-Container login d-flex justify-content-center align-items-center flex-column">
            <div className='p-5 mx-5 welcome-container'>
                <div className=''>
                    <h1 className='display-1'> Loading.... </h1>
                </div>
            </div>
            <div className='pb-4'>
                <p className='display-6 lead'> - hold the rag -  </p>
            </div>
        </div>
        )
    }

    return (
        <div className="mainHome-Container login d-flex justify-content-center align-items-center flex-column">
            <div className='p-5 mx-5 welcome-container'>
                <div className=''>
                    <h1 className='display-1'> Welcome Hero </h1>
                </div>
            </div>
            <div className='pb-4'>
                <p className='display-6 lead'> Please Login</p>
            </div>
            <div className='mainHome-Selector my-1'>
                <Forms email password type='login'/>
            </div>
            <div className='mainHome-Selector my-2'>
                <button className="btn btn-outline-dark mt-4 w-100 d-flex justify-content-between align-items-center" onClick={backStart}>Back to Home</button>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    const {isFetching, isLogged} = state
	return {
        isFetching,
        isLogged
	}
}

export default connect(mapStateToProps)(Login)
