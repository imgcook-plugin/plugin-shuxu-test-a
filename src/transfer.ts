import { parse } from '@babel/parser';
import traverse, { TraverseOptions, NodePath } from '@babel/traverse';
import template from '@babel/template';
import * as t from '@babel/types';

function isClassComponent(path: NodePath<t.Node>) {
  const renderClassMethod = path.findParent((e) => {
    return t.isClassMethod(e);
  });
  debugger;
  return renderClassMethod && ((renderClassMethod.node as t.ClassMethod)?.key as t.Identifier).name === 'render';
}

// const createPropText = template.ast(`class Comp {
//   render() {
//     return <div>{this.prop.PROP_NAME}</div>
//   }
// }`, {
  
// });

function createPropText(propName = 'showname') {
  const code = `class Comp {
    render() {
      return <div>{this.prop.${propName}}</div>
    }
  }`;

  const ast: any = parse(code, {
    sourceType: 'module',
    plugins: [
      'jsx',
      'flow'
    ]
  });

  return ast.program.body?.[0]?.body.body[0].body.body[0].argument.children[0];

  // return new Promise((res) => {
  //   traverse(ast, {
  //     Program(path) {
  //       const targetPath = path.find((e: any) => {
  //         return isClassComponent(e) && e;
  //       });

  //       res(targetPath);
  //     }
  //   });
  // })
}

export const traverseConfig: TraverseOptions = {
  // JSXElement(path) {
  //   debugger;
  // },
  // Class(path) {
  //   debugger;
  // },
  ClassMethod(path) {
    (path.node as t.ClassMethod).key
    debugger;
  },
  JSXOpeningElement(path) {
    // if (t.isJSXIdentifier(path.node.name) && (path.node.name as t.JSXIdentifier).name === 'span') {
    //   debugger;
    //   path.node.attributes.find((e) => {
    //     const attr = e as t.JSXAttribute;
    //     if (attr.value?.type === 'StringLiteral' && attr.value.value === 'tag') {
    //       debugger;
    //     }
    //   });
    // }
  },
  JSXText(path) {
    const parnentPath = path.parent;
    if (t.isJSXText(path)) {

      // debugger;
      if (!path.node?.value?.includes?.('影片名')) {
        return;
      }

      const propTree: any = createPropText();
      (parnentPath as t.JSXElement).children[0] = propTree;

      // if (isClassComponent(path)) {
      //   // ...
      //   createPropText();
      // }
      return;
    }

    
  }
  // JSX(path) {
  //   debugger;
  // },
  // JSXIdentifier(path) {
  //   debugger;
  // }
}