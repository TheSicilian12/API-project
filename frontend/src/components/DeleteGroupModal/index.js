import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import {useParams, useHistory} from "react-router-dom";
import { useModal } from "../../context/Modal";
import {deleteGroupThunk, getGroup} from "../../store/groupsThunk"
import '../DeleteGroupModal'
import '../UniversalCSS.css';
import './DeleteGroupModal.css';

function DeleteGroupModal ({groupId}) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const history = useHistory();

    // console.log('groupId: ', groupId)
    const deleteHandler = async (e) => {
        e.preventDefault();
        // console.log(groupId)

        let deletion = await dispatch(deleteGroupThunk(groupId))
        // console.log('deletion: ', deletion)
        if (deletion) {
            closeModal();
            history.push('/groups');
        }
    }

    return (
        <div className='UdisplayFlex Uflexdirection-column UalignCenter UfontTreb deleteGroupWidth'>
            <h1>Confirm Delete</h1>
            <p className='deleteGroupText'>Are you sure you want to remove this group?</p>
            <div className='UdisplayFlex UjustifySpaceAround deleteGroupButtonsWidth deleteGroupButtonsMarginBottom'>
                <button
                    className='UpurpleButton UbuttonDimensions border-Radius15'
                    onClick={deleteHandler}>
                        Yes (Delete Group)
                </button>
                <button
                className='UgrayButton  UbuttonDimensions border-Radius15'
                onClick={closeModal}
                >
                    No (Keep Group)
                </button>
            </div>
        </div>
    )
}


export default DeleteGroupModal
