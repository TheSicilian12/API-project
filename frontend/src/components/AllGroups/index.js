import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './AllGroups.css';
import '../UniversalCSS.css';
import { getAllGroups } from '../../store/groupsThunk';
import EventsGroupsNav from "../EventsGroupsNav";
import groupDividerImage from '../assets/Images/Daco_4730261.png';
import RainbowLine from '../HorizontalLines/RainbowLine';

export default function AllGroups() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllGroups())
    }, [])

    const groups = useSelector((state) => state.groups)

    if (!groups.allGroups) {
        return <div>loading</div>
    }

    let imageData = 'https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg';

    return (
        <div className='AllGroups displayFlex flex-directionColumn UfontTreb' >
            <div className='displayFlex justifyCenter'>
                <p className='mainText eventGroupHeaderFontSize'>
                    Groups in AdventureUp
                </p>
            </div>
            {Object.keys(groups.allGroups).map(e =>

                <div key={`groups${groups.allGroups[e].id}`} className='displayFlex justifyCenter flex-directionColumn maintext'>
                    <div className='displayFlex justifyCenter'>
                        <RainbowLine />
                    </div>
                    <div className='displayFlex justifyCenter'>
                        <NavLink
                            className='noDecoration pointerCursor'
                            to={`/groups/${groups.allGroups[e].id}`}>
                            <div className='AllGroups_group displayFlex justifyCenter mainText pointerCursor'
                                key={`AllGroups_group${groups.allGroups[e].id}`}
                            >
                                <div className='image' key={`groups${groups.allGroups[e].id}`}>
                                    <img className='groupImage border-Radius15'
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
