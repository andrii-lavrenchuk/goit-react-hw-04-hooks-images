import { useEffect } from 'react';
import PropTypes from 'prop-types';

import { createPortal } from 'react-dom';
import s from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ onClose, largeImageURL, tags }) {
  useEffect(() => {
    window.addEventListener('keydown', handleEscKeydown);

    return () => {
      window.removeEventListener('keydown', handleEscKeydown);
    };
  });

  const handleEscKeydown = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return createPortal(
    <div className={s.overlay} onClick={handleBackdropClick}>
      <div className={s.modal}>
        <img src={largeImageURL} alt={tags} />
      </div>
    </div>,
    modalRoot,
  );
}
Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};

// export default class Modal extends Component {
//   static propTypes = {
//     largeImageURL: PropTypes.string.isRequired,
//     tags: PropTypes.string.isRequired,
//   };

//   componentDidMount() {
//     window.addEventListener('keydown', this.handleEscKeydown);
//   }

//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.handleEscKeydown);
//   }

//   handleEscKeydown = e => {
//     if (e.code === 'Escape') {
//       this.props.onClose();
//     }
//   };

//   handleBackdropClick = e => {
//     if (e.currentTarget === e.target) {
//       this.props.onClose();
//     }
//   };

//   render() {
//     const { largeImageURL, tags } = this.props;

//     return createPortal(
//       <div className={s.overlay} onClick={this.handleBackdropClick}>
//         <div className={s.modal}>
//           <img src={largeImageURL} alt={tags} />
//         </div>
//       </div>,
//       modalRoot,
//     );
//   }
// }
