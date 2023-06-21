import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import '../DeleteGroupModal'
import { addComment } from "../../store/commentsThunk";
import '../UniversalCSS.css';
import './AddCommentModal.css';

function AddCommentModal({ eventId }) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const history = useHistory();

    const user = useSelector((state) => state.session.user)

    const [comment, setComment] = useState("")
    const [displayCommentErr, setDisplayCommentErr] = useState("")

    const addCommentOnClick = async (e) => {
        e.preventDefault();

        const payload = {
            user,
            eventId,
            comment
        }

        let commentReturn = await dispatch(addComment(payload))
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
                className="add-comment-form-container"
                onSubmit={addCommentOnClick}
            >
                {(!displayCommentErr || !err.comment) && <h1>Comment</h1>}
                {displayCommentErr && err.comment && <h1 className="errors">Comment* {err.comment}</h1>}
                <textarea
                    className='add-comment-textarea'
                    type='text'
                    placeholder='comment'
                    value={comment}
                    onChange={(e) => {
                        setComment(e.target.value)
                        setDisplayCommentErr(true)
                    }}
                ></textarea>
                <button
                    className={`UpinkBorder UpurpleButton UfontTreb UbuttonSmallDimensions add-comment-button ${notAllowed}`}
                    type="submit"
                    disabled={Object.values(err).length > 0}
                >
                    Add Comment
                </button>
            </form>
        </div>
    )
}


export default AddCommentModal
