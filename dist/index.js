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
exports.default = (options) => {
    const { data } = options;
    // debugger;
    // const ast = parse(theCode, {
    const ast = parser_1.parse(data.code.xml, {
        sourceType: "module",
        plugins: [
            // enable jsx and flow syntax
            "jsx",
            "flow"
        ]
    });
    // writeFile('./output.js', JSON.stringify(ast));
    // debugger;
    traverse_1.default(ast, transfer_1.traverseConfig);
    const code = generator_1.default(ast);
    return code;
};
