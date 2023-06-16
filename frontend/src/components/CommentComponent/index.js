import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./CommentComponent.css"


function CommentComponent({comment}) {
    const user = useSelector((state) => state.session.user)

    if (comment.length === 0) return (null)


    console.log("comment: ", comment)
    return (
        <div>
        {Object.values(comment).map(info => <div>{info.comment}</div>)}
        </div>
    );
}

export default CommentComponent;
