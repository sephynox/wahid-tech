export const EMPTY = 'EMPTY';
export const FETCHING = 'FETCHING';
export const SUCCESS = 'SUCCESS';
export const ERROR = 'ERROR';

export type ExternalState =
    | { status: typeof EMPTY }
    | { status: typeof FETCHING }
    | { status: typeof ERROR, error: string }
    | { status: typeof SUCCESS, data: Response };

export type Action =
    | { type: typeof FETCHING }
    | { type: typeof SUCCESS, result: Response }
    | { type: typeof ERROR, error: string };

export type ExternalEvent<T> = {
    type: string,
    payload?: T
};

export const reducer = (state: ExternalState, action: Action): ExternalState => {
    switch (action.type) {
        case FETCHING:
            return { ...{}, status: FETCHING };
        case SUCCESS:
            return { ...state, status: SUCCESS, data: action.result };
        case ERROR:
            return { ...state, status: ERROR, error: action.error };
        default:
            return state;
    }
};
