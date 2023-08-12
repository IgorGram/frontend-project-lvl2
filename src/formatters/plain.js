const stringify = (value) => {
  if (value === null) {
    return value;
  }

  if (typeof value === 'object') {
    return '[complex value]';
  }

  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return String(value);
};

const plain = (tree) => {
  const resultStr = tree.flatMap((item) => {
    const inner = (node, path) => {
      switch (node.type) {
        case 'deleted':
          return `Property '${path.join('.')}' was removed`;
        case 'unchanged':
          return [];
        case 'changed':
          return `Property '${path.join('.')}' was updated. From ${stringify(node.value1)} to ${stringify(node.value2)}`;
        case 'added':
          return `Property '${path.join('.')}' was added with value: ${stringify(node.value)}`;
        case 'nested':
          return node.children.flatMap((child) => inner(child, [...path, child.key]));
        default: throw new Error(`${node.type} didn\`t find`);
      }
    };

    return inner(item, [item.key]);
  });
  return resultStr.join('\n');
};

export default plain;
