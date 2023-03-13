import {READ_GROUPS, MAKE_GROUPS, EDIT_GROUPS, DELETE_GROUPS} from "./groups"

const LOAD = '/groups';

const load = list => ({
    type: LOAD,
    list
});




// thunk - fetches all groups
export const getAllGroups = () => async dispatch => {
    const response = await fetch('/api/groups');

    if (response.ok) {
        const list = await response.json();
        dispatch (load(list));
    }
}
