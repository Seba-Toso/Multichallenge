import React from 'react'

const PonderedStats = ({unponderedStats, title, isColored= false}) => {

  const colors = [
    "#ffc107",
    "#fd7e14",
    "#dc3545",
    "#d63384",
    "#6f42c1",
    "#0d6efd",
    "#198754",
    "#20c997",
    "#0dcaf0",
    "#6610f2",
  ]

  const podnderedStats = [];
  for (let stat in unponderedStats) {
    podnderedStats.push([stat, unponderedStats[stat]]);
  }

  const makeStatList = () => {
    return podnderedStats.sort((a, b)=>b[1] - a[1]).map((stat, index) => {
      return (
        <li key={stat[0]} className="list-group-item d-flex justify-content-between" style={{backgroundColor: '#0f0f0f',borderBottom: '2px solid '+colors[index], color: colors[index]}}>
          <h5 className='d-inline display-6 m-0 p-0'>{stat[0]}</h5>
          <p className='d-inline display-6 m-0 p-0'>{stat[1]}</p>
        </li>
      )
    })
  }

  return (
    <div className='d-flex flex-column justify-content-between home-powerstats'>
      <h2 className='display-2 text-light'>{title}</h2>
      <ul className="list-group list-group-flush justify-content-between">
        {
          makeStatList()
        }
      </ul>
    </div>
  )
}

export default PonderedStats
