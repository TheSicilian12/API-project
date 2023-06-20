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
            <div className="displayFlex">
                <NavLink
                    to={`/groups/${group.id}`}>
                    <img
                        className="user-group-image-dimensions"
                        src={group.previewImage?.url}
                    />
                </NavLink>
                <div className="user-group-info-component">
                    <div className="user-group-text-info">
                        <NavLink
                            className="user-group-navlink "
                            to={`/groups/${group.id}`}>
                            <div className="user-group-group-name">{group.name}</div>
                            <div className="user-group-membership-status">{group.membershipInfo.status}</div>
                        </NavLink>
                    </div>
                    <button
                        className="UfontTreb UpurpleButton UpinkBorder"
                        onClick={() => leaveGroup()}>
                        Leave group
                    </button>
                </div>
            </div>
        </div>
    );
}

export default UserGroupComponent;
