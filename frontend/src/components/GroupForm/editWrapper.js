import React, { useEffect } from 'react';
import { useState } from 'react';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { submitGroup, editGroupThunk, getGroup } from '../../store/groupsThunk';
import GroupForm from './index'


export default function EditWrapper() {
    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getGroup(id));
    }, [id])

    const currentGroup = useSelector((state) => state.groups.singleGroup);
    if (!currentGroup) return null;

    const previewImage = []
    currentGroup.GroupImages.find(image => {if (image.preview === true) previewImage.push(image)})

    return (
        <GroupForm currentGroup={currentGroup} formType={'edit'} previewImage={previewImage}/>
    )

}
