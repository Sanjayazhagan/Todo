import ReactDOM from 'react-dom';
import { useEffect } from 'react';
interface ModalProps {
    children: React.ReactNode;
    className?: string;
}
function Modal({children, className}: ModalProps){
    useEffect(()=>{
        document.body.style.overflow='hidden';
        return ()=>{
            document.body.style.overflow='auto';
        };
    },[]);
    const modalRoot = document.querySelector('#modal-root');
    if(modalRoot !== null){
    return ReactDOM.createPortal(<div>
        <div className='fixed top-0 left-0 right-0 bottom-0 bg-gray-500 bg-opacity-100 flex items-center justify-center'></div>
        <div className={className}>
                {children}
        </div>
    </div>, modalRoot);
    }
}
export default Modal;