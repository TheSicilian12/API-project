import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import {deleteGroup} from "../../store/groupThunk"
import '../DeleteGroupModal'



function DeleteGroupModal () {

    const deleteGroup = async (e) => {
        e.preventDefault();

        // const deleteGroup = await dispatchEvent(deleteGroup())
    }

    const { closeModal } = useModal();
    return (
        <div>
            <h1>Confirm Delete</h1>
            <p>Are you sure you want to remove this group?</p>

            <div>
                <button onClick={deleteGroup}>Yes (Delete Group)</button>
                <button
                onClick={closeModal}
                >No (Keep Group)</button>
            </div>
        </div>
    )
}


export default DeleteGroupModal
