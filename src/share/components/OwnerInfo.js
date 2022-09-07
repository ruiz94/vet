import React from 'react'
import Input from './formElements/Input';
import HeadTitleForm from './HeadTitleForm';

import './OwnerInfo.scss';

const OwnerInfo = ({name, email}) => {
  return (
    <div className='owner-info'>
      <HeadTitleForm name="Owner" />
      <div className="info">
        <Input element="static" name="Name" value={name} />
        <Input element="static" name="Email" value={email} />
      </div>
    </div>
  )
}

export default OwnerInfo
