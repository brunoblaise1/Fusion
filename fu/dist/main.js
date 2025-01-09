#!/usr/bin/env node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
//const prompt = require("prompt-sync")({ sigint: true });
const fs_1 = require("fs");
var TokenType;
(function (TokenType) {
    TokenType[TokenType["String"] = 0] = "String";
    TokenType[TokenType["OpenParen"] = 1] = "OpenParen";
    TokenType[TokenType["CloseParen"] = 2] = "CloseParen";
    TokenType[TokenType["BinaryOperator"] = 3] = "BinaryOperator";
    TokenType[TokenType["Equals"] = 4] = "Equals";
    TokenType[TokenType["Colon"] = 5] = "Colon";
    TokenType[TokenType["Comma"] = 6] = "Comma";
    TokenType[TokenType["OpenBrace"] = 7] = "OpenBrace";
    TokenType[TokenType["CloseBrace"] = 8] = "CloseBrace";
    TokenType[TokenType["OpenBracket"] = 9] = "OpenBracket";
    TokenType[TokenType["CloseBracket"] = 10] = "CloseBracket";
    TokenType[TokenType["Number"] = 11] = "Number";
    TokenType[TokenType["Identifier"] = 12] = "Identifier";
    TokenType[TokenType["Fret"] = 13] = "Fret";
    TokenType[TokenType["If"] = 14] = "If";
    TokenType[TokenType["Else"] = 15] = "Else";
    TokenType[TokenType["Chord"] = 16] = "Chord";
    TokenType[TokenType["Dot"] = 17] = "Dot";
    TokenType[TokenType["Play"] = 18] = "Play";
    TokenType[TokenType["Press"] = 19] = "Press";
    TokenType[TokenType["EOF"] = 20] = "EOF";
})(TokenType || (TokenType = {}));
const KEYWORDS = {
    play: TokenType.Play,
    press: TokenType.Press,
    fret: TokenType.Fret,
    if: TokenType.If,
    else: TokenType.Else,
    chord: TokenType.Chord,
};
function isalpha(src) {
    return src.toUpperCase() != src.toLowerCase();
}
function isskippable(str) {
    return str == " " || str == "\n" || str == "\t" || str == "\r";
}
const ESCAPED = {
    n: "\n",
    t: "\t",
    r: "\r",
};
function isint(str) {
    const c = str.charCodeAt(0);
    const bounds = ["0".charCodeAt(0), "9".charCodeAt(0)];
    return c >= bounds[0] && c <= bounds[1];
}
function token(value = "", type) {
    return { value, type };
}
function tokenize(sourceCode) {
    const tokens = new Array();
    const src = sourceCode.split("");
    while (src.length > 0) {
        const char = src[0];
        if (char === '/' && src[1] === '/') {
            while (src.length > 0 && src[0] !== '\n') {
                src.shift();
            }
            src.shift();
            continue;
        }
        else if (char == '"') {
            let str = "";
            src.shift();
            let escaped = false;
            while (src.length > 0 && src[0] !== '\n') {
                const key = src.shift();
                if (key === "\\") {
                    escaped = !escaped;
                    if (escaped)
                        continue;
                }
                else if (key === '"') {
                    if (!escaped)
                        break;
                    escaped = false;
                }
                else if (escaped) {
                    escaped = false;
                    if (key && ESCAPED[key]) {
                        str += ESCAPED[key];
                        continue;
                    }
                    else {
                        str += `\\`;
                    }
                }
                str += key;
            }
            tokens.push(token(str, TokenType.String));
        }
        else if (char == "(") {
            tokens.push(token(src.shift(), TokenType.OpenParen));
        }
        else if (char == ")") {
            tokens.push(token(src.shift(), TokenType.CloseParen));
        }
        else if (char == "+" || char == "-" || char == "/" || char == "*" || char == "%") {
            tokens.push(token(src.shift(), TokenType.BinaryOperator));
        }
        else if (char == "=") {
            tokens.push(token(src.shift(), TokenType.Equals));
        }
        else if (char == ":") {
            tokens.push(token(src.shift(), TokenType.Colon));
        }
        else if (char == ",") {
            tokens.push(token(src.shift(), TokenType.Comma));
        }
        else if (char == "{") {
            tokens.push(token(src.shift(), TokenType.OpenBrace));
        }
        else if (char == "}") {
            tokens.push(token(src.shift(), TokenType.CloseBrace));
        }
        else if (char == "[") {
            tokens.push(token(src.shift(), TokenType.OpenBracket));
        }
        else if (char == "]") {
            tokens.push(token(src.shift(), TokenType.CloseBracket));
        }
        else if (char == ".") {
            tokens.push(token(src.shift(), TokenType.Dot));
        }
        else {
            //      if (char == '"') {
            //     let str = "";
            //   src.shift();
            //   let escaped = false;
            //    while (src.length > 0) {
            //                   const key = src.shift();
            //                   if(key == "\\") {
            //                       escaped = !escaped;
            //                       if(escaped) continue;
            //                   } else if (key == '"') {
            //                           src.shift()
            //                   } 
            //      str += key;
            //   }
            //        tokens.push(token(str, TokenType.String));
            //        console.log(str)
            // }
            if (isint(char)) {
                let num = "";
                while (src.length > 0 && isint(src[0])) {
                    num += src.shift();
                }
                tokens.push(token(num, TokenType.Number));
            }
            else if (isalpha(char)) {
                let ident = "";
                while (src.length > 0 && isalpha(src[0])) {
                    ident += src.shift();
                }
                const reserved = KEYWORDS[ident];
                if (typeof reserved == "number") {
                    tokens.push(token(ident, reserved));
                }
                else {
                    tokens.push(token(ident, TokenType.Identifier));
                }
            }
            else if (isskippable(char)) {
                src.shift();
            }
            else {
                console.error("Unreconized character found in source: ", src[0].charCodeAt(0), src[0]);
                process.exit(1);
            }
        }
    }
    tokens.push({ type: TokenType.EOF, value: "EndOfFile" });
    return tokens;
}
class Parser {
    constructor() {
        this.tokens = [];
    }
    not_eof() {
        return this.tokens[0].type != TokenType.EOF;
    }
    at() {
        return this.tokens[0];
    }
    eat() {
        const prev = this.tokens.shift();
        return prev;
    }
    expect(type, err) {
        const prev = this.tokens.shift();
        if (!prev || prev.type != type) {
            console.error("Parser Error:\n", err, prev, " - Expecting: ", type);
            process.exit(1);
        }
        return prev;
    }
    produceAST(sourceCode) {
        this.tokens = tokenize(sourceCode);
        const program = {
            kind: "Program",
            body: [],
        };
        while (this.not_eof()) {
            program.body.push(this.parse_stmt());
        }
        return program;
    }
    parse_stmt() {
        switch (this.at().type) {
            case TokenType.Play:
            case TokenType.Press:
                return this.parse_var_declaration();
            case TokenType.Fret:
                return this.parse_fr_declaration();
            default:
                return this.parse_expr();
        }
    }
    parse_fr_declaration() {
        this.eat();
        const name = this.expect(TokenType.Identifier, "Expected function name following fn keyword").value;
        const args = this.parse_args();
        const params = [];
        for (const arg of args) {
            if (arg.kind !== "Identifier") {
                console.log(arg);
                throw "Inside function declaration expected parameters to be of type string.";
            }
            params.push(arg.symbol);
        }
        this.expect(TokenType.OpenBrace, "Expected function body following declaration");
        const body = [];
        while (this.at().type !== TokenType.EOF &&
            this.at().type !== TokenType.CloseBrace) {
            body.push(this.parse_stmt());
        }
        this.expect(TokenType.CloseBrace, "Closing brace expected inside function declaration");
        const fr = {
            body,
            name,
            parameters: params,
            kind: "FunctionDeclaration",
        };
        return fr;
    }
    parse_var_declaration() {
        const isConstant = this.eat().type == TokenType.Press;
        const identifier = this.expect(TokenType.Identifier, "Expected identifier name following play | press keywords.").value;
        this.eat();
        // this.expect(
        //   TokenType.Equals,
        //   "Expected equals token following identifier in var declaration.",
        // );
        const declaration = {
            kind: "VarDeclaration",
            value: this.parse_expr(),
            identifier,
            constant: isConstant,
        };
        return declaration;
    }
    parse_expr() {
        return this.parse_assignment_expr();
    }
    parse_assignment_expr() {
        const left = this.parse_object_expr();
        if (this.at().type == TokenType.Equals) {
            this.eat();
            const value = this.parse_assignment_expr();
            return { value, assigne: left, kind: "AssignmentExpr" };
        }
        return left;
    }
    parse_object_expr() {
        if (this.at().type !== TokenType.OpenBrace) {
            return this.parse_additive_expr();
        }
        this.eat();
        const properties = new Array();
        while (this.not_eof() && this.at().type != TokenType.CloseBrace) {
            const key = this.expect(TokenType.Identifier, "Object literal key exprected").value;
            if (this.at().type == TokenType.Comma) {
                this.eat();
                properties.push({ key, kind: "Property" });
                continue;
            }
            else if (this.at().type == TokenType.CloseBrace) {
                properties.push({ key, kind: "Property" });
                continue;
            }
            this.expect(TokenType.Colon, "Missing colon following identifier in ObjectExpr");
            const value = this.parse_expr();
            properties.push({ kind: "Property", value, key });
            if (this.at().type != TokenType.CloseBrace) {
                this.expect(TokenType.Comma, "Expected comma or closing bracket following property");
            }
        }
        this.expect(TokenType.CloseBrace, "Object literal missing closing brace.");
        return { kind: "ObjectLiteral", properties };
    }
    parse_additive_expr() {
        let left = this.parse_multiplicitave_expr();
        while (this.at().value == "+" || this.at().value == "-") {
            const operator = this.eat().value;
            const right = this.parse_multiplicitave_expr();
            left = {
                kind: "BinaryExpr",
                left,
                right,
                operator,
            };
        }
        return left;
    }
    parse_multiplicitave_expr() {
        let left = this.parse_call_member_expr();
        while (this.at().value == "/" || this.at().value == "*" || this.at().value == "%") {
            const operator = this.eat().value;
            const right = this.parse_primary_expr();
            left = {
                kind: "BinaryExpr",
                left,
                right,
                operator,
            };
        }
        return left;
    }
    parse_call_member_expr() {
        const member = this.parse_member_expr();
        if (this.at().type == TokenType.OpenParen) {
            return this.parse_call_expr(member);
        }
        return member;
    }
    parse_call_expr(caller) {
        let call_expr = {
            kind: "CallExpr",
            caller,
            args: this.parse_args(),
        };
        if (this.at().type == TokenType.OpenParen) {
            call_expr = this.parse_call_expr(call_expr);
        }
        return call_expr;
    }
    parse_args() {
        this.expect(TokenType.OpenParen, "Opening parenthesis (\"(\") expected while parsing arguments.");
        const args = this.at().type == TokenType.CloseParen
            ? []
            : this.parse_args_list();
        this.expect(TokenType.CloseParen, "Closing parenthesis (\")\") expected while parsing arguments.");
        return args;
    }
    parse_args_list() {
        const args = [this.parse_expr()];
        while (this.at().type == TokenType.Comma && this.eat()) {
            args.push(this.parse_expr());
        }
        return args;
    }
    parse_member_expr() {
        let object = this.parse_primary_expr();
        while (this.at().type == TokenType.Dot || this.at().type == TokenType.OpenBracket) {
            const operator = this.eat();
            let property;
            let computed;
            if (operator.type == TokenType.Dot) {
                computed = false;
                property = this.parse_primary_expr();
                if (property.kind !== "Identifier") {
                    throw "Dot operator (\".\") is illegal without right-hand-side (<-) being an Identifier.";
                }
            }
            else {
                computed = true;
                property = this.parse_expr();
                this.expect(TokenType.CloseBracket, "Closing bracket (\"}\") expected following \"computed value\" in \"Member\" expression.");
            }
            object = {
                kind: "MemberExpr",
                object,
                property,
                computed
            };
        }
        return object;
    }
    parse_primary_expr() {
        const tk = this.at().type;
        switch (tk) {
            case TokenType.Identifier:
                return { kind: "Identifier", symbol: this.eat().value };
            case TokenType.Number:
                return {
                    kind: "NumericLiteral",
                    value: parseFloat(this.eat().value)
                };
            case TokenType.String:
                return {
                    kind: "StringLiteral",
                    value: this.eat().value,
                };
            case TokenType.Fret:
                return this.parse_fr_declaration();
            case TokenType.OpenParen: {
                this.eat();
                const value = this.parse_expr();
                this.expect(TokenType.CloseParen, `Unexpected token (${JSON.stringify(this.at().toString())}) found while parsing arguments.`);
                return value;
            }
            default:
                console.error("Unexpected token found during parsing!", this.at().toString());
                process.exit(1);
        }
    }
}
function MK_NULL() {
    return { type: "null", value: null };
}
function MK_BOOL(b = true) {
    return { type: "boolean", value: b };
}
function MK_NATIVE_FN(call) {
    return { type: "native-fn", call };
}
function MK_STRING(val) {
    return { type: "string", value: val };
}
function MK_OBJECT(obj) {
    return { type: "object", properties: obj };
}
function MK_ARRAY(arr) {
    return { type: "array", values: arr };
}
function MK_NUMBER(n = 0) {
    return { type: "number", value: n };
}
function eval_program(program, env) {
    let lastEvaluated = MK_NULL();
    for (const statement of program.body) {
        lastEvaluated = evaluate(statement, env);
    }
    return lastEvaluated;
}
/**
 * Evaulate pure numeric operations with binary operators.
 */
