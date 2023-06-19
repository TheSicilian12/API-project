import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./CommentComponent.css"
import OpenModalButton from "../OpenModalButton";
import DeleteCommentModal from "../DeleteCommentModal";
import EditCommentModal from "../EditCommentModal";

function CommentComponent({ comments }) {
    const user = useSelector((state) => state.session.user)
    const commentTest = useSelector((state) => state.comments)

    if (comments.length === 0) return (null)

    Object.values(comments).map(info => console.log("info.comment: ", info.comment))

    return (
        <div>
            {Object.values(commentTest).map(info => <div key={info.eventId}>
                {info.comment}
                <OpenModalButton
                    buttonText="Delete Comment"
                    modalComponent={<DeleteCommentModal eventId = {info.eventId}/>} />
                <OpenModalButton
                    buttonText="Edit Comment"
                    modalComponent={<EditCommentModal eventId = {info.eventId} commentEdit = {info.comment} />} />
            </div>)}
        </div>
    );
}

export default CommentComponent;
