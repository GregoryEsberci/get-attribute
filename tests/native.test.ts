import createGetAttribute from '../src/native';

let getAttribute = createGetAttribute();

beforeEach(() => {
  getAttribute = createGetAttribute();
});

describe('getAttribute', () => {
  it('should return a new getter if not in cache', () => {
    const getter = getAttribute('nonExistentKey');

    expect(typeof getter).toBe('function');
  });

  it('should return the same getter for the same key', () => {
    const getter1 = getAttribute('key');
    const getter2 = getAttribute('key');

    expect(getter1).toBe(getter2);
  });

  // TODO: How validate the memo cleanup?
});
