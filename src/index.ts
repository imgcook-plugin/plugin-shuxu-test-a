import { parse } from '@babel/parser';
import generate from '@babel/generator';
import traverse from '@babel/traverse';

import { traverseConfig } from './transfer';

const theCode = `function Component(props) {
  return (<div>{props.dom}</div>);
}`

function transformCodes(sourceCode = '') {
  const ast = parse(sourceCode, {
    sourceType: "module",
    plugins: [
      // enable jsx and flow syntax
      "jsx",
      "flow"
    ]
  });

  traverse(ast, traverseConfig);

  const code = generate(ast);

  return code.code;
}

export default (options: imgCookOptions) => {
  const { data } = options;

  if (data.code.xml) {
    data.code.xml = transformCodes(data.code.xml);
  }

  if (data.code?.panelDisplay && data.code?.panelDisplay?.length) {
    data.code.panelDisplay = data.code?.panelDisplay?.map?.((e) => {

      if (e.panelType === 'js' || e.panelType === 'ts') {
        e.panelValue = transformCodes(e.panelValue);
      }
      return e;
    });
  }

  return options;
}