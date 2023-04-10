import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './AllGroups.css';
import { getAllGroups } from '../../store/groupsThunk';

export default function AllGroups() {
    const dispatch = useDispatch();

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
    console.log('groups: ', groups)
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
            <div className='displayFlex justifyCenter borderBlack'>
                <p className='borderGreen mainText'>
                    Groups in AdventureUp
                </p>
            </div>
            {Object.keys(groups.allGroups).map(e =>

                <NavLink to={`/groups/${groups.allGroups[e].id}`}>
                    {/* {groups.allGroups[e].previewImage ? imageData = groups.allGroups[e].previewImage : imageData = imageData} */}
                    <div className='AllGroups_group borderBlack displayFlex justifyCenter'
                        key={`AllGroups_group${groups.allGroups[e].id}`}
                    >
                        <div className='image' key={`groups${groups.allGroups[e].id}`}>
                            <img className='groupImage borderRed'
                                //super cool!
                                src={groups.allGroups[e].preivewImage || imageData}
                            />
                        </div>
                        <div className='details borderRed groupInfo' key={`details_${groups.allGroups[e].name}`}>
                            <h2 className='textWrap borderGreen'> {`${groups.allGroups[e].name}`}</h2>
                            <h4 className='textWrap borderGreen'> {`${groups.allGroups[e].city}, ${groups.allGroups[e].state}`}</h4>
                            <p className='textWrap borderGreen'>{`${groups.allGroups[e].about}`}</p>
                            <div>
                            <p className='borderGreen'>{groups.allGroups[e].events.length} events</p>
                            <i class="fa-solid fa-circle style=color: #000000;"></i>
                            <p className='borderGreen'>{groups.allGroups[e].private ? 'Private' : 'Public'}</p>
                            </div>
                        </div>
                        <div>
                        </div>
                    </div>
                </NavLink>
            )}
        </div>
    )
}
