import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { allMembershipThunk, deleteMembershipThunk } from "../../store/membershipThunk";
import { getGroup } from "../../store/groupsThunk";
import "./UserGroupComponent.css"

function UserGroupComponent({group}) {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user)

    if (!group) return (<div>loading</div>)

    const leaveGroup = async () => {
        const payload = {
            user,
            groupId: group.id,
            memberId: group.membershipInfo.id
        }

        const deleteMembership = await dispatch(deleteMembershipThunk(payload))
    }
    // console.log("group: ", group)
    return (
        <div>
            {/* Divide based on membership status */}
            <NavLink
            to={`/groups/${group.id}`}>
            <img
                className="user-group-image-dimensions"
                src = {group.previewImage?.url}
                />
            hello {group.name}
                </NavLink>
            {group.membershipInfo.status}
            <button onClick={() => leaveGroup()}>
                Leave group
            </button>
        </div>
    );
}

export default UserGroupComponent;
