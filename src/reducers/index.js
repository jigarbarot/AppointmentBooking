import {APPOINTMENT} from "../actions/Types";
const initialAuthState = {appointmentList:[]}
const AppReducer=(state = initialAuthState, action)=> {

    switch (action.type) {
        case APPOINTMENT:
            return {...state, appointmentList:action.payload};
        default:
            return state;
    }

}

export default AppReducer;

