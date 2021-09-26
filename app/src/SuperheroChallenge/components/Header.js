import * as Ricons from 'react-icons/io5'
import {RiTeamFill} from 'react-icons/ri'

import '../styles/header.scss'

const Header = ({title, buttonAction, secondButtonAction, icon, secondIcon}) => {
  const showHeaderButton = window.innerWidth <= 426

  //When add a new title have to add an icon here
  const iconSelector = () => {
    switch (title) {
      case 'Hall of Fame':
        return <Ricons.IoTrophySharp size={32}/>

      case 'Team':
        return <RiTeamFill size={32}/>

      default:
        return <Ricons.IoPerson size={32}/>  
    }
  }

  return (
    <div className="header mt-0 text-light">
      <div className="row w-100">

        <div className="col-4 d-flex">
          {
            !showHeaderButton && 
            <div className='d-flex justify-content-start align-items-center h-100 mx-5' >
              <button className='text-light d-flex align-items-center' onClick={buttonAction}>
                  {icon}
              </button>
            </div>
          }
          {  
            secondButtonAction && !showHeaderButton && 
            <div className='d-flex justify-content-start align-items-center h-100 mx-5' >
              <button className='text-light d-flex align-items-center' onClick={secondButtonAction}>
                  {secondIcon}
                  <p className='display-5 p-0 m-0 mx-4'>Search Hero</p>
              </button>
            </div>
          }
        </div>

        <div className={`${showHeaderButton ? 'col-11' : 'col-7'} m-0 p-0 px-5`}>
          <h1>{title}</h1>
        </div>

        <div className="col-1">
          <div className='d-flex justify-content-center align-items-center h-100' >
            {
              iconSelector()
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
