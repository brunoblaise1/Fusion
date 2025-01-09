#!/usr/bin/env node
//const prompt = require("prompt-sync")({ sigint: true });
 import { readFileSync } from 'fs';
enum TokenType{
      String,
    OpenParen,
    CloseParen,
    BinaryOperator,
    Equals,
    Colon,
    Comma,
    OpenBrace,
    CloseBrace,
    OpenBracket,
    CloseBracket,

    Number,
    Identifier,

  Fret,
 
 If,
    Else,
    Chord,

  Dot,

    Play,
  Press,
 
    EOF,
}

interface Token {
    value: string,
    type: TokenType,
}

const KEYWORDS: Record<string, TokenType> = {
    play: TokenType.Play,
  press: TokenType.Press,
  fret: TokenType.Fret,
     if: TokenType.If,
    else: TokenType.Else,
    chord: TokenType.Chord,

  
};




function isalpha(src: string) {
	return src.toUpperCase() != src.toLowerCase();
}


function isskippable(str: string) {
  return str == " " || str == "\n" || str == "\t" || str == "\r" ;
}

const ESCAPED: Record<string, string> = {
    n: "\n",
    t: "\t",
    r: "\r",
};
function isint(str: string) {
	const c = str.charCodeAt(0);
	const bounds = ["0".charCodeAt(0), "9".charCodeAt(0)];
	return c >= bounds[0] && c <= bounds[1];
}

function token(value: string="", type: TokenType): Token{
    return {value, type}
}


function tokenize(sourceCode: string): Token[] {
    const tokens = new Array<Token>()
    const src = sourceCode.split("")
   

    while (src.length > 0) {
      const char = src[0]
      
      if (char === '/' && src[1] === '/') {
        while (src.length > 0 && src[0] !== '\n') {
          src.shift();            
        }
        src.shift();
      
        continue;
      } else if (char == '"') {
             let str = "";
            src.shift(); 
            let escaped = false;
         while (src.length > 0 && src[0] !== '\n') {
           const key = src.shift();

                if (key === "\\") {
                    escaped = !escaped;
                    if (escaped) continue;
                } else if (key === '"') {
                    if (!escaped) break;
                    escaped = false;
                } else if (escaped) {
                    escaped = false;
                    if (key && ESCAPED[key]) {
                        str += ESCAPED[key];
                        continue;
                    } else {
                        str += `\\`;
                    }
                }
                str += key;
        }
        tokens.push(token(str, TokenType.String));
      }
    else if (char == "(") {
            tokens.push(token(src.shift(), TokenType.OpenParen))
        }else  if (char == ")") {
            tokens.push(token(src.shift(), TokenType.CloseParen))
        } else if (char == "+" || char == "-" || char == "/" || char == "*" || char == "%" ) {
            tokens.push(token(src.shift(), TokenType.BinaryOperator))
            
        } else if (char == "=") {
            tokens.push(token(src.shift(), TokenType.Equals))
            
        }else if (char == ":") {
      tokens.push(token(src.shift(), TokenType.Colon));
    } else if (char == ",") {
      tokens.push(token(src.shift(), TokenType.Comma));
    }   else if (char == "{") {
      tokens.push(token(src.shift(), TokenType.OpenBrace));
    } else if (char== "}") {
      tokens.push(token(src.shift(), TokenType.CloseBrace));
    } else if (char == "[") {
      tokens.push(token(src.shift(), TokenType.OpenBracket));
    } else if (char == "]") {
      tokens.push(token(src.shift(), TokenType.CloseBracket));
    }  else if (char == ".") {
      tokens.push(token(src.shift(), TokenType.Dot));
        } else {
          
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
        } else {
    
          tokens.push(token(ident, TokenType.Identifier));
        } 
      }  else if (isskippable(char)) {
 
        src.shift();
      }  else {
        console.error(
          "Unreconized character found in source: ",
          src[0].charCodeAt(0),
          src[0],
        );
        process.exit(1);
      }
    }
  }

  tokens.push({ type: TokenType.EOF, value: "EndOfFile" });
  return tokens;
}


