# get-attribute

A small library for a simple problem.

`get-attribute` allows you to retrieve a value at a specified path within an object or array (similar to [lodash get](https://lodash.com/docs/4.17.15#get)). But why use this library if lodash already exists? The reason is that this library returns a function that remains unchanged between calls, helping to prevent unnecessary React re-renders by memorizing the function and returning the same function for the same path. It has been created with React and React Native projects in mind but works in other JavaScript environments.

**Example**: [View the example on CodeSandbox](https://codesandbox.io/s/example-get-attribute-d453y4?file=/src/App.tsx)

## Installation


Using npm:
```bash
npm install get-attribute
```

Using yarn:
```bash
yarn add get-attribute
```

## Examples

```ts
const user = {
  address: {
    postCode: 'SW1P 3PA',
    street: ['20 Deans Yd'],
  },
};

const getUserPostCode = getAttribute('address.postCode');
const getUserStreet = getAttribute('address.street[0]');

getUserPostCode(user); // Result: "SW1P 3PA"
getUserStreet(user); // Result: "20 Deans Yd"
```

```tsx
const users = [
  { id: 1, name: 'Alfred' },
  { id: 2, name: 'Bob' },
];

<FlatList data={users} keyExtractor={getAttribute('id')} /* other necessary props */ />
```