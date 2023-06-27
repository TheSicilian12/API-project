import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import {useParams, useHistory} from "react-router-dom";
import { useModal } from "../../context/Modal";
import {deleteEventThunk} from "../../store/eventsThunk"
import './DeleteEventModal.css';
import '../UniversalCSS.css';

function DeleteEventModal ({eventId, groupId}) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const history = useHistory();

    const deleteHandler = async (e) => {
        e.preventDefault();

        let deletion = await dispatch(deleteEventThunk(eventId))
        if (deletion) {
            closeModal();
            history.push(`/groups/${groupId}`);
        }
    }
    return (
        <div className='UdisplayFlex Uflexdirection-column UalignCenter UfontTreb deleteEventWidth'>
            <h1>Confirm Delete</h1>
            <p className='deleteGroupText'>Are you sure you want to remove this event?</p>

            <div className='UdisplayFlex UjustifySpaceAround deleteEventButtonsWidth deleteEventButtonsMarginBottom'>
                <button
                    className='UpurpleButton UbuttonDimensions border-Radius15'
                    onClick={deleteHandler}>
                        Yes (Delete Event)
                </button>
                <button
                className='UgrayButton  UbuttonDimensions border-Radius15'
                onClick={closeModal}
                >
                    No (Keep Event)
                </button>
            </div>
        </div>
    )
}


export default DeleteEventModal
