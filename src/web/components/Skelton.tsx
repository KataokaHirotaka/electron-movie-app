import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';

function Skelton() {
  const skeltonStyle = {
    width: 200,
    height: 300,
    borderRadius: '8px',
    display: 'inline-block'
  };
  return (
    <Skeleton variant="rect" style={skeltonStyle}/>
  )
}

export default Skelton;