// fs.readFile('./basic.fu', (err, data) => {

// 	const source = data.toString();
// 	for (const token of tokenize(source)) {
// 		console.log(token);
// 	}
// });


// AST


type NodeType =
  | "Program"
  | "VarDeclaration"
  | "FunctionDeclaration"
  | "NumericLiteral"
  | "Identifier"
  | "MemberExpr"
  | "ObjectLiteral"
  | "AssignmentExpr"
  | "CallExpr"
  | "BinaryExpr"
  | "Property"
   | "IfStatement"
  | "ForStatement"
  | "ArrayLiteral"
    | "StringLiteral"
  | "TryCatchStatement";

interface Stmt {
  kind: NodeType;
}


interface Program extends Stmt {
  kind: "Program";
  body: Stmt[];
}
 interface AssignmentExpr extends Expr {
  kind: "AssignmentExpr";
  assigne: Expr;
  value: Expr;
}
 interface Property extends Expr {
  kind: "Property";
  key: string;
  value?: Expr;
}

 interface VarDeclaration extends Stmt {
  kind: "VarDeclaration";
  constant: boolean;
  identifier: string;
  value?: Expr;
}

interface FunctionDeclaration extends Stmt {
	kind: "FunctionDeclaration";
	parameters: string[];
	name: string;
	body: Stmt[];
}
 interface IfStatement extends Stmt {
  kind: "IfStatement";
  test: Expr;
  body: Stmt[];
  alternate?: Stmt[];
}

 interface TryCatchStatement extends Stmt {
  kind: "TryCatchStatement";
  body: Stmt[];
  alternate: Stmt[];
}

 interface ForStatement extends Stmt {
  kind: "ForStatement";
  init: VarDeclaration;
  test: Expr;
  update: AssignmentExpr;
  body: Stmt[];
}

 interface StringLiteral extends Expr {
  kind: "StringLiteral";
  value: string;
}

 interface ArrayLiteral extends Expr {
  kind: "ArrayLiteral";
  values: Array<Expr>;
}

interface Expr extends Stmt { }

