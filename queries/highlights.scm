; Identifiers

(identifier) @variable
(type_definition) @type
(primitive_type) @type
(struct_access member: (identifier) @property)
(enum_access member: (identifier) @enumMember) 

; Function calls

(call_expression name: (identifier) @function)

; definitions

(configuration_definition name: (identifier) @identifier)
(program_definition name: (identifier) @identifier)
(function_definition name: (identifier) @function) 
(function_block_definition name: (identifier) @function) 
(class_definition name: (identifier) @class) 
(namespace_definition name: (identifier) @namespace) 
(type_definition name: (identifier) @type) 
(struct_definition) @struct
(enum_definition) @enum

; comments
(inline_comment) @comment
(block_comment) @comment
;(inline_comment (doc_comment)) @comment.documentation

[
"protected"
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
"program" 
"end_program" 
"function" 
"end_function"
"function_block"
"end_function_block"
"method"
"end_method"
"task"
"var_input"
"var_output"
"var_in_out"
"var_global"
"var_temp"
"var_external"
"var"
"end_var"
(boolean)
"continue"
"return"
] @keyword

[
"and"
"or"
"xor"
"not"
"mod"
"+"
"-"
"*"
"/"
"<"
"<="
"="
">"
">="
"<>"
] @operator

[
(integer)
(float)
(binary)
(octal)
(hexadecimal)
(time)
(date)
(time_of_day)
(date_and_time)
] @number

[
(string)
(wstring)
] @string
