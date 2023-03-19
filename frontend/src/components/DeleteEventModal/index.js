import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import {useParams, useHistory} from "react-router-dom";
import { useModal } from "../../context/Modal";
// import {deleteGroupThunk, getGroup} from "../../store/groupsThunk"
// import '../DeleteGroupModal'



function DeleteEventModal ({groupId}) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const history = useHistory();

    // console.log('groupId: ', groupId)
    const deleteHandler = async (e) => {
        e.preventDefault();
        // console.log(groupId)

        // let deletion = await dispatch(deleteGroupThunk(groupId))
        // // console.log('deletion: ', deletion)
        // if (deletion) {
        //     closeModal();
        //     history.push('/groups');
        // }
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
