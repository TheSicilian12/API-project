export const READ_GROUPS = 'groups';
export const MAKE_GROUPS = 'valueTBD';
export const EDIT_GROUPS = 'valueTBD';
export const DELETE_GROUPS = 'valueTBD';

//not sure what the value should be yet
const loadGroups = (value) => ({
    type: READ_GROUPS,
    value
})



const initialState = {};

const groupsReducer = (state = initialState, action) => {
    switch (action.type) {
        case READ_GROUPS:
            const newGroups = {};


    }
}

export default groupsReducer;
