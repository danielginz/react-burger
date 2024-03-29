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
                onClick={closeModal}>
            </div>
    );
}

export default ModalOverlay;
