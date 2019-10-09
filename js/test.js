function deepTraversal (node , nodeList = []) {
    if(node !== null) {
        nodeList.push(node);
        let children =  node.children;
        for(let i = 0; i< children.length; i++) {
        deepTraversal(children[i],nodeList)
        }
    }
    return nodeList
}
