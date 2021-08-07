export enum ExternalStates {
    EMPTY,
    FETCHING,
    SUCCESS,
    ERROR
};

export type ExternalState =
    | { status: typeof ExternalStates.EMPTY }
    | { status: typeof ExternalStates.FETCHING }
    | { status: typeof ExternalStates.ERROR, error: string }
    | { status: typeof ExternalStates.SUCCESS, data: Response };

export type ExternalActions =
    | { type: typeof ExternalStates.FETCHING }
    | { type: typeof ExternalStates.SUCCESS, result: Response }
    | { type: typeof ExternalStates.ERROR, error: string };

export type ExternalEvent<T> = {
    type: string,
    payload?: T
};

export const externalReducer = (state: ExternalState, action: ExternalActions): ExternalState => {
    switch (action.type) {
        case ExternalStates.FETCHING:
            return { ...state, status: ExternalStates.FETCHING };
        case ExternalStates.SUCCESS:
            return { ...state, status: ExternalStates.SUCCESS, data: action.result };
        case ExternalStates.ERROR:
            return { ...state, status: ExternalStates.ERROR, error: action.error };
        default:
            return state;
    }
};
