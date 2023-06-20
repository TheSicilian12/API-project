import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { allMembershipThunk, deleteMembershipThunk } from "../../store/membershipThunk";
import { getGroup } from "../../store/groupsThunk";
import "./UserGroupComponent.css"

function UserGroupComponent({ group }) {
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
        <div className="user-group-group-component">
            {/* Divide based on membership status */}
            <NavLink
                className="user-group-navlink"
                to={`/groups/${group.id}`}>
                <img
                    className="user-group-image-dimensions"
                    src={group.previewImage?.url}
                />
                <div className="user-group-info-component">
                    <div className="user-group-text-info">
                        <div className="user-group-group-name">{group.name}</div>
                        <div className="user-group-membership-status">{group.membershipInfo.status}</div>
                    </div>
                    <button
                        className="UfontTreb UpurpleButton UpinkBorder"
                        onClick={() => leaveGroup()}>
                        Leave group
                    </button>
                </div>
            </NavLink>
        </div>
    );
}

export default UserGroupComponent;
