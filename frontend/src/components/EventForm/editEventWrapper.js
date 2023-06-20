import React, { useEffect } from 'react';
import { useState } from 'react';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { submitGroup, editGroupThunk, getGroup } from '../../store/groupsThunk';
import GroupForm from './index'


export default function EditEventWrapper() {
    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getGroup(id));
    }, [id])

    const currentGroup = useSelector((state) => state.groups.singleGroup);
    if (!currentGroup) return null;

    return (
        <GroupForm currentGroup={currentGroup} formType={'edit'}/>
    )

}
