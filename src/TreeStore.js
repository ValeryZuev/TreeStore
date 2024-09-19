const ROOT_NAME = 'root'

class TreeStore {
  constructor(items) {
    this.items = items;
    this.itemMap = new Map();
    this.childrenMap = new Map();

    items.forEach((item) => {
      this.itemMap.set(item.id, item);

      if (!this.childrenMap.has(item.parent)) {
        this.childrenMap.set(item.parent, []);
      }
      this.childrenMap.get(item.parent)?.push(item);
    });
  }

  getAll() {
    return this.items;
  }

  getItem(id) {
    return this.itemMap.get(id);
  }

  getChildren(id) {
    return this.childrenMap.get(id) || []
  }

  getAllChildren(id) {
    let result = []
    const gatherChild = (parentId) => {
      const children = this.getChildren(parentId);
      result = result.concat(children);
      children.forEach((child) => gatherChild(child.id))
    }
    gatherChild(id);
    return result;
  }

  getAllParents(id) {
    let result = [];
    let currentItem = this.getItem(id);

    while (currentItem && currentItem.parent !== ROOT_NAME) {
      const parent = this.getItem(currentItem.parent);
      if (parent) {
        result.push(parent)
        currentItem = parent
      } else {
        break;
      }
    }

    return result;
  }
}

module.exports = TreeStore;
