import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import {useParams} from "react-router-dom";
import { useModal } from "../../context/Modal";
import {deleteGroup, getGroup} from "../../store/groupsThunk"
import '../DeleteGroupModal'



function DeleteGroupModal ({groupId}) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    // const {id} = useParams();

    // console.log('groupId: ', groupId)
    const deleteGroup = async (e) => {
        e.preventDefault();
        console.log(groupId)

        // let deletion = await dispatch(deleteGroup(1))
        // let group = dispatch(deleteGroup(1))

        // console.log('groups: ', group)
        console.log('test')
        // console.log('deletion: ', deletion)
    }
    

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
