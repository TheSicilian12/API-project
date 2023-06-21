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
    const [comment, setComment] = useState(commentEdit ? commentEdit : "")
    const [displayCommentErr, setDisplayCommentErr] = useState("")

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

    let err = {}
    if (comment.length < 10) err.comment = "10+ characters"

    let notAllowed;
    if (Object.values(err).length > 0) {
        notAllowed = 'not-allowedCursor disabledButton'
    }

    return (
        <div>
            <form
                className="edit-comment-form-container"
                onSubmit={editCommentOnClick}
            >
                {(!displayCommentErr || !err.comment) && <h1>Edit Comment</h1>}
                {displayCommentErr && err.comment && <h1 className="errors">Edit Comment* {err.comment}</h1>}
                <textarea
                    className='edit-comment-textarea'
                    type='text'
                    placeholder='comment'
                    value={comment}
                    onChange={(e) => {
                        setComment(e.target.value)
                        setDisplayCommentErr(true)
                    }}
                ></textarea>
                <button
                    className={`UpinkBorder UpurpleButton UfontTreb UbuttonSmallDimensions edit-comment-button-container ${notAllowed}`}
                    type="submit"
                    disabled={Object.values(err).length > 0}
                    >
                    Edit
                </button>
            </form>
        </div>
    )
}


export default EditCommentModal
