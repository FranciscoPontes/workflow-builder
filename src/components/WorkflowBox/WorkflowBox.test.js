const { sortPhases, sortStates } = require("./WorkflowBox");

test('Sorting the phases', () => {
    const actual = [    {
                        id: 61,
                        code: 'REVIEW',
                        sort_order: 2
                        },
                        {
                            id: 61,
                            code: 'INITIAL',
                            sort_order: 1
                        }   
                   ];

    const actual2 = [...actual];               

    const value = sortPhases(actual);        

    const expected = actual2.sort( (x,y) => x.sort_order - y.sort_order );

    expected.forEach( (a,b) => {
        expect(value[b]).toMatchObject(expected[b]);
    })
})

test('Sorting the states', () => {
    const actual = [    {
                        id: 61,
                        code: 'REVIEW',
                        sort_order: 2
                        },
                        {
                            id: 61,
                            code: 'INITIAL',
                            sort_order: 1
                        }   
                   ];

    const actual2 = [...actual];               

    const value = sortStates(actual);        

    const expected = actual2.sort( (x,y) => x.sort_order - y.sort_order );

    expected.forEach( (a,b) => {
        expect(value[b]).toMatchObject(expected[b]);
    })
})