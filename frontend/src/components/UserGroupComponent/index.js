import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allMembershipThunk } from "../../store/membershipThunk";
import { getGroup } from "../../store/groupsThunk";

function UserGroupComponent({groupId}) {
    const dispatch = useDispatch();
    const groups = useSelector((state) => state.groups)

    console.log("groups: ", groups.singleGroup.name)

    useEffect(() => {
        dispatch(getGroup(groupId))
    }, [])

    return (
        <div>
            hello {groups?.singleGroup.name}
        </div>
    );
}

export default UserGroupComponent;
