import React, { useEffect } from 'react';
import { useState } from 'react';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getGroup } from '../../store/groupsThunk';
import { getGroupEventsThunk } from '../../store/eventsThunk';
import GroupDetails from './index'

export default function GroupDetailsWrapper() {
    const { id } = useParams();
    const groupId = id;
    const dispatch = useDispatch();
    // console.log('EditWrapperRunning')

    useEffect(() => {
        dispatch(getGroup(groupId));
        dispatch(getGroupEventsThunk(groupId));
    }, [id])

    // useEffect(() => {
    //     dispatch(getGroupEventsThunk(groupId));
    // }, [])


    const group = useSelector((state) => state.groups)
    const user = useSelector((state) => state.session.user)
    const events = useSelector((state) => state.events)
    // const eventSlice = ''

    // const events = eventSlice ? eventSlice : false;
    // let events = 'test'

    if (!group.singleGroup) {
        return <div>loading</div>
    }


    // console.log('wrapper events: ', events['1']?.endDate)
    // if (!events['1']) {
    //     console.log('no events')
    // }

    return (
        <GroupDetails group={group} user={user} events={events} groupId={groupId}/>
    )

}
