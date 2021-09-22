import {useHistory, useLocation} from 'react-router-dom'
import { connect } from 'react-redux'
import Forms from '../components/Forms'

const Login = () => {
	const history = useHistory()
    const location = useLocation()

    const backStart = () => {
        history.push('/')
    }

    const setToken = (token) => {
        console.log(token);
        
        localStorage.setItem('token', token)
        setTimeout(() => {
            console.log('1');
            history.push('/Alkemy_Superhero/home') 
        }, 500);
        setTimeout(() => {
            console.log(location.pathname);
            return location.pathname === '/Alkemy_Superhero/home' ?
            null
            :    
            history.replace('/Alkemy_Superhero/home') 
        }, 1000);
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
                <Forms email password type='login' setToken={setToken}/>
            </div>
            <div className='mainHome-Selector my-2'>
                <button className="btn btn-outline-dark mt-4 w-100 d-flex justify-content-between align-items-center" onClick={backStart}>Back to Home</button>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
	//console.log(state)
	return {
	}
}

export default connect(mapStateToProps)(Login)
