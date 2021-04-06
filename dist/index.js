"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const parser_1 = require("@babel/parser");
const generator_1 = __importDefault(require("@babel/generator"));
const traverse_1 = __importDefault(require("@babel/traverse"));
const transfer_1 = require("./transfer");
const theCode = `function Component(props) {
  return (<div>{props.dom}</div>);
}`;
function transformCodes(sourceCode = '') {
    const ast = parser_1.parse(sourceCode, {
        sourceType: "module",
        plugins: [
            // enable jsx and flow syntax
            "jsx",
            "flow"
        ]
    });
    traverse_1.default(ast, transfer_1.traverseConfig);
    const code = generator_1.default(ast);
    return code.code;
}
exports.default = (options) => {
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
};
