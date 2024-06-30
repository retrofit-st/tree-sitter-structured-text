
(program_declaration) @local.scope
(class_declaration) @local.scope
(function_declaration) @local.scope
(function_block_declaration) @local.scope
(var_declaration name: (identifier) @local.definition)
;(var_input_declaration (identifier) @local.definition)

(assignment left:(identifier) @local.definition)

(identifier) @local.reference