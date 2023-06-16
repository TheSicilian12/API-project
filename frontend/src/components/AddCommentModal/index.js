import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import '../DeleteGroupModal'
import '../UniversalCSS.css';
import './AddCommentModal.css';

function AddCommentModal({ eventId }) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const history = useHistory();

    const [comment, setComment] = useState("")
    const [commentErr, setCommentErr] = useState("")

    const deleteHandler = async (e) => {
        e.preventDefault();

        // let deletion = await dispatch(deleteGroupThunk(groupId))

        // if (deletion) {
        //     closeModal();
        //     history.push('/groups');
        // }
    }

    return (
        <div>
            <form>
                Comment
                <label>Comment</label>
                <input
                    // className='groupFormInput'
                    type='text'
                    placeholder='comment'
                    value={comment}
                    onChange={(e) => {
                        setComment(e.target.value)
                        setCommentErr(true)
                    }}
                ></input>
            </form>
        </div>
    )
}


export default AddCommentModal
