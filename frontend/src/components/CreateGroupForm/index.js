import React from 'react';
import {useState} from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './CreateGroupForm.css';

function CreateGroupForm() {
    const [location, setLocation] = useState('');
    const [groupName, setGroupName] = useState('');
    const [groupAbout, setGroupAbout] = useState('');
    const [groupMeetings, setGroupMeetings] = useState('In Person');
    const [groupStatus, setGroupStatus] = useState('Private');
    const [groupImage, setGroupImage] = useState('');

    return (
        <form>
            <div>
                <h2>
                    We'll walk you through a few steps to build your local community
                </h2>
            </div>
            <div>
                <h2>
                    First, set your group's location.
                </h2>
                <p>
                    Fill in text later
                </p>
                <input
                    type='text'
                    placeholder='City, STATE'
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    ></input>
            </div>
            <div>
                <h2>
                    What will your group's name be?
                </h2>
                <p>
                    Choose a name that will give people a clear idea of what the group is about.
                </p>
                <p>
                    Feel free to get creative! You can edit this later if you change your mind.
                </p>
                <input
                    type='text'
                    placeholder='What is your group name?'
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                    ></input>
            </div>
            <div>
                <h2>
                    Now describe what your group will be about
                </h2>
                <p>
                    People will see this when we promote your group, but you'll be able to add to it later, too.
                </p>
                <ol>
                    <li>What's the purpose of the group?</li>
                    <li>Who should join?</li>
                    <li>What will you do at your events?</li>
                </ol>
                <textarea placeholder='Please write at least 30 characters'></textarea>
            </div>
            <div>
                <h2>
                   Final steps...
                </h2>
                <p>
                   Is this an in person or online group?
                </p>
                <select>
                    <option>In Person</option>
                    <option>Online</option>
                </select>
                <p>
                    Is this group private or public?
                </p>
                <select>
                    <option>Private</option>
                    <option>Public</option>
                </select>
                <p>
                    Please add an image url for your group below:
                </p>
                <input type='text' placeholder='Image Url'></input>
                {/* possibly need to adjust the input type for image */}
            </div>
            <div>
                <button>
                    Create group
                </button>
            </div>
        </form>
    )
}

export default CreateGroupForm;
