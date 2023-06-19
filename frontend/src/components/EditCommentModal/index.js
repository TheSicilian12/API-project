import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import '../DeleteGroupModal'
import { editComment } from "../../store/commentsThunk";
import '../UniversalCSS.css';
import './EditCommentModal.css';

function EditCommentModal({ eventId, commentEdit }) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const history = useHistory();

    const user = useSelector((state) => state.session.user)
    console.log("commentEdit: ", commentEdit)
    console.log("commentId: ", eventId)
    const [comment, setComment] = useState(commentEdit ? commentEdit : "")
    const [commentErr, setCommentErr] = useState("")

    const editCommentOnClick = async (e) => {
        e.preventDefault();

        const payload = {
            user,
            eventId,
            text: comment
        }

        let commentReturn = await dispatch(editComment(payload))
        closeModal()
    }


    return (
        <div>
            <form
                onSubmit={editCommentOnClick}
            >
                Edit Comment
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
                    Edit Comment
                </button>
            </form>
        </div>
    )
}


export default EditCommentModal
