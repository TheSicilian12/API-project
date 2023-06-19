import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import '../DeleteGroupModal'
import { addComment, deleteComment } from "../../store/commentsThunk";
import '../UniversalCSS.css';
import './DeleteCommentModal.css';

function DeleteCommentModal({ eventId }) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const history = useHistory();

    const user = useSelector((state) => state.session.user)

    const [comment, setComment] = useState("")
    const [commentErr, setCommentErr] = useState("")

    const deleteHandler = async (e) => {
        e.preventDefault();
        console.log("delete comment button")
        const payload = {
            user,
            eventId
        }

        let deletion = await dispatch(deleteComment(payload))
        closeModal();
        console.log("deletion: ", deletion)
    }


    return (
        <div>
            <h1>Confirm Delete</h1>
            <button
                onClick={deleteHandler}>
                Yes (Delete Comment)
            </button>
            <button
                onClick={closeModal}>
                No (Keep Comment)
            </button>
        </div>
    )
}


export default DeleteCommentModal
