import React, { useState } from "react";
import { useDispatch } from "react-redux";



function UserGroupPage() {
  const dispatch = useDispatch();

  return (
    <div>
        <div>
            Groups you manage
        </div>
        <div>
            Groups you're part of

        </div>
    </div>
  );
}

export default UserGroupPage;
