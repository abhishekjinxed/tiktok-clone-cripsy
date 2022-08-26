import Image from 'next/image'
import Mute from 'components/Icons/Mute'

import { useState } from 'react'
export function MuteIcon () {

  return (
    <>
      <div className='player-icon'>
    
      <Mute />
      </div>

      <style jsx>{`
        .player-icon {
          width: 100%;
          height:  100%;
          padding:5px;
          display:block;
          margin:auto;
          text-align: right;         
          position:absolute; 
          border-radius:10%;         
                       }
                 ` 
          }</style>
    </>
  )
}
