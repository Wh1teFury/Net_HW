export class TreeNode<T> {

  public data: number;
  public frequency: number;
  public x: number;
  public y: number;
  public left: TreeNode<T> | null;
  public right: TreeNode<T> | null;

  constructor(data: number, x: number, y: number) {
    this.data = data;
    this.frequency = 1;
    this.x = x;
    this.y = y;
    this.left = null;
    this.right = null;
  }
}
