import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

import { automaticMembershipThunk, membershipsThunk } from '../../store/membershipThunk';
import OpenModalDeleteGroupButton from '../DeleteGroupModalButton';
import DeleteGroupModal from '../DeleteGroupModal';
import clockImage from '../assets/Images/ATWP.webp'

import "./eventGroupComponent.css"
import '../UniversalCSS.css'
import DeleteEventModal from '../DeleteEventModal';
import OpenModalButton from '../OpenModalButton';

export default function EventGroupComponent({ type, previewImage, info }) {
    // const [group, numEvents, groupStatus] = info;
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.session.user);
    const membership = useSelector(state => state.memberships.membership);

    // let membership = dispatch(membershipIdThunk(payload))

    let imageData = 'https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg';

    useEffect(() => {
        const payload = {
            groupId: info.groupId,
            user: user
        }
        dispatch(membershipsThunk(payload));
    }, [])

    async function joinGroup() {
        const payload = {
            groupId: info.groupId,
            membership: membership,
            user: user
        }
        const payloadTwo = {
            groupId: info.groupId,
            user: user
        }

        const autoMember = await dispatch(automaticMembershipThunk(payload))
        const member = await dispatch(membershipsThunk(payloadTwo));

        // const test =  await dispatch(membershipsThunk(payload));
    }

    const editEvent = () => {
        history.push(`/groups/${info.event.groupId}/events/${info.event.id}/edit`)
    }

    // if (!group.singleGroup) {
    //     return <div>loading</div>
    // }

    return (
        <div className="eventGroup-container">

            {type === "event" && <div>
                <h1>{info.event.name}</h1>
                <h4>Hosted by {`${info.organizer?.firstName} ${info.organizer?.lastName}`}</h4>
            </div>}

            <div className="eventGroup-image-info-container">
                <div className="image">
                    {type === "group" && <img
                        className='eventGroup-mainImage'
                        src={previewImage?.url || imageData}
                    />}
                    {type === "event" && <img
                        className='eventGroup-mainImage'
                        src={previewImage || imageData}
                    />}
                </div>
                {/* group */}
                {type === "group" &&
                    <div className="eventGroup-info">
                        <div className="eventGroup-group eventGroup-info-button">
                            <div>
                                <h1 className='GroupDetails_Details_GroupName textWrap'>
                                    {`${info.group.singleGroup.name}`} test
                                </h1>
                                <h4 className='eventGroup-info-color'>
                                    {`${info.group.singleGroup.city}, ${info.group.singleGroup.state}`}
                                </h4>
                                <div className='eventGroup-info-color eventGroup-events'>
                                    <h4 >
                                        {`${info.numEvents} events`}
                                    </h4>
                                    <h4 className='eventGroup-info-color dotSpacing'>•</h4>
                                    <h4 className="eventGroup-info-color">
                                        {info.groupStatus}
                                    </h4>
                                </div>
                                <h4 className="eventGroup-info-color">
                                    {`Organized by ${info.group.singleGroup.Organizer.firstName} ${info.group.singleGroup.Organizer.lastName}`}
                                </h4>
                            </div>

                            {/* <div className={`${info.displayJoinGroup} ${info.hideJoinGroup} eventGroup-button`}> */}
                            <div className={`eventGroup-button`}>
                                {user &&
                                (membership?.status === "Not a member" || membership?.status === "pending") &&
                                    <button
                                    className='UgrayButton UbuttonDimensions border-Radius15 UfontTreb'
                                    onClick={() => joinGroup()}
                                    disabled={`${info.joinGroup}` === 'true' ? true : false}
                                >
                                    Join this group
                                    {/* alert for no implementation */}
                                </button>}
                                {membership &&
                                (membership?.status === "member" || membership?.status === "co-host") &&
                                    <button
                                    className='UgoldButton UbuttonDimensions border-Radius15 UfontTreb'
                                    onClick={() => alert("You're a member!")}
                                    disabled={`${info.joinGroup}` === 'true' ? true : false}
                                >
                                    Member
                                    {/* {membership?.status} */}
                                    {/* alert for no implementation */}
                                </button>}
                            </div>

                            {membership &&
                            membership?.status === "host" &&
                            <div className={`eventGroup-button`}>
                                <div className='displayFlex justifySpaceAround eventInfo emergencyPaddingTop'>

                                    <NavLink to={`/groups/${info.groupId}/events/new`}>
                                        <button
                                            className='UpinkBorder UpurpleButton UfontTreb UbuttonCreateDimensions'
                                        >
                                            Create event
                                        </button>
                                    </NavLink>
                                    <NavLink to={`/groups/${info.groupId}/edit`}>
                                        <button
                                            className='UpinkBorder UpurpleButton UfontTreb UbuttonSmallDimensions'
                                        >
                                            Update
                                        </button>
                                    </NavLink>
                                    <div>
                                        <OpenModalDeleteGroupButton
                                            buttonText="Delete"
                                            modalComponent={<DeleteGroupModal groupId={info.groupId} />}
                                        />
                                    </div>
                                </div>
                            </div>}
                        </div>
                    </div>
                }

                {/* event */}
                {type === "event" &&
                    <div className="eventGroup-info eventGroup-info-event-width">
                        <div className="eventGroup-group eventGroup-info-button">
                            {/* <div>
                                <h1 className='GroupDetails_Details_GroupName textWrap'>
                                    {`${info.group.singleGroup.name}`} test
                                </h1>
                                <h4 className='eventGroup-info-color'>
                                    {`${info.group.singleGroup.city}, ${info.group.singleGroup.state}`}
                                </h4>
                                <div className='eventGroup-info-color eventGroup-events'>
                                    <h4 >
                                        {`${info.numEvents} events`}
                                    </h4>
                                    <h4 className='eventGroup-info-color dotSpacing'>•</h4>
                                    <h4 className="eventGroup-info-color">
                                        {info.groupStatus}
                                    </h4>
                                </div>
                                <h4 className="eventGroup-info-color">
                                    {`Organized by ${info.group.singleGroup.Organizer.firstName} ${info.group.singleGroup.Organizer.lastName}`}
                                </h4>
                            </div> */}
                            <div className="displayFlex">
                                <img
                                    //group image
                                    className='border-Radius15'
                                    src={info.groupPreviewImage || imageData}
                                    width='300px'
                                    height='200px'
                                />
                                <div className="eventGroup-eventGroup-info">
                                    <h4 className='textWrap'>{info.event.Group?.name}</h4>
                                    <h4>{info.event.Group?.private === true ? 'Private' : 'Public'}</h4>
                                </div>
                            </div>


                            <div className="displayFlex">
                                <img
                                    width='80px'
                                    height='120px'
                                    src={clockImage}
                                />
                                <div className="eventGroup-time-info eventGroup-bold">
                                    <div className="displayFlex">
                                        {<h4>START: {new Date(info.event?.startDate).toUTCString().split(' ')[0].split(',')[0]}. {new Date(info.event?.startDate).toUTCString().split(' ')[2]} {new Date(info.event?.startDate).toUTCString().split(' ')[1]}, {new Date(info.event?.startDate).toUTCString().split(' ')[3]}</h4>}
                                        <h4 className='dotSpacing'>•</h4>
                                        {/* military time */}
                                        {<h4>{new Date(info.event?.startDate).toUTCString().split(' ')[4]}</h4>}
                                    </div>
                                    <div className="displayFlex">
                                        {/* date */}
                                        {<h4>END: {new Date(info.event?.endDate).toUTCString().split(' ')[0].split(',')[0]}. {new Date(info.event?.endDate).toUTCString().split(' ')[2]} {new Date(info.event?.endDate).toUTCString().split(' ')[1]}, {new Date(info.event?.endDate).toUTCString().split(' ')[3]}</h4>}
                                        <h4 className='dotSpacing'>•</h4>
                                        {/* military time */}
                                        {<h4>{new Date(info.event?.endDate).toUTCString().split(' ')[4]}</h4>}
                                    </div>
                                </div>
                            </div>
                            <div className="eventGroup-cost-location">
                                <div className='displayFlex alignCenter'>
                                    <div className='moneyDimensions displayFlex justifyCenter'>
                                        <i className="fa-solid fa-dollar-sign fa-2xl style=color: #000000;"></i>
                                    </div>
                                    <h4 className='eventGroup-margin eventGroup-bold'>{info.event?.price > 0 ? `$${info.event?.price}` : 'FREE'}</h4>
                                </div>

                                <div className='displayFlex alignCenter eventGroup-bold eventGroup-margin'>
                                    <div className='moneyDimensions displayFlex justifyCenter'>
                                        {/* <i class="fa-solid fa-map-pin fa-2xl style=color: #000000;"></i> */}
                                        <i className="fa-solid fa-map-pin fa-2xl style=color: #000000;"></i>
                                    </div>
                                    <h4 className="eventGroup-margin">{info.event?.type}</h4>
                                </div>
                                <div className='displayFlex alignCenter eventGroup-bold eventGroup-margin'>
                                    <div className='moneyDimensions displayFlex justifyCenter'>
                                        {/* <i class="fa-solid fa-map-pin fa-2xl style=color: #000000;"></i> */}
                                        <i className="fa-solid fa-map-pin fa-2xl style=color: #000000;"></i>
                                    </div>
                                    <h4 className="eventGroup-margin">{info.event?.status}</h4>
                                </div>
                            </div>

                            <div className="eventGroup-edit-buttons">
                                <div className='displayFlex justifySpaceAround eventInfo emergencyPaddingTop'>

                                    {/* <NavLink to={`/groups/${info.event.id}/events/new`}>
                                        <button
                                            className={`${info.options} UpinkBorder UpurpleButton UfontTreb UbuttonCreateDimensions`}
                                        >
                                            Create event
                                        </button>
                                    </NavLink> */}
                                    {/* <NavLink to={`/groups/${info.event.id}/events/new`}> */}

                                    {/* Edit an event does not work */}
                                    {/* <NavLink to={`/events/${info.event.id}/edit`}>
                                        <button
                                            className={`${info.options} UpinkBorder UpurpleButton UfontTreb UbuttonSmallDimensions`}
                                        >
                                            Update
                                        </button>
                                    </NavLink> */}
                                    <button
                                        className={`${info.options} UpinkBorder UpurpleButton UfontTreb UbuttonSmallDimensions`}
                                        onClick={() => editEvent()}>
                                        Update</button>
                                    <div className={`${info.options}`}>
                                        <OpenModalDeleteGroupButton
                                            buttonText="Delete"
                                            modalComponent={<DeleteEventModal eventId={info.event.id} groupId={info.event?.Group.id}/>}
                                        />
                                    </div>
                                </div>
                            </div>



                        </div>
                    </div>}

            </div>

            {type === "group" && <div className='eventGroup-overall-info'>
                <div className=''>
                    <h2>
                        Organizer
                    </h2>
                    <h4>
                        {`${info.group.singleGroup.Organizer.firstName} ${info.group.singleGroup.Organizer.lastName}`}
                    </h4>
                    <h2>
                        What we're about
                    </h2>
                    <p className='textWrap'>
                        {info.group.singleGroup.about}
                    </p>
                </div>
            </div>}
        </div>
    )
}
