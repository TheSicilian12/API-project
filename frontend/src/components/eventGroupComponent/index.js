import React from 'react';
import { NavLink } from 'react-router-dom';

import OpenModalDeleteGroupButton from '../DeleteGroupModalButton';
import DeleteGroupModal from '../DeleteGroupModal';

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
            <div className="image">
                <img
                    className='border-Radius15 eventGroup-mainImage'
                    src={previewImage?.url || imageData}
                />
            </div>
            <div className="eventGroup-info">
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
            </div>
        </div>
    )
}
