import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./CommentComponent.css"
import OpenModalButton from "../OpenModalButton";
import DeleteCommentModal from "../DeleteCommentModal";

function CommentComponent({ comments }) {
    const user = useSelector((state) => state.session.user)

    if (comments.length === 0) return (null)


    console.log("comments: ", comments)
    return (
        <div>
            {Object.values(comments).map(info => <div key={info.eventId}>
                {info.comment}
                <OpenModalButton
                    buttonText="Delete Comment"
                    modalComponent={<DeleteCommentModal eventId = {info.eventId}/>} />
            </div>)}
        </div>
    );
}

export default CommentComponent;
