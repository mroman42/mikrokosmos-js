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
	{regex: /(?:id|const|compose|true|false|and|or|not|ifelse|succ|plus|mult|pred|minus|iszero|leq|eq)\b/,
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
	{regex: /ski: (on|off)$/, token: "variable-3"},
	
	// Expression
	{regex: /(.*?)(⇒.*?)(\:\:.*?)$/g,
	 token: ["def","number","variable-2"]},
	{regex: /(.*?)(⇒.*?)$/g,
	 token: ["def","number"]},
	{regex: /(.*?)(⇒.*?)$/g,
	 token: ["def","number"]},
    ],
    meta: {
	dontIndentStates: ["comment"],
	lineComment: "#"
    }
});
