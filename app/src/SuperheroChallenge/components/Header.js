import * as Ricons from 'react-icons/io5'
import '../styles/header.scss'


const Header = ({title}) => {
  
  const iconSelector = () => {
    switch (title) {
      case 'Hall of Fame':
        return <Ricons.IoFlame className='display-2 p-3' size={36}/>
      case 'Welcome Hero':
        return <Ricons.IoHome className='display-2 p-3' size={36}/>
      
      default:
        return <Ricons.IoReader className='display-2 p-3' size={36}/>  
    }
  }

  return (
    <div className="header mt-0 text-light" style={{backgroundColor: '#f0f0f010'}}>
      <div className="row w-100">
        <div className="col-2">
          <div className='d-flex justify-content-center align-items-center h-100' >
            {
              iconSelector()
            }
          </div>
        </div>
        <div className="col-10 m-0 p-0 px-5">
          <h1>{title}</h1>
        </div>
      </div>
    </div>
  )
}

export default Header
