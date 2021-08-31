const { sortPhases, sortStates, addNewState } = require('./WorkflowBox')

const stateTemplate = {
  code: 'STATE',
}

const phaseTemplate = {
  code: 'PHASE',
  states: [stateTemplate],
}

test('Adding new state', () => {
  const states = [{ pha_id: 61, code: 'INITIAL_DRAFT', sort_order: 1 }]

  const newState = { pha_id: 61, code: 'INITIAL_SUBMIT', sort_order: 3 }

  states.push(newState)

  const value = addNewState(states, newState)

  states.forEach((a, b) => {
    expect(value[b]).toMatchObject(states[b])
  })
})

// same for phases
test('Remove state from an existing phase', () => {
  const actual = { ...phaseTemplate }

  const state = {
    code: 'NEW_STATE',
  }

  const expected = {
    ...actual,
    states: actual.states.filter((el) => el.code !== state.code),
  }

  expect(removeState(actual, state)).toMatchObject(expected)
})

// same for phases
test('Add new state to empty data array', () => {
  const expected = [{ code: 'INITIAL', states: [] }]

  const phase = { code: 'INITIAL', states: [] }

  const workflowData = []

  expect(addNewPhase(phase, workflowData)).toEqual(expected)
})

test('Sorting the phases', () => {
  const actual = [
    {
      id: 61,
      code: 'REVIEW',
      sort_order: 2,
    },
    {
      id: 61,
      code: 'INITIAL',
      sort_order: 1,
    },
  ]

  const actual2 = [...actual]

  const value = sortPhases(actual)

  const expected = actual2.sort((x, y) => x.sort_order - y.sort_order)

  expected.forEach((a, b) => {
    expect(value[b]).toMatchObject(expected[b])
  })
})

test('Sorting the states', () => {
  const actual = [
    {
      id: 61,
      code: 'REVIEW',
      sort_order: 2,
    },
    {
      id: 61,
      code: 'INITIAL',
      sort_order: 1,
    },
  ]

  const actual2 = [...actual]

  const value = sortStates(actual)

  const expected = actual2.sort((x, y) => x.sort_order - y.sort_order)

  expected.forEach((a, b) => {
    expect(value[b]).toMatchObject(expected[b])
  })
})
