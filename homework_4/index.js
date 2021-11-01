function BinaryTree () {
    this.root = null;

    this.add = function (value) {
        if (!this.root) {
            this.root = new TreeNode(value);            
        } else {
            let node = this.root;
            let newNode = new TreeNode(value);
            while (node) {
                if (value > node.value) {
                    if (!node.right) {
                        break;
                    }
                    node = node.right;
                } else {
                    if (!node.left) {
                        break;
                    }
                    node = node.left;
                }
            } 
            if (typeof node.value === typeof newNode.value) {         
                if (value > node.value) {
                    node.right = newNode;
                } else {
                    node.left = newNode;
                }
            }
        } 
    }

    // Обход в глубину
    this.treversDFS = function (root = this.root) {
        if (!root) {
            return;
        }
        // console.log(root.value);                         // InOrder
        this.treversDFS(root.left);
        // console.log(root.value);                        //  PreOrder
        this.treversDFS(root.right);
        console.log(root.value);                          //   PostOrder    
    }

    // Обход в ширину
    this.treversBFS = function () {
        const queue = [this.root];

        while(queue.length) {
            const node = queue.shift();

            if (node.left) {
                queue.push(node.left);
            }

            if(node.right) {
                queue.push(node.right);
            }

            console.log(node.value)
        }
    }    
}

function TreeNode (value) {
        this.value = value;
        this.left = null;
        this.right = null;  
}

const tree = new BinaryTree();
tree.add(5);
tree.add('a');
tree.add(6);
tree.add(2);
tree.add(1);
tree.add(3);
tree.add(4);
console.log('DFS');
tree.treversDFS();
console.log('BFS');
tree.treversBFS();
console.log(tree);