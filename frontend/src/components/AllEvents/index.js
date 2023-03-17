import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './AllEvents.css';
/* imprt { getAllGroups } from '../../store/groupsThunk' */

export default function AllEvents() {
    const dispatch = useDispatch();

    useEffect(() => {
        // dispatch(getAllGroups());
    }, [])

    // const groups = useSelector((state) => state.groups)
    // const groups = useSelector((state) => state.groups)

    // if (!groups.allGroups) {
    //     return <div>loading</div>
    // }

    return (
        <div>tempory</div>
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
