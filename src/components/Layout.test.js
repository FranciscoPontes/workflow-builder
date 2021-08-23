import { addNewPhase, addNewState, removeState } from "./Layout";

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

test('Add new phase to empty data array', () => {
    const expected = [{"code": "INITIAL",
                    "states": []}]

    const phase = {"code": "INITIAL",
                    "states": []}

    const workflowData = []

    expect(addNewPhase(phase, workflowData)).toEqual(expected)
})

test('Add new phase to existing data', () => {
    const expected = [{"code": "INITIAL",
        "states": [],
        },
        {"code": "REVIEW",
        "states": []}
    ]

    const phase = {"code": "REVIEW",
            "states": []}

    const workflowData = [{"code": "INITIAL",
                    "states": []}]

    expect(addNewPhase(phase, workflowData)).toEqual(expected)    
})