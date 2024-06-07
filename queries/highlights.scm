; Identifiers

(identifier) @variable
(type_definition) @type
(primitive_type) @type.builtin
(member_access) @property

; Function calls

(call_expression name: (identifier) @function)

; definitions

(configuration_definition name: (identifier) @identifier)
(program_definition name: (identifier) @identifier)
(function_definition name: (identifier) @identifier)
(function_block_definition name: (identifier) @identifier)
(class_definition name: (identifier) @identifier)
(namespace_definition name: (identifier) @identifier)

(inline_comment) @comment
(block_comment) @comment

;(inline_comment (doc_comment)) @comment.documentation
;(block_comment (doc_comment)) @comment.documentation

"(" @punctuation.bracket
")" @punctuation.bracket
"[" @punctuation.bracket
"]" @punctuation.bracket

":" @punctuation.delimiter
"." @punctuation.delimiter
"," @punctuation.delimiter
";" @punctuation.delimiter

[
"protected"
"and"
"or"
"not"
"at"
"with" 
"type"
"end_type"
"struct"
"end_struct"
"configuration"
"end_configuration"
"class" 
"end_class" 
"namespace" 
"end_namespace"
"constant"
"mod"
"public"
"internal"
"if" 
"then" 
"else" 
"elsif" 
"end_if"
"case"
"end_case"
"for" 
"end_for"
"repeat"
"end_repeat"
"while"
"end_while"
] @keyword

[
"program" 
"end_program" 
"function" 
"end_function"
"function_block"
"end_function_block"
"method"
"end_method"
"task"
] @keyword.function


(boolean) @keyword
