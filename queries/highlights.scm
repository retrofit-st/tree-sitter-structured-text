; The capture names should correspond to the semantic tokens in the lsp spec.
; This way it's easier to map them in an lsp implementation. This could change 
; in the future, but for now it's easier to deal with.

(identifier) @variable
(primitive_type) @type
(struct_access name: (identifier) @struct)
(enum_access name: (identifier) @enum)
(struct_access member: (identifier) @property)
(enum_access member: (identifier) @enumMember)

(call_expression name: (identifier) @function)

(configuration_declaration name: (identifier) @type.declaration)
(program_declaration name: (identifier) @type.declaration)
(function_declaration name: (identifier) @function.declaration) 
(function_block_declaration name: (identifier) @function.declaration) 
(class_declaration name: (identifier) @class.declaration) 
(namespace_declaration name: (identifier) @namespace.declaration) 
(struct_declaration name: (identifier) @struct.declaration)
(enum_declaration name: (identifier) @enum.declaration) 
(pragma_declaration) @macro

(var_input_declaration (var_declaration name: (identifier) @parameter))
(var_output_declaration (var_declaration name: (identifier) @parameter.modification))
(var_in_out_declaration (var_declaration name: (identifier) @parameter))
(var_global_declaration (var_declaration name: (identifier) @variable))
(var_temp_declaration (var_declaration name: (identifier) @variable))
(var_external_declaration (var_declaration name: (identifier) @variable))
(var_static_declaration (var_declaration name: (identifier) @variable.static))

; comments
(inline_comment) @comment
(block_comment) @comment.multiline
(doc_comment) @comment.documentation


[
    ";"
    "."
    ","
] @punctuation.delimiter

[
    "using"
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
    "private"
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
    "array"
    "of"
    "do"
    "to"
    "by"
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
    "**"
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
