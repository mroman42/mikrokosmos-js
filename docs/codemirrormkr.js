CodeMirror.defineSimpleMode("mikrokosmos", {
    // The start state contains the rules that are intially used
    start: [
	// Comments
	{regex: /\#.*/, token: "comment"},
	// Interpreter
	{regex: /\:verbose|\:ski|\:types/, token: "atom"},

	// Binding
	{regex: /(.*?)(\s*)(=)(\s*)(.*?)$/,
	 token: ["def",null,"operator",null,"variable"]},
	// Operators
	{regex: /[=!]+/, token: "atom"},
	{regex: /(id|const|compose|true|false|and|or|not|implies|ifelse|succ|plus|mult|pred|minus|iszero|leq|eq|S|K|I|C|B|W|Y|tuple|first|second|cons|nil|sum|prod|length|foldr|map|filter|node|omega|fix|fact|fib|pair)\b/,
	 token: "keyword"},
	{regex: /(?:fst|snd|inl|inr|caseof|unit|abort|absurd)\b/,
	 token: "keyword"},
	// Variables
	// {regex: /[a-z$][\w$]*/, token: "property"}
    ],
    // The meta property contains global information about the mode. It
    // can contain properties like lineComment, which are supported by
    // all modes, and also directives like dontIndentStates, which are
    // specific to simple modes.
    meta: {
	dontIndentStates: ["comment"],
	lineComment: "#"
    }
});


CodeMirror.defineSimpleMode("mikrokosmosoutput", {
    start: [
	// Error
	{regex: /Error:(.*?)$/, token: "keyword"},

	// Command
	{regex: /types: (on|off)$/, token: "variable-3"},
	{regex: /verbose: (on|off)$/, token: "variable-3"},
	{regex: /ski mode: (on|off)$/, token: "variable-3"},
	
	// Expression
	{regex: /(.*?)(⇒.*?)(\:\:.*?)$/g,
	 token: ["def","number","variable-3"]},
	{regex: /(.*?)(⇒.*?)$/g,
	 token: ["def","number"]},
	{regex: /(.*?)(⇒.*?)$/g,
	 token: ["def","number"]},
	{regex: /(.*?)(\:\:.*?)$/g,
	 token: ["def","variable-2"]},

	// Deduction
	{regex: /(.*?)(∷)(.*?)(\ \ \ )/g,
	 token: ["def","variable-3","variable-3",null]},
    ],
    meta: {
	dontIndentStates: ["comment"],
	lineComment: "#"
    }
});
