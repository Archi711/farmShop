import React, { useState, ReactChild, useEffect } from 'react'
import ReactDOM from 'react-dom'
import './Modal.css'

// export interface initialModalState{
//   show : boolean,
// }

export const useModal = (show : boolean) => {
  const [isShowing, setShowing] = useState(show)
  const toggle = () => setShowing(!isShowing)
  return {
    isShowing,
    toggle
  }
}

export interface ModalProps{
  isShowing : boolean,
  toggle : () => void
  children? : ReactChild
}


export const Modal = (props : ModalProps) => {
  if(!props.isShowing) return null;

  return ReactDOM.createPortal(
    <div 
      className="modal" 
      tabIndex={-1}>
      <section className="modal__container">
        <h3 className="modal__heading">
          <svg onClick={props.toggle} className="modal__closeBtn" enableBackground="new 0 0 512.001 512.001" height="512" viewBox="0 0 512.001 512.001" width="512" xmlns="http://www.w3.org/2000/svg"><g><path d="m512.001 84.853-84.853-84.853-171.147 171.147-69.853 84.853 69.853 84.854 171.147 171.147 84.853-84.853-171.148-171.148z" fill="#cc3245"/><path d="m84.853 0-84.853 84.853 171.148 171.147-171.148 171.148 84.853 84.853 171.148-171.147v-169.707z" fill="#ff3e3a"/></g></svg>
        </h3>
        {props.children}
      </section>
    </div>
    , document.body ) 
}