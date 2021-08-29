import {Link} from 'react-router-dom'
import Forms from '../components/Forms'

const Login = () => {

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
                <Link to='/' className="btn btn-outline-dark btn-sm">Back to Home</Link>
            </div>
        </div>
    )
}

export default Login;