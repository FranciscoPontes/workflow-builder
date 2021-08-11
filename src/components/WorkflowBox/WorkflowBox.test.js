import rendered from 'react-test-renderer';
import Phase from '../Phase/Phase';

test('Workflow is generating the phases correctly', () => {
    const data = [{"phase": {
        "code": "INITIAL"
    }}]

    const component = rendered.create(
        <Phase code="INITIAL" />
    )

    let tree = component.toJSON();
    // expect(tree).toMatchSnapshot
})