function eval_numeric_binary_expr(lhs, rhs, operator) {
    let result;
    if (operator == "+") {
        result = lhs.value + rhs.value;
    }
    else if (operator == "-") {
        result = lhs.value - rhs.value;
    }
    else if (operator == "*") {
        result = lhs.value * rhs.value;
    }
    else if (operator == "/") {
        result = lhs.value / rhs.value;
    }
    else {
        result = lhs.value % rhs.value;
    }
    return { value: result, type: "number" };
}
function eval_binary_expr(binop, env) {
    const lhs = evaluate(binop.left, env);
    const rhs = evaluate(binop.right, env);
    if (lhs.type == "number" && rhs.type == "number") {
        return eval_numeric_binary_expr(lhs, rhs, binop.operator);
    }
    return MK_NULL();
}
function eval_assignment(node, env) {
    if (node.assigne.kind !== "Identifier") {
        throw `Invalid LHS inaide assignment expr ${JSON.stringify(node.assigne)}`;
    }
    const varname = node.assigne.symbol;
    return env.assignVar(varname, evaluate(node.value, env));
}
function eval_var_declaration(declaration, env) {
    const value = declaration.value
        ? evaluate(declaration.value, env)
        : MK_NULL();
    return env.declareVar(declaration.identifier, value, declaration.constant);
}
function eval_identifier(ident, env) {
    const val = env.lookupVar(ident.symbol);
    return val;
}
function eval_function(func, args) {
    const scope = new Environment(func.declarationEnv);
    for (let i = 0; i < func.parameters.length; i++) {
        const varname = func.parameters[i];
        scope.declareVar(varname, args[i], false);
    }
    let result = MK_NULL();
    for (const stmt of func.body) {
        result = evaluate(stmt, scope);
    }
    return result;
}
function eval_call_expr(expr, env) {
    const args = expr.args.map(arg => evaluate(arg, env));
    const fn = evaluate(expr.caller, env);
    if (fn != null) {
        if (fn.type == "native-fn") {
            return fn.call(args, env);
        }
        if (fn.type == "function") {
            const func = fn;
            return eval_function(func, args);
        }
    }
    throw "Cannot call value that is not a function: " + JSON.stringify(fn);
}
function eval_array_expr(obj, env) {
    const array = { type: "array", values: [] };
    for (const value of obj.values) {
        const runtimeVal = evaluate(value, env);
        array.values.push(runtimeVal);
    }
    return array;
}
function eval_function_declaration(declaration, env) {
    const fret = {
        type: "function",
        name: declaration.name,
        parameters: declaration.parameters,
        declarationEnv: env,
        body: declaration.body,
    };
    return declaration.name == "<anonymous>" ? fret : env.declareVar(declaration.name, fret, true);
}
function eval_object_expr(obj, env) {
    const object = { type: "object", properties: new Map() };
    for (const { key, value } of obj.properties) {
        const runtimeVal = (value == undefined)
            ? env.lookupVar(key)
            : evaluate(value, env);
        object.properties.set(key, runtimeVal);
    }
    return object;
}
function eval_body(body, env, newEnv = true) {
    let scope;
    if (newEnv) {
        scope = new Environment(env);
    }
    else {
        scope = env;
    }
    let result = MK_NULL();
    for (const stmt of body) {
        result = evaluate(stmt, scope);
    }
    return result;
}
function eval_try_catch_statement(env, declaration) {
    const try_env = new Environment(env);
    const catch_env = new Environment(env);
    try {
        if (declaration) {
            return eval_body(declaration.body, try_env, false);
        }
        throw new Error("Declaration is undefined");
    }
    catch (e) {
        env.assignVar('error', MK_STRING(e instanceof Error ? e.message : String(e)));
        if (declaration) {
            return eval_body(declaration.alternate, catch_env, false);
        }
        throw new Error("Declaration is undefined");
    }
}
function eval_val_declaration(declaration, env) {
    const value = declaration.value ? evaluate(declaration.value, env) : MK_NULL();
    return env.declareVar(declaration.identifier, value, declaration.constant);
}
function eval_for_statement(declaration, env) {
    env = new Environment(env);
    eval_val_declaration(declaration.init, env);
    const body = declaration.body;
    const update = declaration.update;
    let test = evaluate(declaration.test, env);
    if (test.value !== true)
        return MK_NULL();
    do {
        eval_body(body, new Environment(env), false);
        eval_assignment(update, env);
        test = evaluate(declaration.test, env);
    } while (test.value);
    return MK_NULL();
}
function eval_if_statement(declaration, env) {
    const test = evaluate(declaration.test, env);
    if (test.value === true) {
        return eval_body(declaration.body, env);
    }
    else if (declaration.alternate) {
        return eval_body(declaration.alternate, env);
    }
    else {
        return MK_NULL();
    }
}
function eval_member_expr(env, node, expr) {
    if (expr)
        return env.lookupOrMutObject(expr);
    if (node)
        return env.lookupOrMutObject(node.assigne, evaluate(node.value, env));
    throw `Evaluating a member expression is not possible without a member or assignment expression.`;
}
function evaluate(astNode, env) {
    switch (astNode.kind) {
        case "NumericLiteral":
            return {
                value: (astNode.value),
                type: "number",
            };
        case "StringLiteral":
            return { value: (astNode.value), type: "string" };
        case "Identifier":
            return eval_identifier(astNode, env);
        case "ObjectLiteral":
            return eval_object_expr(astNode, env);
        case "ArrayLiteral":
            return eval_array_expr(astNode, env);
        case "BinaryExpr":
            return eval_binary_expr(astNode, env);
        case "CallExpr":
            return eval_call_expr(astNode, env);
        case "Program":
            return eval_program(astNode, env);
        case "VarDeclaration":
            return eval_var_declaration(astNode, env);
        case "AssignmentExpr":
            return eval_assignment(astNode, env);
        case "FunctionDeclaration":
            return eval_function_declaration(astNode, env);
        case "IfStatement":
            return eval_if_statement(astNode, env);
        case "ForStatement":
            return eval_for_statement(astNode, env);
        case "MemberExpr":
            return eval_member_expr(env, undefined, astNode);
        case "TryCatchStatement":
            return eval_try_catch_statement(env, astNode);
        default:
            console.error("This AST Node has not yet been setup for interpretation.", astNode);
            process.exit(0);
    }
}
function createGlobalEnv() {
    const env = new Environment();
    env.declareVar("true", MK_BOOL(true), true);
    env.declareVar("false", MK_BOOL(false), true);
    env.declareVar("null", MK_NULL(), true);
    env.declareVar("strum", MK_NATIVE_FN((args, scope) => {
        printValues(args);
        return MK_NULL();
    }), true);
    function timeFunction(_args, _env) {
        return MK_NUMBER(Date.now());
    }
    env.declareVar("now", MK_NATIVE_FN(timeFunction), true);
    env.declareVar("string", MK_NATIVE_FN((args) => {
        const arg = args.shift();
        if (arg) {
            switch (arg.type) {
                case "string":
                    return MK_NUMBER(arg.value.length);
                case "object":
                    return MK_NUMBER(arg.properties.size);
                case "array":
                    return MK_NUMBER(arg.values.length);
                default:
                    throw "Cannot get length of type: " + arg.type;
            }
        }
        return MK_NULL();
    }), true);
    function closeFussion() {
        process.exit();
        return MK_NULL();
    }
    let waitDepth = 0;
    let shouldExit = false;
    env.declareVar("exit", MK_NATIVE_FN(() => closeFussion()), true);
    env.declareVar("finishExit", MK_NATIVE_FN(() => {
        if (waitDepth == 0) {
            closeFussion();
        }
        else {
            shouldExit = true;
        }
        return MK_NULL();
    }), true);
    return env;
}
class Environment {
    constructor(parentENV) {
        const global = parentENV ? true : false;
        this.parent = parentENV;
        this.variables = new Map();
        this.constants = new Set();
    }
    declareVar(varname, value, constant) {
        if (this.variables.has(varname)) {
            throw `Cannot declare variable ${varname}. As it already is defined.`;
        }
        this.variables.set(varname, value);
        if (constant) {
            this.constants.add(varname);
        }
        return value;
    }
    lookupOrMutObject(expr, value, property) {
        let pastVal;
        if (expr.object.kind === 'MemberExpr') {
            pastVal = this.lookupOrMutObject(expr.object, undefined, expr.object.property);
        }
        else {
            const varname = expr.object.symbol;
            const env = this.resolve(varname);
            pastVal = env.variables.get(varname);
        }
        if (!pastVal) {
            throw "Cannot lookup or mutate type: undefined";
        }
        switch (pastVal.type) {
            case "object": {
                const currentProp = expr.property.symbol;
                const prop = property ? property.symbol : currentProp;
                if (value)
                    pastVal.properties.set(prop, value);
                if (currentProp)
                    pastVal = pastVal.properties.get(currentProp);
                return pastVal;
            }
            case "array": {
                const numRT = evaluate(expr.property, this);
                if (numRT.type != "number")
                    throw "Arrays do not have keys: " + expr.property;
                const num = numRT.value;
                if (value)
                    pastVal.values[num] = value;
                return pastVal.values[num];
            }
            default:
                if (!pastVal) {
                    throw "Cannot lookup or mutate type: undefined";
                }
                throw "Cannot lookup or mutate type: " + pastVal.type;
        }
    }
    assignVar(varname, value) {
        const env = this.resolve(varname);
        if (env.constants.has(varname)) {
            throw `Cannot reasign to variable ${varname} as it was declared constant.`;
        }
        env.variables.set(varname, value);
        return value;
    }
    lookupVar(varname) {
        const env = this.resolve(varname);
        return env.variables.get(varname);
    }
    resolve(varname) {
        if (this.variables.has(varname)) {
            return this;
        }
        if (this.parent == undefined) {
            throw `Cannot resolve '${varname}' as it does not exist.`;
        }
        return this.parent.resolve(varname);
    }
}
function printValues(args) {
    for (let i = 0; i < args.length; i++) {
        const arg = args[i];
        console.log(runtimeToJS(arg));
    }
}
function runtimeToJS(arg) {
    switch (arg.type) {
        case "string":
            return arg.value;
        case "number":
            return arg.value;
        case "boolean":
            return arg.value;
        case "null":
            return arg.value;
        case "object": {
            const obj = {};
            const aObj = arg;
            aObj.properties.forEach((value, key) => obj[key] = runtimeToJS(value));
            return obj;
        }
        case "array": {
            const arr = [];
            const aArr = arg;
            aArr.values.forEach(value => arr.push(runtimeToJS(value)));
            return arr;
        }
        case 'function': {
            const fn = arg;
            return fn.name == "<anonymous>" ? `[Function (anonymous)]` : `[Function: ${fn.name}]`;
        }
        case "native-fn": {
            return `[Native Function]`;
        }
        default:
            return arg;
    }
}
function jsToRuntime(val) {
    if (val == null)
        return MK_NULL();
    switch (typeof val) {
        case "boolean":
            return MK_BOOL(val);
        case "bigint":
        case "number":
            return MK_NUMBER(val);
        case "string":
            return MK_STRING(val);
        case "object": {
            if (Array.isArray(val)) {
                const arr = [];
                val.forEach(value => {
                    arr.push(jsToRuntime(value));
                });
                return MK_ARRAY(arr);
            }
            const prop = new Map();
            Object.keys(val).forEach(key => {
                prop.set(key, jsToRuntime(val[key]));
            });
            return MK_OBJECT(prop);
        }
        default:
            return MK_NULL();
    }
}
const args = process.argv;
args.shift();
args.shift();
const file = args.shift();
if (file) {
    run(file);
}
else {
    repl();
}
async function run(filename) {
    let input = (0, fs_1.readFileSync)(filename, 'utf-8') + "\nfinishExit()";
    const parser = new Parser();
    const env = createGlobalEnv();
    const program = parser.produceAST(input);
    evaluate(program, env);
}
async function repl() {
    const readline = await Promise.resolve().then(() => __importStar(require('readline/promises')));
    const parser = new Parser();
    const env = createGlobalEnv();
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    console.log("Repl v0.1 (Fussion)");
    while (true) {
        const input = await rl.question("> ");
        const program = parser.produceAST(input);
        try {
            const result = runtimeToJS(evaluate(program, env));
            console.log(result);
        }
        catch (err) {
            console.log(err);
        }
    }
}
