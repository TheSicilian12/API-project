import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import './DeleteEventModalButton.css';
import '../UniversalCSS.css';

export default function OpenModalDeleteEventButton({
    modalComponent, // component to render inside the modal
    buttonText, // text of the button that opens the modal
    onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
    onModalClose // optional: callback function that will be called once the modal is closed
}) {
    const { setModalContent, setOnModalClose } = useModal();

    const onClick = () => {
        if (typeof onButtonClick === 'function') onButtonClick();
        if (typeof onModalClose === 'function') setOnModalClose(onModalClose);
        setModalContent(modalComponent);
    };

    return (
        <button
            className='UpinkBorder UpurpleButton UfontTreb UbuttonCreateDimensions'
            onClick={onClick}
            >
                {buttonText}
            </button>
    );
}
