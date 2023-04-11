import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './AllGroups.css';
import { getAllGroups } from '../../store/groupsThunk';
import EventsGroupsNav from "../EventsGroupsNav";
import groupDividerImage from '../assets/Images/Daco_4730261.png';

export default function AllGroups() {
    const dispatch = useDispatch();
    // console.log('useParams: ', useParams())


    // useEffect(() => {
    //     dispatch(getAllGroups());
    // }, [])

    useEffect(() => {
        dispatch(getAllGroups())
    }, [])

    // const groups = useSelector((state) => state.groups)
    const groups = useSelector((state) => state.groups)
    // const groupEvents = useSelector((state) => state.groups.allGroups)

    if (!groups.allGroups) {
        return <div>loading</div>
    }
    // console.log('groups: ', groups)
    // if (!Object.values(groupEvents)[0].events) {
    //     return <div>loading</div>
    // }

    let imageData = 'https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg';

    // let groupEvents = {};
    // if (groups.allGroups['1'].events) {
    //     console.log('groups: ', Object.values(groups.allGroups['1']?.events).length)
    // } else console.log('something went wrong')

    // console.log('groups: ', groups.allGroups['1']?.events)
    // console.log('groupEvents: ', Object.values(groupEvents)[0].events)
    return (
        <div className='AllGroups displayFlex flex-directionColumn' >
            <div className='displayFlex justifyCenter'>
                <p className='mainText textSizeGroup'>
                    Groups in AdventureUp
                </p>
            </div>
            {Object.keys(groups.allGroups).map(e =>

                <div className='displayFlex justifyCenter flex-directionColumn maintext'>
                    <div className='displayFlex justifyCenter'>
                        <img
                            className='dividerPadding'
                            height='25%'
                            width='25%'

                            src={groupDividerImage}
                        />
                    </div>
                    <div className='displayFlex justifyCenter'>
                        <NavLink to={`/groups/${groups.allGroups[e].id}`}>
                            {/* {groups.allGroups[e].previewImage ? imageData = groups.allGroups[e].previewImage : imageData = imageData} */}
                            <div className='AllGroups_group displayFlex justifyCenter mainText pointerCursor'
                                key={`AllGroups_group${groups.allGroups[e].id}`}
                            >
                                <div className='image' key={`groups${groups.allGroups[e].id}`}>
                                    <img className='groupImage'
                                        //super cool!
                                        src={groups.allGroups[e].preivewImage || imageData}
                                    />
                                </div>
                                <div className='details groupInfo noDecoration' key={`details_${groups.allGroups[e].name}`}>
                                    <h2 className='textWrap noDecoration'> {`${groups.allGroups[e].name}`}</h2>
                                    <h4 className='textWrap'> {`${groups.allGroups[e].city}, ${groups.allGroups[e].state}`}</h4>
                                    <p className='textWrap'>{`${groups.allGroups[e].about}`}</p>

                                    <div className='displayFlex'>
                                        <p className='alignCenter'>{groups.allGroups[e].events.length} events  </p>

                                        {/* <i class="fa-solid fa-circle fa-2xs style=color: #000000; borderGreen displayFlex alignCenter"></i> */}
                                        <p className='displayFlex justifyCenter dotSpacing dotWeight alignCenter'>·</p>
                                        <p className='alignCenter'>{groups.allGroups[e].private ? 'Private' : 'Public'}</p>
                                    </div>
                                </div>
                                <div>
                                </div>
                            </div>
                        </NavLink>
                    </div>
                </div>
            )}
        </div>
    )
}
