import { RenderCanvas } from "./RenderCanvas";
import { TreeNode } from "./TreeNode";

class BinarySearchTree<T> extends RenderCanvas {
  public root: TreeNode<T> | null;

  constructor(root?: TreeNode<T>) {
    super();
    this.root = root ?? null;
  }
  public insertHelper(data: number, node: TreeNode<T> | null, parentNode: TreeNode<T> | null, gap: number, x: number, y: number): TreeNode<T> | null {
    if (node === null) {
      node = new TreeNode<T>(data, x, y);
      if (parentNode !== null) {
        this.joinNode(x, y, parentNode.x, parentNode.y);
        this.makeNode(parentNode.x, parentNode.y, parentNode.data);
        this.createText(parentNode.x, parentNode.y, parentNode.data);
      }
      this.makeNode(x, y, data);
      this.createText(x, y, data);
      return node;
    }
    if (node.data === data) {
      node.frequency++;
      return node;
    } if (node.data > data) {
      node.left = this.insertHelper(data, node.left, node, gap, x - gap, y + 50);
    } else if (node.data < data) {
      node.right = this.insertHelper(data, node.right, node, gap, x + gap, y + 50);
    }
    return node;
  }
  public insert(data: number): void {
    this.root = this.insertHelper(data, this.root, null, 100, 900, 50);
  }
  public search(root: TreeNode<T> | null = this.root, data: number): TreeNode<T> | null {
    const temp = root;
    if (!temp) {
      return null;
    } if (temp.data === data) {
      return temp;
    }
    if (data < temp.data) {
      return this.search(temp.left, data);
    }
    return this.search(temp.right, data);
  }
  public trevers(root: TreeNode<T> | null = this.root): void {
    if (root !== null) {
      alert(root.data);
      this.trevers(root.left);
      this.trevers(root.right);
    }
  }
  public findMin(root: TreeNode<T> | null = this.root): TreeNode<T> | null {
    if (root?.left === null) {
      return root;
    }
    return this.findMin(root?.left);

  }
  public remove(value: number): void {
    this.root = this.removeNode(this.root, value);
  }
  public removeNode(root: TreeNode<T> | null = this.root, value: number): TreeNode<T> | null {
    if (root === null) {
      return null;
    } if (value < root.data) {
      root.left = this.removeNode(root.left, value);
      return root;
    } if (value > root.data) {
      root.right = this.removeNode(root.right, value);
      return root;
    }
    if (root.left === null && root.right === null) {
      root = null;
      return root;
    }
    if (root.left === null) {
      root = root.right;
      return root;
    } if (root.right === null) {
      root = root.left;
      return root;
    }
    const aux = this.findMin(root.right);
    if (aux !== null) {
      root.data = aux.data;
      root.right = this.removeNode(root.right, aux.data);
    }
    return root;
  }
}

const tree = new BinarySearchTree();

const bstForm = document.getElementById("bstForm");
const searchForm = document.getElementById("searchForm");
const treversForm = document.getElementById("treversForm");
const deleteForm = document.getElementById("delForm");

bstForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const val = document.querySelector(`[name=\"bst-val\"]`);
  tree.insert(parseInt((<HTMLInputElement>val).value, 10));
});

searchForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const val = document.querySelector(`[name=\"bst-val-search\"]`);
  const search = tree.search(tree.root, parseInt((<HTMLInputElement>val).value, 10));
  alert(`Root: ${search?.data}, left: ${search?.left?.data}, right: ${search?.right?.data}`);
});

treversForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  tree.trevers(tree.root);
});

deleteForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const delVal = document.querySelector(`[name=\"bst-val-delete\"]`);
  tree.removeNode(tree.root, parseInt((<HTMLInputElement>delVal).value, 10));
  const val = document.querySelector(`[name=\"bst-val\"]`);
  tree.insertHelper(parseInt((<HTMLInputElement>val).value, 10), null, null, -100, -100, -100);
});

