import {useHistory} from 'react-router-dom'
import Forms from '../components/Forms'

const Login = () => {

    const history = useHistory()

    const backStart = () => {
        history.push('/')
    }

    return (
        <div className="mainHome-Container d-flex justify-content-center align-items-center flex-column">
            <div className='pb-5'>
                <h1 className='display-1 '> Welcome Hero </h1>
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

export default Login;