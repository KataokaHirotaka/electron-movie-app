import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';

function Loading() {
  const loadingContent = {
    display: 'flex',
    flexWrap: 'wrap' as 'wrap',
    marginTop: '20px'
  };
  const skeltonWrapper = {
    width: '25%',
    marginBottom: '10px',
    textAlign: 'center' as 'center'
  };
  const skeltonStyle = {
    width: 200,
    height: 300,
    borderRadius: '8px',
    display: 'inline-block'
  };
  return (
    <div className={`loading-content`} style={loadingContent}>
      {
        (() => {
          const content = [];
          for (let i = 0; i < 8; i++) {
            content.push(
              <div className="skelton-wrapper" style={skeltonWrapper}>
                <Skeleton variant="rect" style={skeltonStyle}/>
              </div>
            );
          }
          return content;
        })() //　即時関数じゃないと表示されない
      }
    </div>
  )
}

export default Loading;