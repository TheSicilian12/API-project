import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./CommentComponent.css"
import OpenModalButton from "../OpenModalButton";
import DeleteCommentModal from "../DeleteCommentModal";
import EditCommentModal from "../EditCommentModal";
import { clearCommentState } from "../../store/commentsThunk";

function CommentComponent({ comments }) {
    const dispatch = useDispatch()

    const user = useSelector((state) => state.session.user)
    const commentTest = useSelector((state) => state.comments)

    useEffect(() => {
        dispatch(clearCommentState())
    }, [])

    // if (comments.length === 0) return (null)
    if (commentTest.length === 0) return (null)

    return (
        <div className="all-comment-container">
            {Object.values(commentTest).map(info =>
                <div
                    className="comment-container"
                    key={info.eventId}>
                    <div className="comment-text-container">
                        {info.comment}
                    </div>
                    <div className="comment-buttons-container">
                        {user && info.userId === user.id && <OpenModalButton
                            buttonText="Delete Comment"
                            modalComponent={<DeleteCommentModal eventId={info.eventId} />} />}
                        {user && info.userId === user.id && <OpenModalButton
                            buttonText="Edit Comment"
                            modalComponent={<EditCommentModal eventId={info.eventId} commentEdit={info.comment} />} />}
                    </div>
                </div>)}
        </div>
    );
}

export default CommentComponent;
