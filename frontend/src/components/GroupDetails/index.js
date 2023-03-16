import React from 'react';
import { useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './GroupDetails.css';
import { getGroup } from '../../store/groupsThunk'
import OpenModalDeleteGroupButton from '../DeleteGroupModalButton';
import DeleteGroupModal from '../DeleteGroupModal'
// import SignupFormModal from '../SignupFormModal';

function GroupDetails() {
    const { id } = useParams();
    const groupId = id;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getGroup(groupId));
    }, [])

    const group = useSelector((state) => state.groups)
    const user = useSelector((state) => state.session.user)

    // console.log('group: ', group)
    // console.log('user: ', user)

    if (!group.singleGroup) {
        return <div>loading</div>
    }

    let groupStatus = 'Public'
    if (group.singleGroup.private) {
        groupStatus = 'Private'
    }

    //determine the userStatus / display
    //organizer or creator, currently just checking if organizer
    let joinGroup = 'on'
    let options = 'off'
    // console.log('group - further: ', group.singleGroup)
    // console.log('user: ', user.id)

    if (user) {
        if (group.singleGroup.Organizer.id === user.id) {
            joinGroup = 'off'
            options = 'on'
        }
    }


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
                <div className={joinGroup}>
                    <button>
                        Join this group
                        {/* alert for no implementation */}
                    </button>
                </div>
                <div className={options}>
                    <NavLink to={`/groups/${groupId}/events/new`}>
                        <button>
                            Create event
                        </button>
                    </NavLink>
                    <NavLink to={`/groups/${groupId}/edit`}>
                        <button>
                            Update
                        </button>
                    </NavLink>
                    {/* <NavLink to='/test'>
                    <button>
                        Delete
                        {/* it really needs a pop up and then redirect *}
                    </button>
                    </NavLink> */}
                    <div>
                        <OpenModalDeleteGroupButton
                            buttonText="Delete"
                            modalComponent={<DeleteGroupModal />}
                        />
                    </div>
                </div>
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
