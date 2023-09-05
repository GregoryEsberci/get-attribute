import createGetAttribute from '../src/alternative';

jest.useFakeTimers();

let getAttribute = createGetAttribute();

beforeEach(() => {
  jest.clearAllTimers();
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

  it('should clean up unused memoized attributes after a period', () => {
    const getter = getAttribute('key');

    jest.advanceTimersByTime(60_000);

    const newGetter = getAttribute('key');
    expect(newGetter).not.toBe(getter);
  });
});
