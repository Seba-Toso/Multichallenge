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
    <div className="header w-100 mt-0" style={{backgroundColor: '#f0f0f010'}}>
      <div className="row">
        <div className="col-md-2">
          <div className='d-flex justify-content-center align-items-center w-100 h-100' >
            <GrPrevious className='previous-page display-2 p-3' color='plain' onClick={goBackHandler}/>
          </div>
        </div>
        <div className="col-md-10">
          <h1 className='display-1 text-light '> {title} </h1>
        </div>
      </div>
    </div>
  )
}

export default Header
