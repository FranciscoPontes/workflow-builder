import { addNewState, removeState } from "./Layout";

const stateTemplate = {
    code: "STATE"
};

const phaseTemplate = {
    code: "PHASE",
    states: [stateTemplate]
};


test('Adding new state to an existing phase', () => { 
    const actual = {...
        phaseTemplate   
    }

    const state = {
        code: "NEW_STATE"
    }

    const expected = {
        ...actual,
        states: [...actual.states, state]
    }

    expect(addNewState(actual, state)).toMatchObject(expected);
}
);


test('Remove state from an existing phase', () => { 
    const actual = {...
        phaseTemplate   
    }

    const state = {
        code: "NEW_STATE"
    }

    const expected = {
        ...actual,
        states: actual.states.filter( el => el.code !== state.code )
    }

    expect(removeState(actual, state)).toMatchObject(expected);
}
);