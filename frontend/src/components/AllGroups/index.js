import React from 'react';
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './AllGroups.css';
import {getAllGroups} from '../../store/groupsThunk'

export default function AllGroups() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllGroups());
      }, [])

    return (
        <div className='AllGroups'>
            Groups
        </div>
    )
}
