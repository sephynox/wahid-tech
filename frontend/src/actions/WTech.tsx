
import { Dispatch } from 'react';
import axios from 'axios';
import * as Constants from '../Constants';
import ContactData from '../tools/ContactData';

export enum WTechAPIStates {
    EMPTY,
    ERROR,
    SUBMITTING_CONTACT_FORM,
    SUBMITTED_CONTACT_FORM,
    SUBMITTED_CONTACT_FORM_ERROR,
};

export type WTechAPIState =
    | { type: WTechAPIStates.EMPTY, }
    | { type: WTechAPIStates.SUBMITTING_CONTACT_FORM, }
    | { type: WTechAPIStates.SUBMITTED_CONTACT_FORM, }
    | { type: WTechAPIStates.SUBMITTED_CONTACT_FORM_ERROR, error: string, }
    | { type: WTechAPIStates.ERROR, error: string, }

export const initialWTechAPIState: WTechAPIState = {
    type: WTechAPIStates.EMPTY,
};

export const apiReducer = (
    currentState: WTechAPIState = initialWTechAPIState,
    action: WTechAPIState,
): WTechAPIState => {
    switch (action.type) {
        case WTechAPIStates.SUBMITTING_CONTACT_FORM:
        case WTechAPIStates.SUBMITTED_CONTACT_FORM:
            return { ...currentState, type: action.type };
        case WTechAPIStates.SUBMITTED_CONTACT_FORM_ERROR:
        case WTechAPIStates.ERROR:
            return { ...currentState, type: action.type, error: action.error };
        default:
            return { ...currentState, ...initialWTechAPIState };
    };
};

export const submitContactForm = (data: ContactData) => async (dispatch: Dispatch<WTechAPIState>): Promise<void> => {
    dispatch({ type: WTechAPIStates.SUBMITTING_CONTACT_FORM, });
    return WTechAPI.post(`contact`).then(
        (result) => {
            console.log(result);
            dispatch({ type: WTechAPIStates.SUBMITTED_CONTACT_FORM });
        },
        (error) => dispatch({ type: WTechAPIStates.SUBMITTED_CONTACT_FORM_ERROR, error: error }),
    );
};

const WTechAPI = axios.create({
    baseURL: Constants.WTECH_API_ENDPOINT
});

export default WTechAPI;
