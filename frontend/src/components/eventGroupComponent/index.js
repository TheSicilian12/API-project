import React from 'react';
import "./eventGroupComponent.css"
import '../UniversalCSS.css'

export default function EventGroupComponent({ previewImage, info }) {
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
            <div>
                <h1 className='GroupDetails_Details_GroupName textWrap'>
                    {`${info.group.singleGroup.name}`} test
                </h1>
                <h4 className='GroupDetails_Details_Location'>
                    {`${info.group.singleGroup.city}, ${info.group.singleGroup.state}`}
                </h4>
                <div className='displayFlex alignCenter'>
                    <h4 >
                        {`${info.numEvents} events`}
                    </h4>
                    <h4 className='dotSpacing'>•</h4>
                    <h4 >
                        {info.groupStatus}
                    </h4>
                </div>
                <h4>
                    {`Organized by ${info.group.singleGroup.Organizer.firstName} ${info.group.singleGroup.Organizer.lastName}`}
                </h4>
            </div>
        </div>
    )
}
