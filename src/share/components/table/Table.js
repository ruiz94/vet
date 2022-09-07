import React from 'react'

import Row from './Row';
import './Table.scss';

const Table = ({data}) => {
  const widthCol = data.header && {width: 100 / data.header.length + '%'};
  return (
    <div className='table'>
      <div className="header">
        {
          data.header && data.header.map((item, index) => (
            <span key={index} style={widthCol}>{item}</span>
          ))
        }
      </div>
      <div className="body">
        {data.body && data.body.length ? (
          data.body.map(item => <Row key={item.id} data={item} widthCol={widthCol}/>)
        ) : 
        (
          <div className="no-data">
            No data to show
          </div>
        )

        }
      </div>
    </div>
  )
}

export default Table
