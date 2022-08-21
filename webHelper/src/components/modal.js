import ReactDOM from 'react-dom';
import usePortal from '../utility/use-portal';

const Modal = ({ children }) => {
  const target = usePortal('modal');

  return ReactDOM.createPortal(children, target);
};

export default Modal;
