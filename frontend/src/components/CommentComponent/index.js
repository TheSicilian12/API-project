import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./CommentComponent.css"
import OpenModalButton from "../OpenModalButton";
import DeleteCommentModal from "../DeleteCommentModal";

function CommentComponent({comments}) {
    const user = useSelector((state) => state.session.user)

    if (comments.length === 0) return (null)


    // console.log("comment: ", comment)
    return (
        <div>
        {Object.values(comments).map(info => <div>{info.comment}</div>)}
        <OpenModalButton
            buttonText="Delete Comment"
            modalComponent={<DeleteCommentModal />}/>
        </div>
    );
}

export default CommentComponent;
