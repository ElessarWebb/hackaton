import React, { PropTypes } from 'react'
import '../../styles/core.scss'

import 'font-awesome/css/font-awesome.css'

function CoreLayout ({ children }) {
  return (
    <div className='page-container'>
      <div className='view-container'>
        {children}
      </div>
    </div>
  )
}

CoreLayout.propTypes = {
  children: PropTypes.element
}

export default CoreLayout
