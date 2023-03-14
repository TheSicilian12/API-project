import React from 'react';
import { useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './GroupDetails.css';
import { getGroup } from '../../store/groupsThunk'

function GroupDetails() {
    const { id } = useParams();
    const groupId = id;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getGroup(groupId));
    }, [])

    const groups = useSelector((state) => state.groups)

    if (!Object.keys(groups).length) {
        return <div> loading </div>
    }

    const group = groups.group.groups.singleGroup
    console.log('groups: ', group)

    return (
        <div className='GroupDetails'>
            <div className='GroupDetails_GroupsButton'>
                <p>{'<'}</p>
                <NavLink to='/groups'>Groups</NavLink>
            </div>
            <div className='GroupDetails_Details'>
                <div className='GroupDetails_Details_image'>

                </div>
                <h1 className='GroupDetails_Details_GroupName'>
                    {`${group.name}`}
                </h1>
                <h4 className='GroupDetails_Details_Location'>
                    {`${group.city}, ${group.state}`}
                </h4>
                <div>
                    <h4>
                        {/* number of events */}
                    </h4>
                    <h4>
                        {/* public/private status */}
                    </h4>
                </div>
                <h4>
                    {`Organized by ${group.Organizer.firstName} ${group.Organizer.lastName}`}
                </h4>
                <button>
                    Join this group
                    {/* alert for no implementation */}
                </button>
            </div>
        </div>

    )
}

export default GroupDetails;
