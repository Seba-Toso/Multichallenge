import React, {useEffect} from 'react'
import {Link, useHistory, useLocation} from 'react-router-dom'
import {GrPrevious} from 'react-icons/gr'
import '../styles/header.scss'


const Header = ({title}) => {
  const history = useHistory()
  const location = useLocation()
  const goBackHandler = () => {
    history.goBack()
  }

  return (
    <div className="header mt-0" style={{backgroundColor: '#f0f0f010'}}>
      <div className="row w-100">
        <div className="col-2">
          <div className='d-flex justify-content-center align-items-center  h-100' >
            <GrPrevious className='previous-page display-2 p-3' color='plain' onClick={goBackHandler}/>
          </div>
        </div>
        <div className="col-10 m-0 p-0">
          <h1 className='display-1 text-light'> {title} </h1>
        </div>
      </div>
    </div>
  )
}

export default Header
