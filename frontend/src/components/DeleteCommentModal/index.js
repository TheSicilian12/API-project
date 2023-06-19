import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import '../DeleteGroupModal'
import { addComment } from "../../store/commentsThunk";
import '../UniversalCSS.css';
import './DeleteCommentModal.css';

function DeleteCommentModal({ eventId }) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const history = useHistory();

    const user = useSelector((state) => state.session.user)

    const [comment, setComment] = useState("")
    const [commentErr, setCommentErr] = useState("")

    const addCommentOnClick = async (e) => {
        e.preventDefault();

        // let deletion = await dispatch(deleteGroupThunk(groupId))

        // if (deletion) {
        //     closeModal();
        //     history.push('/groups');
        // }
        console.log("add comment button")

        const payload = {
            user,
            eventId,
            comment
        }

        let commentReturn = await dispatch(addComment(payload))
        console.log("commentReturn: ", commentReturn)
        closeModal()
    }
    console.log("comment: ", comment)

    return (
        <div>
            <form
                onSubmit={addCommentOnClick}
            >
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
                <button
                    type="submit"
                    >
                    Add Comment
                </button>
            </form>
        </div>
    )
}


export default DeleteCommentModal
