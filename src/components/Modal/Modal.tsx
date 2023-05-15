import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import modalStyle from './Modal.module.css'
import ModalOverlay from '../ModalOverlay/ModalOverlay';

export type ModalProps = {
    title?: string;
    onClose: () => void;
    children: React.ReactNode;
}

export default function Modal(props : ModalProps){


    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if(e.key === 'Escape'){
                props.onClose()
            }
        }

        document.addEventListener('keydown', handleEsc)

        return () => {document.removeEventListener('keydown', handleEsc)}
    }, [props])

    return createPortal(
        <ModalOverlay active onClick={props.onClose}>
            <div className={modalStyle.card} onClick={(e) => e.stopPropagation()}>
                <div className={modalStyle.header}>
                    <div className="text text_type_main-large">
                        {props.title}
                    </div>
                    <div className={modalStyle.close} onClick={props.onClose}>
                        <CloseIcon type='primary'/>
                    </div>
                </div>
                {props.children}
            </div>
        </ModalOverlay>
        , document.getElementById('modal-root')!
    )
}
