import { Input } from '../../src/components';
import { mount } from 'enzyme';

describe('Input component', () => {
  let wrapper, props;
  beforeAll(() => {
    props = {
      value: "lorem ipsum",
      onChange: () => {}
    };
    wrapper = mount(<Input {...props} />);
  });

  it('should have an input tag', () => {
    expect(wrapper.find('input').length).toBe(1);
  });

  it('should pass all props to the input', () => {
    expect(wrapper.find('input').props().value).toEqual(props.value);
  });

  it('should have an icon tag', () => {
    const icon = wrapper.find('i');
    expect(icon.length).toBe(1);
    expect(icon.hasClass('fa-search')).toBe(true);
  });
});
