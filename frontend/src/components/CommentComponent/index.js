import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./CommentComponent.css"


function CommentComponent({comments}) {
    const user = useSelector((state) => state.session.user)

    if (comments.length === 0) return (null)


    // console.log("comment: ", comment)
    return (
        <div>
        {Object.values(comments).map(info => <div>{info.comment}</div>)}
        </div>
    );
}

export default CommentComponent;
