import {useEffect, useRef} from 'react';
import {createPortal} from 'react-dom';

const Modal = ({children}) => {
    const elRef = useRef(null);
    if(!elRef.current){
        elRef.current = document.createElement("div");
    }

    useEffect(() => {
        const modalRoot = document.getElementById("modal");
        if (!modalRoot) {
            console.error('No element with id "modal" found in the DOM.');
            return;
        }
        modalRoot.appendChild(elRef.current);
        return () => modalRoot.removeChild(elRef.current);
    }, []);

    return createPortal(<div>{children}</div>, elRef.current);
};

export default Modal;