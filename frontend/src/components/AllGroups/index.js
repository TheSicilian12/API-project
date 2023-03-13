import React from 'react';
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './AllGroups.css';
import {getAllGroups} from '../../store/groupsThunk'

export default function AllGroups() {
    const dispatch = useDispatch();

    // const groups = useSelector((state) => state.AllGroups)
    // console.log('test function AllGroups')
    // console.log('groups test: ', groups)

    useEffect(() => {
        // console.log('useEffect test')
        dispatch(getAllGroups());
    }, [])

    const groups = useSelector((state) => state.groups)

    if (!Object.keys(groups).length) {
       return <div> loading </div>
    }
    // console.log('state test groups: ', groups.allGroups)

    // if (Object.keys(groups).length) {
    // console.log('test: ', Object.keys(groups.allGroups))
    console.log('key 1: ', groups.allGroups['1'])
    // }

//{Object.keys(groups.allGroups).map(e => console.log(e))}
    return (
        <div className='AllGroups'>
            Groups


            {Object.keys(groups.allGroups).map(e =>
                <div className={`AllGroups_group${groups.allGroups[e].id}`}>
                    <div className='image'>
                        {`${groups.allGroups[e].preivewImage}`}
                    </div>
                </div>
            )}

            {/* {[1, 2, 3, 4].map(e => <div>{e}</div>)} */}

            <div>test</div>
        </div>
    )
}
