
(program_declaration) @local.scope
(class_declaration) @local.scope
(function_declaration) @local.scope
(function_block_declaration) @local.scope
(var_declaration name: (identifier) @local.definition)
(function_declaration name: (identifier) @local.definition)

(identifier) @local.reference