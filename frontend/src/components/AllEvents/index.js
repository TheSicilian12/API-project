import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './AllEvents.css';
import { getAllEventsThunk } from '../../store/eventsThunk'

export default function AllEvents() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllEventsThunk());
    }, [])

    const events = useSelector((state) => state.events)

    // console.log('events: ', Object.values(events.allEvents))

    if (!events.allEvents) {
        return <div>loading</div>
    }

    return (
        <div className='AllGroups'>
            Events
            {Object.values(events.allEvents).map(e =>
                // <NavLink tp={}>
                <div>test</div>
            )}
        </div>

        // <div className='AllGroups'>
        //     Groups
        //     {Object.keys(groups.allGroups).map(e =>
        //         <NavLink to={`/groups/${groups.allGroups[e].id}`}>
        //             <div className='AllGroups_group'
        //                 key={`AllGroups_group${groups.allGroups[e].id}`}
        //                 >
        //                 <div className='image' key={`groups${groups.allGroups[e].id}`}>
        //                     {`${groups.allGroups[e].preivewImage}`}
        //                 </div>
        //                 <div className='details' key={`details_${groups.allGroups[e].name}`}>
        //                     <h2> {`${groups.allGroups[e].name}`}</h2>
        //                     <h4> {`${groups.allGroups[e].city}, ${groups.allGroups[e].state}`}</h4>
        //                     <p>{`${groups.allGroups[e].about}`}</p>
        //                 </div>
        //             </div>
        //         </NavLink>
        //     )}
        // </div>
    )
}
