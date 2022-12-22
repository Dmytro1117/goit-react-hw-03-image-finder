// import { Component } from 'react';
import {useEffect} from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import './Modal.css';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ largeImageURL, onClose }) {

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
     window.removeEventListener('keydown', handleKeyDown);
  })

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
     onClose();
    }
  };

 const handleBackDropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

    return createPortal(
      <div className="Overlay" onClick={handleBackDropClick} >
        <div className="Modal">
          <img src={largeImageURL} alt=""/>
        </div>
      </div>,
      modalRoot
    );
}


Modal.propTypes = {
  onClose: PropTypes.func,
  largeImageURL: PropTypes.string.isRequired,
};





// export class Modal extends Component {
//   componentDidMount() {
//     window.addEventListener('keydown', this.handleKeyDown);
//   }

//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.handleKeyDown);
//   }

//   handleKeyDown = e => {
//     if (e.code === 'Escape') {
//       this.props.onClose();
//     }
//   };

//   handleBackDropClick = e => {
//     if (e.currentTarget === e.target) {
//       this.props.onClose();
//     }
//   };

//   render() {
//     return createPortal(
//       <div className="Overlay" onClick={this.handleBackDropClick} >
//         <div className="Modal">
//           <img src={this.props.largeImageURL} alt=""/>
//         </div>
//       </div>,
//       modalRoot
//     );
//   }
// }

