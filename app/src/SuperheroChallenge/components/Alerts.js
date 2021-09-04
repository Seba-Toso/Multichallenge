import React, {useEffect, useState}from 'react'
import * as Ricons from 'react-icons/io5'

const Alerts = ({type, trigger}) => {
  
  const [opener, setOpener] = useState('')

  useEffect(() => {
    setOpener(trigger)
  }, [trigger])

  const defineIcon = () => {
    switch (type) {
      case 'success':
        return <Ricons.IoCheckmarkCircle />

      case 'danger':
        return <Ricons.IoCloseCircle />

      case 'warning':
        return <Ricons.IoWarning />
    
      default:
        break;
    }
  }
  

  return (
    <div className={`alert alert-${type} d-flex align-items-center display-4 w-100 ${opener}`} role="alert" style={{position: 'fixed'}}>
        {defineIcon()}
        <div className="mx-5">
            {type === 'success' ? 'Hero added to the team!' : type === 'danger' ? "Can't add this hero to the team" : 'Warning'}
        </div>
    </div>
  )
}

export default Alerts
