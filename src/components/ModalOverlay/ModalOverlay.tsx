import React, { ReactNode } from 'react'
import overlayStyle from './ModalOverlay.module.css'

export type ModalOverlayProps = {
    onClick: () => void;
    children: ReactNode;
    active: boolean;
}

export default function ModalOverlay(props : ModalOverlayProps){
    const active = props.active ? `${overlayStyle.overlay} ${overlayStyle.active}` : overlayStyle.overlay
    return (
        <div className={active} onClick={props.onClick}>
            {props.children}
        </div>
    )
}
