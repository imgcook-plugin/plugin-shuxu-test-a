import { parse } from '@babel/parser';
import generate from '@babel/generator';
import traverse from '@babel/traverse';

import { traverseConfig } from './transfer';

const theCode = `function Component(props) {
  return (<div>{props.dom}</div>);
}`

export default (options: imgCookOptions) => {
  const { data } = options;
  // debugger;
  // const ast = parse(theCode, {
  const ast = parse(data.code.xml, {
    sourceType: "module",
    plugins: [
      // enable jsx and flow syntax
      "jsx",
      "flow"
    ]
  });

  // writeFile('./output.js', JSON.stringify(ast));

  // debugger;

  traverse(ast, traverseConfig);

  const code = generate(ast);

  return code;
}