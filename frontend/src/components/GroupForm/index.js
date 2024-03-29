import React, { useEffect } from 'react';
import { useState } from 'react';
import { NavLink, useHistory, useLocation, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './GroupForm.css';
import '../UniversalCSS.css'
import { submitGroup, editGroupThunk, getGroup } from '../../store/groupsThunk';
import { EditWrapper } from './editWrapper';
import formDividerImage from '../assets/Images/rainbow-removebg-preview_1.png';
import RainbowLine from '../HorizontalLines/RainbowLine';
// frontend/src/components/assets/Images/rainbow-removebg-preview_1.png


function GroupForm({ currentGroup, formType, previewImage }) {
    const history = useHistory();
    const user = useSelector((state) => state.session.user)
    const membership = useSelector(state => state.memberships.membership);

    // const [location, setLocation] = useState(currentGroup.id ? `${currentGroup.city}, ${currentGroup.state}` : "");
    // const [displayLocErr, setDisplayLocErr] = useState(false);

    const [city, setCity] = useState(currentGroup.id ? `${currentGroup.city}` : "");
    const [displayCityErr, setDisplayCityErr] = useState(false);

    const [state, setState] = useState(currentGroup.id ? `${currentGroup.state}` : "");
    const [displayStateErr, setDisplayStateErr] = useState(false);


    const [groupName, setGroupName] = useState(currentGroup.id ? currentGroup.name : "");
    const [displayGroupNameErr, setDisplayGroupNameErr] = useState(false);
    const [groupAbout, setGroupAbout] = useState(currentGroup.id ? currentGroup.about : "");
    const [displayGroupAboutErr, setDisplayGroupAboutErr] = useState(false);
    const [groupMeetingType, setGroupMeetingType] = useState(currentGroup.id ? currentGroup.type : '(select one)');
    const [displayGroupMeetingTypeErr, setDisplayGroupMeetingTypeErr] = useState(false);
    const [groupStatus, setGroupStatus] = useState(currentGroup.id ? currentGroup.private : '(select one)');
    const [displayGroupStatusErr, setDisplayGroupStatusErr] = useState(false);
    const [groupImage, setGroupImage] = useState((previewImage && previewImage.length > 0) ? previewImage[0].url : '');
    const [displayGroupImageErr, setDisplayGroupImageErr] = useState(false);
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();

    if (!user) {
        history.push('/')
    }

    if (formType === "edit" && (!user || user.id !== currentGroup.organizerId)) {
        history.push('/')
    }

    let editForm = 'off';
    let newForm = 'off';
    formType === 'new' ? newForm = 'on' : editForm = 'on'

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errors = {};
        if (!city) {
            errors.city = 'A city is required'
        }
        if (!state) {
            errors.state = 'A state is required'
        }
        if (!groupName) {
            errors.name = 'Name is required'
        }
        if (groupName && groupName.length > 60) {
            errors.name = 'Name must be 60 characters or less';
        }
        if (groupAbout.length < 30) {
            errors.about = 'Description must be at least 30 characters long'
        }
        if (formType === 'new' || groupImage) {
            let imageCheckArr = groupImage.split('.')
            let imageCheckVal = imageCheckArr[imageCheckArr.length - 1];
            if (imageCheckVal !== 'png' &&
                imageCheckVal !== 'jpg' &&
                imageCheckVal !== 'jpeg') {
                errors.image = 'Image URL must end in .png, .jpg, or .jpeg'
            }
        }
        if (groupMeetingType !== 'In person' &&
            groupMeetingType !== 'Online') {
            errors.meetingType = 'Group Type is required';
        }
        if (groupStatus === '(select one)') {
            errors.groupStatus = 'Visibility Type is required'
        }

        if (Object.keys(errors).length > 0) setErrors(errors);

        if (Object.keys(errors).length === 0) {

            const payload = {
                city,
                state,
                name: groupName,
                about: groupAbout,
                type: groupMeetingType,
                private: groupStatus,
                url: groupImage,
                groupId: currentGroup.id
            }

            let createGroup;
            if (formType === 'new') {
                createGroup = await dispatch(submitGroup(payload));
            }

            let updateGroup;
            if (formType === 'edit') {
                payload.groupId = currentGroup.id
                updateGroup = await dispatch(editGroupThunk(payload));
            }

            if (createGroup) {
                history.push(`/groups/${createGroup.id}`)
            }
            if (updateGroup) {
                history.push(`/groups/${currentGroup.id}`)
            }
        }
    }

    let err = {};
    if (!city) {
        err.city = 'A city is required'
    }
    if (!state) {
        err.state = 'A state is required'
    }
    if (!groupName) {
        err.name = 'Name is required'
    }
    if (groupName.length > 60) {
        err.name = 'Name must be 60 characters or less';
    }
    if (groupAbout.length < 30) {
        err.about = 'Description must be at least 30 characters long'
    }
    if (formType === 'new' || groupImage) {
        let imageCheckArr = groupImage.split('.')
        let imageCheckVal = imageCheckArr[imageCheckArr.length - 1];
        if (imageCheckVal !== 'png' &&
            imageCheckVal !== 'jpg' &&
            imageCheckVal !== 'jpeg') {
            err.image = 'Image URL must end in .png, .jpg, or .jpeg'
        }
    }
    if (groupMeetingType !== 'In person' &&
        groupMeetingType !== 'Online') {
        err.meetingType = 'Group Type is required';
    }
    if (groupStatus === '(select one)') {
        err.groupStatus = 'Visibility Type is required'
    }

    let disabled = 'UpurpleButton';
    if (Object.values(err).length > 0) {
        // disabled = 'not-allowedCursor UgrayButton';
        disabled = 'not-allowedCursor disabledButton';
    }

    let hideImageUpdate = 'Ushow';
    if (formType === 'edit') {
        hideImageUpdate = 'Uhide';
    }

    return (
        <div className='displayFlex justifyCenter marginFormTop UfontTreb'>
            <form
                className='displayFlex flex-directionColumn formWidth UnoBorder UfontTreb groupFormText'
                onSubmit={handleSubmit}>
                <div className=''>
                    {/* <h3 className={newForm}>BECOME AN ORGANIZER</h3> */}
                    <h1 className={`${newForm}`}>Start a New Group</h1>
                    <h1 className={editForm}>Update your Group</h1>
                    <h2 className={newForm}>We'll walk you through a few steps to build your local community</h2>
                    <h2 className={editForm}>We'll walk you through a few steps to update your group's information</h2>
                </div>
                {/* <div className='displayFlex justifyCenter'>
                    <img
                        className='dividerImageForm'
                        width='25%'
                        // height='10%'
                        src={formDividerImage}
                    />
                </div> */}
                <RainbowLine />
                <div className='marginBottomMed'>
                    <h2>
                        Set your group's location
                    </h2>
                    <p className='groupFormText'>
                        AdventureUp groups meet locally, in person, and online.
                        We'll connect you with people in your area.
                    </p>
                    <div className="displayFlex">
                        <input
                            className='groupForm-location groupForm-city'
                            type='text'
                            placeholder='City'
                            value={city}
                            onChange={(e) => {
                                setCity(e.target.value)
                                setDisplayCityErr(true)
                            }}
                        ></input>
                        <input
                            className='groupForm-location'
                            type='text'
                            placeholder='State'
                            value={state}
                            onChange={(e) => {
                                setState(e.target.value)
                                setDisplayStateErr(true)
                            }}
                        ></input>
                        {(!displayCityErr || !displayStateErr) && formType === "new" && <p className="errors">*</p>}
                    </div>

                    {displayCityErr && <p className='error'>{err.city}</p>}
                    {displayStateErr && <p className='error'>{err.state}</p>}
                </div>
                {/* <div className='displayFlex justifyCenter'>
                    <img
                        className='dividerImageForm'
                        width='25%'
                        // height='10%'
                        src={formDividerImage}
                    />
                </div> */}
                <RainbowLine />
                <div className='marginBottomMed'>
                    <h2>
                        What will your group's name be?
                    </h2>
                    <p className='groupFormText'>
                        Choose a name that will give people a clear idea of what the group is about.
                    </p>
                    <p className='groupFormText'>
                        Feel free to get creative! You can edit this later if you change your mind.
                    </p>
                    <div className="displayFlex">
                        <input
                            className='groupFormInput'
                            type='text'
                            placeholder='What is your group name?'
                            value={groupName}
                            onChange={(e) => {
                                setGroupName(e.target.value)
                                setDisplayGroupNameErr(true)
                            }}
                        ></input>
                        {!displayGroupNameErr && formType === "new" && <p className="errors">*</p>}
                    </div>
                    {displayGroupNameErr && <p className='error'>{err.name}</p>}
                </div>
                {/* <div className='displayFlex justifyCenter'>
                    <img
                        className='dividerImageForm'
                        width='25%'
                        // height='10%'
                        src={formDividerImage}
                    />
                </div> */}
                <RainbowLine />
                <div className='marginBottomMed'>
                    <h2>
                        Describe the purpose of your group
                    </h2>
                    <p className='groupFormText'>
                        People will see this when we promote your group, but you'll be able to add to it later, too.
                    </p>
                    <ol className='groupFormText'>
                        <li>What's the purpose of the group?</li>
                        <li>Who should join?</li>
                        <li>What will you do at your events?</li>
                    </ol>
                    <div className="displayFlex">
                        <textarea
                            className='groupFormInput'
                            placeholder='Please write at least 30 characters'
                            value={groupAbout}
                            onChange={(e) => {
                                setGroupAbout(e.target.value)
                                setDisplayGroupAboutErr(true)
                            }}
                        ></textarea>
                        {!displayGroupAboutErr && formType === "new" && <p className="errors">*</p>}
                    </div>
                    {displayGroupAboutErr && <p className='error'>{err.about}</p>}
                </div>
                {/* <div className='displayFlex justifyCenter'>
                    <img
                        className='dividerImageForm'
                        width='25%'
                        // height='10%'
                        src={formDividerImage}
                    />
                </div> */}
                <RainbowLine />
                <div>
                    <h2>
                        Final steps...
                    </h2>
                    <div className='displayFlex flex-directionColumn groupFormText'>
                        <div className='displayFlex'>
                            <label className='marginRight marginBottomMed' htmlFor='meetingType'>
                                Is this an in person or online group?
                            </label>
                            <select
                                className='groupFormInput'
                                name='meetingType'
                                onChange={(e) => {
                                    setGroupMeetingType(e.target.value)
                                    setDisplayGroupMeetingTypeErr(true)
                                }}
                                value={groupMeetingType}
                            >
                                <option>(select one)</option>
                                <option value='In person'>In Person</option>
                                <option value='Online'>Online</option>
                            </select>
                            {!displayGroupMeetingTypeErr && formType === "new" && <p className="errors">*</p>}
                        </div>
                        {displayGroupMeetingTypeErr && <p className='error'>{err.meetingType}</p>}
                        <div className='displayFlex flex-directionColumn'>
                            <div className='displayFlex'>
                                <label className='marginRight marginBottomMed'>
                                    Is this group private or public?
                                </label>
                                <select
                                    className='groupFormInput'
                                    onChange={(e) => {
                                        setGroupStatus(e.target.value)
                                        setDisplayGroupStatusErr(true)
                                    }}
                                    value={groupStatus}
                                >
                                    <option>(select one)</option>
                                    <option
                                        value={true}
                                        checked={groupStatus === true}
                                        onChange={() => setGroupStatus(true)}
                                    >Private</option>
                                    <option
                                        value={false}
                                        checked={groupStatus === false}
                                        onChange={() => setGroupStatus(false)}
                                    >Public</option>
                                </select>
                                {!displayGroupStatusErr && formType === "new" && <p className="errors">*</p>}
                            </div>
                        </div>
                        {displayGroupStatusErr && <p className='error'>{err.groupStatus}</p>}
                        <div className={`${newForm} ${hideImageUpdate} displayFlex flex-directionColumn marginBottomMed`}>
                            <label className='marginBottomMed marginBottomNone'>
                                Please add an image url for your group below:
                            </label>
                            <div className="displayFlex">
                                <input
                                    className='groupFormInput marginTopNone'
                                    type='text'
                                    placeholder='Image Url'
                                    value={groupImage}
                                    onChange={(e) => {
                                        setGroupImage(e.target.value)
                                        setDisplayGroupImageErr(true)
                                    }}
                                ></input>
                                {!displayGroupImageErr && formType === "new" && <p className="errors">*</p>}
                            </div>
                            {displayGroupImageErr && <p className='error'>{err.image}</p>}
                            {/* possibly need to adjust the input type for image */}
                        </div>
                    </div>
                </div>
                <div className='groupForm-button'>
                    <button
                        className={`${newForm} UbuttonDimensions border-Radius15 ${disabled}`}
                        type='submit'
                        disabled={Object.values(err).length > 0}
                    >
                        Create Group
                    </button>
                    <button
                        className={`${editForm} UbuttonDimensions border-Radius15 ${disabled}`}
                        type='submit'
                        disabled={Object.values(err).length > 0}
                    >
                        Update Group
                    </button>
                    {Object.values(err).length > 0 && <div className={`errors`}>
                        *Add your Group's information
                    </div>}
                </div>
            </form>
        </div>
    )
}

export default GroupForm;
