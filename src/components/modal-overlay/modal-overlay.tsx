import modalOverlayStyles from './modal-overlay.module.css';
import {FC} from "react";
import modalStyles from "../modal/modal.module.css";

interface IModalOverlay {
    closeModal: () => void
}

const ModalOverlay: FC<IModalOverlay> = ({ closeModal }) => {
    return(
            <div 
                className={modalOverlayStyles.modal_overlay}
                /*className={modalStyles.modal_container + ' pl-10 pt-10 pr-10 pb-15'}*/
                onClick={closeModal}>
            </div>
    );
}

export default ModalOverlay;
