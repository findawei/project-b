import {CREATE_SETUP_INTENT, STRIPE_ERROR, GET_CARD, STRIPE_LOADING} from '../actions/types'

const initialState = {
    stripe: null,
    intent: null,
    card: [],
    loading: false
}

export default function(state=initialState, action){
    switch(action.type){
        // case GET_ITEMS:
        //     return{
        //         ...state,
        //         items: action.payload,
        //         loading: false
        //     };
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
        // case DELETE_ITEM:
        //     return{
        //         ...state,
        //         items: state.items.filter(item => item._id !== action.payload),
        //         loading: false
        //     };
        // case UPDATE_ITEM:
        //     return {
        //         ...state,
        //         items: state.items.map(item => item._id === action.payload._id ? action.payload : item)
        //     }; 
        // case BID_ITEM:
        //     return {
        //         ...state,
        //         items: state.items.map(item => item._id === action.payload._id ? action.payload : item)
        //     };            
        // case SET_CURRENTITEM:
        //     return {
        //         ...state,
        //         currentItem: action.payload
        //     }
        // case CLEAR_CURRENT:
        //     return {
        //         ...state,
        //         current: null
        //     }
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