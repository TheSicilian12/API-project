import React from 'react';
import { NavLink } from 'react-router-dom';

import OpenModalDeleteGroupButton from '../DeleteGroupModalButton';
import DeleteGroupModal from '../DeleteGroupModal';
import clockImage from '../assets/Images/ATWP.webp'

import "./eventGroupComponent.css"
import '../UniversalCSS.css'

export default function EventGroupComponent({ type, previewImage, info }) {
    // const [group, numEvents, groupStatus] = info;

    let imageData = 'https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg';


    // if (!group.singleGroup) {
    //     return <div>loading</div>
    // }


    // console.log("group: ", group)

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
                <div className="eventGroup-info">
                    {/* group */}
                    {type === "group" &&
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

                            <div className={`${info.displayJoinGroup} ${info.hideJoinGroup} eventGroup-button`}>
                                <button
                                    className='UgrayButton UbuttonDimensions border-Radius15 UfontTreb'
                                    onClick={() => alert('Feature coming soon')}
                                    disabled={`${info.joinGroup}` === 'true' ? true : false}
                                >
                                    Join this group
                                    {/* alert for no implementation */}
                                </button>
                            </div>

                            <div className={`${info.options} eventGroup-button`}>
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
                            </div>
                        </div>}

                    {/* event */}
                    {type === "event" &&
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
                            <div>
                                <img
                                    //group image
                                    className='border-Radius15'
                                    src={info.groupPreviewImage || imageData}
                                    width='300px'
                                    heigth='200px'
                                />
                                <div>
                                    <h4 className='textWrap'>{info.event.Group?.name}</h4>
                                    <h4>{info.event.Group?.private === true ? 'Private' : 'Public'}</h4>
                                </div>
                            </div>

                            <div>
                                <img
                                    width='100px'
                                    height='150px'
                                    src={clockImage}
                                />
                                <div>
                                    {<h4>{new Date(info.event?.startDate).toUTCString().split(' ')[0].split(',')[0]}. {new Date(info.event?.startDate).toUTCString().split(' ')[2]} {new Date(info.event?.startDate).toUTCString().split(' ')[1]}, {new Date(info.event?.startDate).toUTCString().split(' ')[3]}</h4>}
                                    <h4 className='dotSpacing'>•</h4>
                                    {/* military time */}
                                    {<h4>{new Date(info.event?.startDate).toUTCString().split(' ')[4]}</h4>}
                                </div>
                            </div>
                            <div>
                                <h4>
                                    END:
                                </h4>
                                {/* date */}
                                {<h4>{new Date(info.event?.endDate).toUTCString().split(' ')[0].split(',')[0]}. {new Date(info.event?.endDate).toUTCString().split(' ')[2]} {new Date(info.event?.endDate).toUTCString().split(' ')[1]}, {new Date(info.event?.endDate).toUTCString().split(' ')[3]}</h4>}
                                <h4 className='dotSpacing'>•</h4>
                                {/* military time */}
                                {<h4>{new Date(info.event?.endDate).toUTCString().split(' ')[4]}</h4>}
                            </div>
                            <div className='displayFlex alignCenter'>
                                <div className='moneyDimensions displayFlex justifyCenter'>
                                    <i className="fa-solid fa-dollar-sign fa-2xl style=color: #000000;"></i>
                                </div>
                                <h4 className='timeEventSpacing'>{info.event?.price > 0 ? `$${info.event?.price}` : 'FREE'}</h4>
                            </div>

                            <div className='displayFlex alignCenter'>
                                <div className='moneyDimensions displayFlex justifyCenter'>
                                    {/* <i class="fa-solid fa-map-pin fa-2xl style=color: #000000;"></i> */}
                                    <i className="fa-solid fa-map-pin fa-2xl style=color: #000000;"></i>
                                </div>
                                <h4>{info.event?.type}</h4>

                            </div>

                            {/* <div className={`${info.options} eventGroup-button`}>
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
                            </div> */}
                        </div>}

                </div>
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