interface BinaryExpr extends Expr {
  kind: "BinaryExpr";
  left: Expr;
  right: Expr;
  operator: string;
}


 interface Identifier extends Expr {
  kind: "Identifier";
  symbol: string;
}

 interface ObjectLiteral extends Expr {
  kind: "ObjectLiteral";
  properties: Property[];
}

 interface CallExpr extends Expr {
  kind: "CallExpr";
  args: Expr[];
  caller: Expr;
}

 interface NumericLiteral extends Expr {
  kind: "NumericLiteral";
  value: number;
}


 interface MemberExpr extends Expr {
  kind: "MemberExpr";
  object: Expr;
  property: Expr;
  computed: boolean;
}






 class Parser {
  private tokens: Token[] = [];

 
  private not_eof(): boolean {
    return this.tokens[0].type != TokenType.EOF;
  }

  private at() {
    return this.tokens[0] as Token;
  }

  private eat() {
    const prev = this.tokens.shift() as Token;
    return prev;
  }


  private expect(type: TokenType, err: any) {
    const prev = this.tokens.shift() as Token;
    if (!prev || prev.type != type) {
      console.error("Parser Error:\n", err, prev, " - Expecting: ", type);
      process.exit(1);
    }

    return prev;
  }

  public produceAST(sourceCode: string): Program {
    this.tokens = tokenize(sourceCode);
    const program: Program = {
      kind: "Program",
      body: [],
    };


    while (this.not_eof()) {
      program.body.push(this.parse_stmt());
    }

    return program;
  }

  
  private parse_stmt(): Stmt {

    switch (this.at().type) {
      case TokenType.Play:
      case TokenType.Press:
        return this.parse_var_declaration();
      case TokenType.Fret:
        return this.parse_fr_declaration()
      default:
        return this.parse_expr();
    }
   }
   	parse_fr_declaration(): Stmt {
		this.eat();
		const name = this.expect(
			TokenType.Identifier,
			"Expected function name following fn keyword"
		).value;

		const args = this.parse_args();
		const params: string[] = [];
		for (const arg of args) {
			if (arg.kind !== "Identifier") {
				console.log(arg);
				throw "Inside function declaration expected parameters to be of type string.";
			}

			params.push((arg as Identifier).symbol);
		}

		this.expect(
			TokenType.OpenBrace,
			"Expected function body following declaration"
		);
		const body: Stmt[] = [];

		while (
			this.at().type !== TokenType.EOF &&
			this.at().type !== TokenType.CloseBrace
		) {
			body.push(this.parse_stmt());
		}

		this.expect(
			TokenType.CloseBrace,
			"Closing brace expected inside function declaration"
		);

		const fr = {
			body,
			name,
			parameters: params,
			kind: "FunctionDeclaration",
		} as FunctionDeclaration;

		return fr;
	}
  parse_var_declaration(): Stmt {
    const isConstant = this.eat().type == TokenType.Press;
    const identifier = this.expect(
      TokenType.Identifier,
      "Expected identifier name following play | press keywords.",
    ).value;
   
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
    } as VarDeclaration;

 

    return declaration;
  }


    
    private parse_expr(): Expr {
    return this.parse_assignment_expr();
  }

  parse_assignment_expr(): Expr {
     const left = this.parse_object_expr();

    if (this.at().type == TokenType.Equals) {
      this.eat(); 
      const value = this.parse_assignment_expr();
      return { value, assigne: left, kind: "AssignmentExpr" } as AssignmentExpr;
    }

    return left;
   }
   
     private parse_object_expr(): Expr {

    if (this.at().type !== TokenType.OpenBrace) {
      return this.parse_additive_expr();
    }

    this.eat(); 
    const properties = new Array<Property>();

    while (this.not_eof() && this.at().type != TokenType.CloseBrace) {
      const key =
        this.expect(TokenType.Identifier, "Object literal key exprected").value;

   
      if (this.at().type == TokenType.Comma) {
        this.eat(); 
        properties.push({ key, kind: "Property" } as Property);
        continue;
      } 
      else if (this.at().type == TokenType.CloseBrace) {
        properties.push({ key, kind: "Property" });
        continue;
      }

      this.expect(
        TokenType.Colon,
        "Missing colon following identifier in ObjectExpr",
      );
      const value = this.parse_expr();

      properties.push({ kind: "Property", value, key });
      if (this.at().type != TokenType.CloseBrace) {
        this.expect(
          TokenType.Comma,
          "Expected comma or closing bracket following property",
        );
      }
    }

    this.expect(TokenType.CloseBrace, "Object literal missing closing brace.");
    return { kind: "ObjectLiteral", properties } as ObjectLiteral;
  }

  private parse_additive_expr(): Expr {
    let left = this.parse_multiplicitave_expr();

    while (this.at().value == "+" || this.at().value == "-") {
      const operator = this.eat().value;
      const right = this.parse_multiplicitave_expr();
      left = {
        kind: "BinaryExpr",
        left,
        right,
        operator,
      } as BinaryExpr;
    }

    return left;
  }


  private parse_multiplicitave_expr(): Expr {
   let left = this.parse_call_member_expr();

    while (
      this.at().value == "/" || this.at().value == "*" || this.at().value == "%"
    ) {
      const operator = this.eat().value;
      const right = this.parse_primary_expr();
      left = {
        kind: "BinaryExpr",
        left,
        right,
        operator,
      } as BinaryExpr;
    }

    return left;
   }
   private parse_call_member_expr(): Expr {
        const member = this.parse_member_expr();

        if (this.at().type == TokenType.OpenParen) {
            return this.parse_call_expr(member);
        }

        return member;
    }
    private parse_call_expr(caller: Expr): Expr {
        let call_expr: Expr = {
            kind: "CallExpr",
            caller,
            args: this.parse_args(),
        } as CallExpr;

    
        if (this.at().type == TokenType.OpenParen) {
            call_expr = this.parse_call_expr(call_expr);
        }

        return call_expr;
    }

    private parse_args(): Expr[] {
        this.expect(TokenType.OpenParen, "Opening parenthesis (\"(\") expected while parsing arguments.");
        const args = this.at().type == TokenType.CloseParen
            ? []
            : this.parse_args_list();

        this.expect(TokenType.CloseParen, "Closing parenthesis (\")\") expected while parsing arguments.");

        return args;
    }

   
    private parse_args_list(): Expr[] {
        const args = [this.parse_expr()];

        while (this.at().type == TokenType.Comma && this.eat()) {
            args.push(this.parse_expr());
        }

        return args;
    }

    private parse_member_expr(): Expr {
        let object = this.parse_primary_expr();

        while (this.at().type == TokenType.Dot || this.at().type == TokenType.OpenBracket) {
            const operator = this.eat();
            let property: Expr;
            let computed: boolean;

            if (operator.type == TokenType.Dot) {
                computed = false;
            
                property = this.parse_primary_expr();

                if (property.kind !== "Identifier") {
                    throw "Dot operator (\".\") is illegal without right-hand-side (<-) being an Identifier."
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
            } as MemberExpr;
        }

        return object;
    }



    private parse_primary_expr(): Expr {
        const tk = this.at().type;

        switch (tk) {
            case TokenType.Identifier:
                return { kind: "Identifier", symbol: this.eat().value } as Identifier;
            case TokenType.Number:
                return {
                    kind: "NumericLiteral",
                    value: parseFloat(this.eat().value)
                } as NumericLiteral;
            case TokenType.String:
                return {
                    kind: "StringLiteral",
                    value: this.eat().value,
                } as StringLiteral;
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






 type ValueType = "null" | "number" | "boolean" | "native-fn" | "object"| "function" | "string" | "array";

 interface RuntimeVal {
  type: ValueType;
}

/**
 * Defines a value of undefined meaning
 */
 interface NullVal extends RuntimeVal {
  type: "null";
  value: null;
}

 interface ObjectVal extends RuntimeVal {
  type: "object";
  properties: Map<string, RuntimeVal>;
}
 interface ArrayVal extends RuntimeVal {
    type: "array";
    values: RuntimeVal[];
}

 interface StringVal extends RuntimeVal {
    type: "string";
    value: string;
}
 function MK_NULL() {
  return { type: "null", value: null } as NullVal;
}

 interface BooleanVal extends RuntimeVal {
  type: "boolean";
  value: boolean;
}

 function MK_BOOL(b = true) {
  return { type: "boolean", value: b } as BooleanVal;
}

 type FunctionCall = (args: RuntimeVal[], env: Environment) => RuntimeVal;

 interface NativeFnValue extends RuntimeVal {
	type: "native-fn";
	call: FunctionCall;
}
 function MK_NATIVE_FN(call: FunctionCall) {
	return { type: "native-fn", call } as NativeFnValue;
}

 function MK_STRING(val: string): StringVal {
    return { type: "string", value: val } as StringVal;
}

 function MK_OBJECT(obj: Map<string, RuntimeVal>): ObjectVal {
    return { type: "object", properties: obj } as ObjectVal;
}

 function MK_ARRAY(arr: RuntimeVal[]): ArrayVal {
    return { type: "array", values: arr } as ArrayVal;
}
/**
 * Runtime value that has access to the raw native javascript number.
 */
 interface NumberVal extends RuntimeVal {
  type: "number";
  value: number;
}

 function MK_NUMBER(n = 0) {
  return { type: "number", value: n } as NumberVal;
}

 interface FunctionValue extends RuntimeVal {
	type: "function";
	name: string;
	parameters: string[];
	declarationEnv: Environment;
	body: Stmt[];
}

function eval_program(program: Program, env: Environment): RuntimeVal {
  let lastEvaluated: RuntimeVal = MK_NULL();
  for (const statement of program.body) {
    lastEvaluated = evaluate(statement, env);
  }
  return lastEvaluated;
}

/**
 * Evaulate pure numeric operations with binary operators.
 */
function eval_numeric_binary_expr(
  lhs: NumberVal,
  rhs: NumberVal,
  operator: string,
): NumberVal {
  let result: number;
  if (operator == "+") {
    result = lhs.value + rhs.value;
  } else if (operator == "-") {
    result = lhs.value - rhs.value;
  } else if (operator == "*") {
    result = lhs.value * rhs.value;
  } else if (operator == "/") {
    result = lhs.value / rhs.value;
  } else {
    result = lhs.value % rhs.value;
  }

  return { value: result, type: "number" };
}


function eval_binary_expr(binop: BinaryExpr, env: Environment): RuntimeVal {
  const lhs = evaluate(binop.left, env);
  const rhs = evaluate(binop.right, env);

  if (lhs.type == "number" && rhs.type == "number") {
    return eval_numeric_binary_expr(
      lhs as NumberVal,
      rhs as NumberVal,
      binop.operator,
    );
    }
 
  return MK_NULL();
}

 function eval_assignment(
  node: AssignmentExpr,
  env: Environment,
): RuntimeVal {
  if (node.assigne.kind !== "Identifier") {
    throw `Invalid LHS inaide assignment expr ${JSON.stringify(node.assigne)}`;
  }

  const varname = (node.assigne as Identifier).symbol;
  return env.assignVar(varname, evaluate(node.value, env));
}

function eval_var_declaration(
  declaration: VarDeclaration,
  env: Environment,
): RuntimeVal {
  const value = declaration.value
    ? evaluate(declaration.value, env)
    : MK_NULL();

  return env.declareVar(declaration.identifier, value, declaration.constant);
}

function eval_identifier(ident: Identifier, env: Environment): RuntimeVal {
  const val = env.lookupVar(ident.symbol);
  return val;
}

function eval_function(func: FunctionValue, args: RuntimeVal[]): RuntimeVal {
    const scope = new Environment(func.declarationEnv);

    for (let i = 0; i < func.parameters.length; i++) {
  
        const varname = func.parameters[i];
        scope.declareVar(varname, args[i], false);
    }

    let result: RuntimeVal = MK_NULL();

   
    for (const stmt of func.body) {
        result = evaluate(stmt, scope);
    }

    return result;
}

 function eval_call_expr(expr: CallExpr, env: Environment): RuntimeVal {
    const args = expr.args.map(arg => evaluate(arg, env));
    const fn = evaluate(expr.caller, env);

    if(fn != null) {
        if (fn.type == "native-fn") {
            return (fn as NativeFnValue).call(args, env);
        }

        if (fn.type == "function") {
            const func = fn as FunctionValue;
            return eval_function(func, args);
        }
    }

    throw "Cannot call value that is not a function: " + JSON.stringify(fn);
}

function eval_array_expr(obj: ArrayLiteral, env: Environment): RuntimeVal {
    const array = { type: "array", values: [] } as ArrayVal;

    for(const value of obj.values) {
        const runtimeVal = evaluate(value, env);

        array.values.push(runtimeVal);
    }

    return array;
}


 function eval_function_declaration(
	declaration: FunctionDeclaration,
	env: Environment
): RuntimeVal {
	
	const fret = {
		type: "function",
		name: declaration.name,
		parameters: declaration.parameters,
		declarationEnv: env,
		body: declaration.body,
	} as FunctionValue;

  
  return declaration.name == "<anonymous>" ? fret : env.declareVar(declaration.name, fret, true);
}

 function eval_object_expr(
  obj: ObjectLiteral,
  env: Environment,
): RuntimeVal {
  const object = { type: "object", properties: new Map() } as ObjectVal;
  for (const { key, value } of obj.properties) {
    const runtimeVal = (value == undefined)
      ? env.lookupVar(key)
      : evaluate(value, env);

    object.properties.set(key, runtimeVal);
  }

  return object;
}



function eval_body(body: Stmt[], env: Environment, newEnv: boolean = true): RuntimeVal {
    let scope: Environment;

    if (newEnv) {
        scope = new Environment(env);
    } else {
        scope = env;
    }
    let result: RuntimeVal = MK_NULL();

    for (const stmt of body) {
     
        result = evaluate(stmt, scope);
    }

    return result;
}

function eval_try_catch_statement(env: Environment, declaration?: TryCatchStatement): RuntimeVal {
    const try_env = new Environment(env);
    const catch_env = new Environment(env);

    try {
        if (declaration) {
            return eval_body(declaration.body, try_env, false);
        }
        throw new Error("Declaration is undefined");
    } catch (e) {
        env.assignVar('error', MK_STRING(e instanceof Error ? e.message : String(e)));
        if (declaration) {
            return eval_body(declaration.alternate, catch_env, false);
        }
        throw new Error("Declaration is undefined");
    }
}
function eval_val_declaration(declaration: VarDeclaration, env: Environment): RuntimeVal {
    const value = declaration.value ? evaluate(declaration.value, env) : MK_NULL();

    return env.declareVar(declaration.identifier, value, declaration.constant);
}

 function eval_for_statement(declaration: ForStatement, env: Environment): RuntimeVal {
    env = new Environment(env);

    eval_val_declaration(declaration.init, env);

    const body = declaration.body;
    const update = declaration.update;

    let test = evaluate(declaration.test, env);

    if ((test as BooleanVal).value !== true) return MK_NULL(); 

    do {
        eval_body(body, new Environment(env), false);
        eval_assignment(update, env);

        test = evaluate(declaration.test, env);
    } while ((test as BooleanVal).value);

    return MK_NULL();
}
function eval_if_statement(declaration: IfStatement, env: Environment): RuntimeVal {
    const test = evaluate(declaration.test, env);

    if ((test as BooleanVal).value === true) {
        return eval_body(declaration.body, env);
    } else if (declaration.alternate) {
        return eval_body(declaration.alternate, env);
    } else {
        return MK_NULL();
    }
}
function eval_member_expr(env: Environment, node?: AssignmentExpr, expr?: MemberExpr): RuntimeVal {
    if (expr) return env.lookupOrMutObject(expr);
    if (node) return env.lookupOrMutObject(node.assigne as MemberExpr, evaluate(node.value, env));
    
    throw `Evaluating a member expression is not possible without a member or assignment expression.`
}
 function evaluate(astNode: Stmt, env: Environment): RuntimeVal {
  switch (astNode.kind) {
    case "NumericLiteral":
      return {
        value: ((astNode as NumericLiteral).value),
        type: "number",
      } as NumberVal;
    case "StringLiteral":
      return { value: ((astNode as StringLiteral).value), type: "string" } as StringVal;
    case "Identifier":
      return eval_identifier(astNode as Identifier, env);
    case "ObjectLiteral":
      return eval_object_expr(astNode as ObjectLiteral, env);
    case "ArrayLiteral":
       return eval_array_expr(astNode as ArrayLiteral, env);
    case "BinaryExpr":
          return eval_binary_expr(astNode as BinaryExpr, env);
    case "CallExpr":
      return eval_call_expr(astNode as CallExpr, env);
    case "Program":
      return eval_program(astNode as Program, env);
   
    case "VarDeclaration":
      return eval_var_declaration(astNode as VarDeclaration, env);
  
    case "AssignmentExpr":
      return eval_assignment(astNode as AssignmentExpr, env);
    case "FunctionDeclaration":
      return eval_function_declaration(astNode as FunctionDeclaration, env);
     case "IfStatement":
            return eval_if_statement(astNode as IfStatement, env);
    case "ForStatement":
      return eval_for_statement(astNode as ForStatement, env);
    case "MemberExpr":
      return eval_member_expr(env, undefined, astNode as MemberExpr);
   case "TryCatchStatement":
      return eval_try_catch_statement(env, astNode as TryCatchStatement);
    default:
      console.error(
        "This AST Node has not yet been setup for interpretation.",
        astNode,
      );
      process.exit(0);
  }
}

function createGlobalEnv() {
	const env = new Environment();
	
	env.declareVar("true", MK_BOOL(true), true);
	env.declareVar("false", MK_BOOL(false), true);
	env.declareVar("null", MK_NULL(), true);

	env.declareVar(
		"strum",
		MK_NATIVE_FN((args, scope) => {
			  printValues(args);
			return MK_NULL();
		}),
		true
	);

	function timeFunction(_args: RuntimeVal[], _env: Environment) {
		return MK_NUMBER(Date.now());
	}
  env.declareVar("now", MK_NATIVE_FN(timeFunction), true);
  
 env.declareVar("string", MK_NATIVE_FN((args) => {
   const arg = args.shift();
   if (arg) {
     switch (arg.type) {
       case "string":
         return MK_NUMBER((arg as StringVal).value.length);
       case "object":
         return MK_NUMBER((arg as ObjectVal).properties.size);
       case "array":
         return MK_NUMBER((arg as ArrayVal).values.length);
       default:
         throw "Cannot get length of type: " + arg.type;
     }
   }
   return MK_NULL();
 }), true);
  
    function closeFussion(): RuntimeVal {
        process.exit();
        return MK_NULL();
    }
 let waitDepth = 0;
    
    let shouldExit = false;
    env.declareVar("exit", MK_NATIVE_FN(() => closeFussion()), true);

    env.declareVar("finishExit", MK_NATIVE_FN(() => {
        if(waitDepth == 0) {
            closeFussion();
        } else {
            shouldExit = true;
        }
        return MK_NULL();
    }), true);



	return env;
}



class Environment {
	private parent?: Environment;
	private variables: Map<string, RuntimeVal>;
	private constants: Set<string>;

	constructor(parentENV?: Environment) {
		const global = parentENV ? true : false;
		this.parent = parentENV;
		this.variables = new Map();
		this.constants = new Set();
	}

	public declareVar(
		varname: string,
		value: RuntimeVal,
		constant: boolean
	): RuntimeVal {
		if (this.variables.has(varname)) {
			throw `Cannot declare variable ${varname}. As it already is defined.`;
		}

		this.variables.set(varname, value);
		if (constant) {
			this.constants.add(varname);
		}
		return value;
  }
  
      public lookupOrMutObject(expr: MemberExpr, value?: RuntimeVal, property?: Identifier): RuntimeVal {
        let pastVal;
        if (expr.object.kind === 'MemberExpr') {
          
            pastVal = this.lookupOrMutObject(expr.object as MemberExpr, undefined, (expr.object as MemberExpr).property as Identifier);
        } else {
            const varname = (expr.object as Identifier).symbol;
            const env = this.resolve(varname);

            pastVal = env.variables.get(varname);
        }

        if (!pastVal) {
            throw "Cannot lookup or mutate type: undefined";
        }
        switch (pastVal.type) {
            case "object": {
                const currentProp = (expr.property as Identifier).symbol;
                const prop = property ? property.symbol : currentProp;

                if (value) (pastVal as ObjectVal).properties.set(prop, value);

                if (currentProp) pastVal = ((pastVal as ObjectVal).properties.get(currentProp) as ObjectVal);

                return pastVal;
            }
            case "array": {

            
                const numRT: RuntimeVal = evaluate(expr.property, this);

                if(numRT.type != "number") throw "Arrays do not have keys: " + expr.property;

                const num = (numRT as NumberVal).value;

                if(value) (pastVal as ArrayVal).values[num] = value;

                return (pastVal as ArrayVal).values[num];
            }
            default:
                if (!pastVal) {
                    throw "Cannot lookup or mutate type: undefined";
                }
                throw "Cannot lookup or mutate type: " + pastVal.type;
        }
    }


	public assignVar(varname: string, value: RuntimeVal): RuntimeVal {
		const env = this.resolve(varname);

		if (env.constants.has(varname)) {
			throw `Cannot reasign to variable ${varname} as it was declared constant.`;
		}

		env.variables.set(varname, value);
		return value;
	}

	public lookupVar(varname: string): RuntimeVal {
		const env = this.resolve(varname);
		return env.variables.get(varname) as RuntimeVal;
	}

	public resolve(varname: string): Environment {
		if (this.variables.has(varname)) {
			return this;
		}

		if (this.parent == undefined) {
			throw `Cannot resolve '${varname}' as it does not exist.`;
		}

		return this.parent.resolve(varname);
	}
}




 function printValues(args: Array<RuntimeVal>) {
    for (let i = 0; i < args.length; i++) {
        const arg = args[i];

        console.log(runtimeToJS(arg));
    }
}

 function runtimeToJS(arg: RuntimeVal) {
    switch (arg.type) {
        case "string":
            return (arg as StringVal).value;
        case "number":
            return (arg as NumberVal).value;
        case "boolean":
            return (arg as BooleanVal).value;
        case "null":
            return (arg as NullVal).value;
        case "object": {
            const obj: { [key: string]: unknown } = {};
            const aObj = arg as ObjectVal;
            aObj.properties.forEach((value, key) => obj[key] = runtimeToJS(value));
            return obj;
        }
        case "array": {
            const arr: unknown[] = [];
            const aArr = arg as ArrayVal;
            aArr.values.forEach(value => arr.push(runtimeToJS(value)));
            return arr;
        }
        case 'function': {
            const fn = arg as FunctionValue;
            return fn.name == "<anonymous>" ? `[Function (anonymous)]` : `[Function: ${fn.name}]`; 
        }
        case "native-fn": {
            return `[Native Function]`;
        }
        default:
            return arg;
    }
}

 function jsToRuntime(val: unknown): RuntimeVal {
    if(val == null) return MK_NULL();

    switch(typeof val) {
        case "boolean":
            return MK_BOOL(val);
        case "bigint":
        case "number":
            return MK_NUMBER(val as number);
        case "string":
            return MK_STRING(val);
        case "object": {
            if(Array.isArray(val)) {
                const arr: RuntimeVal[] = [];
                val.forEach(value => {
                    arr.push(jsToRuntime(value));
                });
                return MK_ARRAY(arr);
            }
            const prop = new Map<string, RuntimeVal>();
            Object.keys(val as Record<string, unknown>).forEach(key => {
                prop.set(key, jsToRuntime((val as Record<string, unknown>)[key]));
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

if(file) {
    run(file);
} else {
    repl();
}


async function run(filename: string) {

    let input = readFileSync(filename, 'utf-8') + "\nfinishExit()";
    
  

    const parser = new Parser();
    const env = createGlobalEnv();

    const program = parser.produceAST(input);
    
    evaluate(program, env);
}

async function repl() {
    const readline = await import('readline/promises');

    const parser = new Parser();
    const env = createGlobalEnv();

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    console.log("Repl v0.1 (Fussion)");

    while(true) {
        const input = await rl.question("> ");

        const program = parser.produceAST(input);

        try {
            const result = runtimeToJS(evaluate(program, env));
            console.log(result);
        } catch(err) {
            console.log(err);
        }
    }
}