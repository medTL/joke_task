import React, { FunctionComponent } from 'react'
import './Footer.scss';
export const  Footer: FunctionComponent = () => {
  return (
    <div className='footer_container'>
        <h4 className='footer_container_text'>GOT JOKES? GET PAID <br/> FOR SUBMITING!</h4>
        <span className='footer_container_action'>SUBMIT JOKE</span>
    </div>
  )
}
