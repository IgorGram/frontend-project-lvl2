import _ from 'lodash';

const indent = (depth) => {
  const str = ' ';
  const marginsNumber = 4;
  return str.repeat(depth * marginsNumber - 2);
};

const stringify = (data, depth) => {
  if (!_.isObject(data)) {
    return String(data);
  }
  const resultStr = Object.entries(data).flatMap(([key, value]) => `  ${indent(depth + 1)}${key}: ${stringify(value, depth + 1)}\n`);
  return `{\n${resultStr.join('')}${indent(depth)}  }`;
};

const stylish = (tree) => {
  const startStr = '{\n';
  const endStr = '}';
  const resultStr = tree.map((item) => {
    const inner = (node, depth) => {
      switch (node.type) {
        case 'deleted':
          return `${indent(depth)}- ${node.key}: ${stringify(node.value, depth)}\n`;
        case 'unchanged':
          return `${indent(depth)}  ${node.key}: ${stringify(node.value, depth)}\n`;
        case 'changed':
          return `${indent(depth)}- ${node.key}: ${stringify(node.value1, depth)}\n${indent(depth)}+ ${node.key}: ${stringify(node.value2, depth)}\n`;
        case 'added':
          return `${indent(depth)}+ ${node.key}: ${stringify(node.value, depth)}\n`;
        case 'nested':
          return [`  ${indent(depth)}${node.key}: {\n${node.children.map((child) => inner(child, depth + 1)).join('')}  ${indent(depth)}}\n`];
        default: throw new Error(`${node.type} didn\`t find`);
      }
    };

    return inner(item, 1);
  });
  return `${startStr}${resultStr.join('')}${endStr}`;
};

export default stylish;
