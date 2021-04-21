import {CREATE_SETUP_INTENT, STRIPE_ERROR, GET_CARD, STRIPE_LOADING} from '../actions/types'

const initialState = {
    stripe: null,
    intent: null,
    card: [],
    loading: false
}

export default function(state=initialState, action){
    switch(action.type){
        case GET_CARD:
            return{
                ...state,
                card: action.payload,
                loading: false
            };
        case CREATE_SETUP_INTENT:
            return{
                ...state,
                intent:action.payload,
                loading: false
            };
        case STRIPE_LOADING:
            return{
                ...state,
                loading: true                
            }
        case STRIPE_ERROR:
            return{
                ...state,
                loading: false
            };
        default:
            return state;
    }
}