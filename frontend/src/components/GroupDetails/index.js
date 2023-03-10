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

    const group = useSelector((state) => state.groups)

    // console.log('groups: ', groups)

    // if (!Object.keys(groups).length) {
    //     return <div> loading </div>
    // }

    if (!group.singleGroup) {
        return <div>loading</div>
    }

    // console.log('group status: ', group.singleGroup.private)
    let groupStatus = 'Public'
    if (group.singleGroup.private) {
        groupStatus = 'Private'
    }

    return (
        // <h1>test</h1>
        <div className='GroupDetails'>
            <div className='GroupDetails_GroupsButton'>
                <p>{'<'}</p>
                <NavLink to='/groups'>Groups</NavLink>
            </div>
            <div className='GroupDetails_Details'>
                <div className='GroupDetails_Details_image'>

                </div>
                <h1 className='GroupDetails_Details_GroupName'>
                    {`${group.singleGroup.name}`}
                </h1>
                <h4 className='GroupDetails_Details_Location'>
                    {`${group.singleGroup.city}, ${group.singleGroup.state}`}
                </h4>
                <div>
                    <h4>
                        Number of events still needed
                        {/* number of events */}
                    </h4>
                    <h4>
                       {groupStatus}
                    </h4>
                </div>
                <h4>
                    {`Organized by ${group.singleGroup.Organizer.firstName} ${group.singleGroup.Organizer.lastName}`}
                </h4>
                <button>
                    Join this group
                    {/* alert for no implementation */}
                </button>
            </div>
            <div>
                <h2>
                    Organizer
                </h2>
                <h4>
                {`${group.singleGroup.Organizer.firstName} ${group.singleGroup.Organizer.lastName}`}
                </h4>
                <h2>
                    What we're about
                </h2>
                <p>
                    {group.about}
                </p>
            </div>
            <div>
                <h2>
                    Upcoming Events still needed
                    {/* add in upcoming events */}
                </h2>
            </div>
            <div>
                <h2>
                    Past Events still needed
                    {/* add in past events */}
                </h2>
            </div>
        </div>

    )
}

export default GroupDetails;
