import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allMembershipThunk } from "../../store/membershipThunk";
import { getGroup } from "../../store/groupsThunk";

function UserGroupComponent({group}) {
    const dispatch = useDispatch();

    return (
        <div>
            hello {group.name}
            {/*  */}
        </div>
    );
}

export default UserGroupComponent;
