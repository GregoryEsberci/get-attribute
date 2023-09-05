import getValue from '../src/get-value';

const user = {
  address: {
    postCode: 'SW1P 3PA',
    street: ['20 Deans Yd'],
  },
};

describe('typed getValue', () => {
  it('should get nested value from an object', () => {
    expect(getValue(user, 'address.postCode')).toBe('SW1P 3PA');
  });

  it('should return a value from a list', () => {
    expect(getValue(user, 'address.street.0')).toBe('20 Deans Yd');
    expect(getValue(user, 'address.street[0]')).toBe('20 Deans Yd');
    expect(getValue(user, 'address.street.1')).toBeUndefined();
  });

  it('should return undefined if field does not exist', () => {
    expect(getValue(user, 'phone.number')).toBeUndefined();
  });
});
