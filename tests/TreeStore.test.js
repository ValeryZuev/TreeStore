const TreeStore = require('../src/TreeStore');

describe('TreeStore', () => {
  const items = [
    { id: 1, parent: 'root' },
    { id: 2, parent: 1, type: 'test' },
    { id: 3, parent: 1, type: 'test' },
    { id: 4, parent: 2, type: 'test' },
    { id: 5, parent: 2, type: 'test' },
    { id: 6, parent: 2, type: 'test' },
    { id: 7, parent: 4, type: null },
    { id: 8, parent: 4, type: null }
  ];

  let treeStore

  beforeEach(() => {
    treeStore = new TreeStore(items);
  });

  test('getAll should return all items', () => {
    expect(treeStore.getAll()).toEqual(items)
  })

  test('getItem should return the current item by id', () => {
    expect(treeStore.getItem(7)).toEqual({ id: 7, parent: 4, type: null })
  })

  test('getChildren should return direct children', () => {
    expect(treeStore.getChildren(4)).toEqual([
      { id: 7, parent: 4, type: null },
      { id: 8, parent: 4, type: null }
    ])
  })

  test('getAllChildren should return all children recursively', () => {
    expect(treeStore.getAllChildren(2)).toEqual([
      { id: 4, parent: 2, type: 'test' },
      { id: 5, parent: 2, type: 'test' },
      { id: 6, parent: 2, type: 'test' },
      { id: 7, parent: 4, type: null },
      { id: 8, parent: 4, type: null },
    ])
  })

  test('getAllParents should return all parents in correct order', () => {
    expect(treeStore.getAllParents(7)).toEqual([
      { id: 4, parent: 2, type: 'test' },
      { id: 2, parent: 1, type: 'test' },
      { id: 1, parent: 'root' },
    ])
  })
})
