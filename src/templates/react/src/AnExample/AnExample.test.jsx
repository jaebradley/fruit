import React from 'react';
import { mount } from 'enzyme';

import AnExample from './index';

describe('AnExample', () => {
  it('is a div', () => {
    const example = mount(<AnExample />);
    expect(example.find('div').length).toEqual(1);
  });
});
