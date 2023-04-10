import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import {useParams, useHistory} from "react-router-dom";
import { useModal } from "../../context/Modal";
import {deleteEventThunk} from "../../store/eventsThunk"
// import '../DeleteGroupModal'

function DeleteEventModal ({eventId, groupId}) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const history = useHistory();

    // console.log('groupId: ', groupId)
    const deleteHandler = async (e) => {
        e.preventDefault();
        // console.log(groupId)

        let deletion = await dispatch(deleteEventThunk(eventId))
        // // console.log('deletion: ', deletion)
        if (deletion) {
            console.log('deletion if')
            closeModal();
            history.push(`/groups/${groupId}`);
        }
    }
    return (
        <div>
            <h1>Confirm Delete</h1>
            <p>Are you sure you want to remove this event?</p>

            <div>
                <button onClick={deleteHandler}>Yes (Delete Event)</button>
                <button
                onClick={closeModal}
                >No (Keep Event)</button>
            </div>
        </div>
    )
}


export default DeleteEventModal
