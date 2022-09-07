import React from 'react'
import './HeadTitleForm.scss';

const HeadTitleForm = ({name, subtitle}) => {
  return (
    <div className="head-title-form">
        <div className="head-title">{name} {subtitle && <span> - {subtitle}</span>}</div>
        <div className="head-line"></div>
    </div>
  )
}

export default HeadTitleForm
