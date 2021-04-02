"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.traverseConfig = void 0;
const parser_1 = require("@babel/parser");
const t = __importStar(require("@babel/types"));
function isClassComponent(path) {
    const renderClassMethod = path.findParent((e) => {
        return t.isClassMethod(e);
    });
    debugger;
    return renderClassMethod && renderClassMethod.node?.key.name === 'render';
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
    const ast = parser_1.parse(code, {
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
exports.traverseConfig = {
    // JSXElement(path) {
    //   debugger;
    // },
    // Class(path) {
    //   debugger;
    // },
    ClassMethod(path) {
        path.node.key;
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
            const propTree = createPropText();
            parnentPath.children[0] = propTree;
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
};
