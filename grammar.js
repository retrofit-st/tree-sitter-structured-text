const integer = seq(optional(/[\+-]/), /\d/, repeat(choice('_', /\d/)));

module.exports = grammar({
  name: 'structured_text',

  word: $ => $.identifier,

  conflicts: $ => [
    [$._expression, $.call_expression],
    [$.call_expression],
    [$.case],
    [$.enum_definition]
  ],

  extras: $ => [$.inline_comment, $.block_comment, $.doc_comment, /\s/],

  rules: {
    source_file: $ => repeat($._definition),

    _definition: $ =>
      choice(
        $.namespace_definition,
        $.configuration_definition,
        $.program_definition,
        seq(repeat($.pragma_definition), $.class_definition),
        seq(repeat($.pragma_definition), $.function_definition),
        seq(repeat($.pragma_definition), $.function_block_definition),
        $.type_definition,
      ),

    pragma_definition: $ => token(seq(
      '{',
      /.*/,
      '}',
    )),

    namespace_definition: $ =>
      seq(
        caseInsensitive('namespace'),
        field('name', seq($.identifier, optional(repeat(seq(token.immediate('.'), $.identifier))))),
        repeat($._definition),
        caseInsensitive('end_namespace'),
      ),

    class_definition: $ =>
      seq(
        caseInsensitive('class'),
        field('name', $.identifier),
        repeat(choice($._statement, $.function_definition)),
        caseInsensitive('end_class'),
      ),

    configuration_definition: $ =>
      seq(
        caseInsensitive('configuration'),
        field('name', $.identifier),
        repeat($._statement),
        caseInsensitive('end_configuration'),
      ),

    program_definition: $ =>
      seq(
        caseInsensitive('program'),
        field('name', $.identifier),
        repeat($._statement),
        caseInsensitive('end_program'),
      ),

    function_definition: $ =>
      seq(
        choice(caseInsensitive('function'), caseInsensitive('method')),
        optional($._access_modifier),
        field('name', $.identifier),
        optional(seq(':', $._data_type)),
        repeat($._statement),
        choice(caseInsensitive('end_function'), caseInsensitive('end_method')),
      ),

    function_block_definition: $ =>
      seq(
        caseInsensitive('function_block'),
        field('name', $.identifier),
        repeat($._statement),
        caseInsensitive('end_function_block'),
      ),

    type_definition: $ =>
      seq(
        caseInsensitive('type'),
        repeat(choice($.struct_definition, $.enum_definition)),
        caseInsensitive('end_type'),
      ),

    struct_definition: $ =>
      seq(
        field('name', $.identifier),
        ':',
        caseInsensitive('struct'),
        repeat1($.var_declaration),
        caseInsensitive('end_struct'),
      ),

    enum_definition: $ =>
      seq(
        field('name', $.identifier),
        ':',
        '(',
        choice(commaSep1(field('enumeration', $.identifier)), repeat1($.assignment)),
        ')',
        optional($.assignment),
      ),

    _statement: $ =>
      choice(
        $.var_statement,
        $.task_statement,
        $.program_statement,
        $._control_statement,
        $._loop_statement,
        $._expression,
        seq($._expression, ':=', $._expression, ';'),
        caseInsensitive('continue'),
        caseInsensitive('return')
      ),

    assignment: $ =>
      seq(
        optional(field('left', $.identifier)),
        ':=',
        field('right', $._expression),
        optional(choice(';', ',')),
      ),

    var_statement: $ =>
      seq(
        choice(
          caseInsensitive('var_input'),
          caseInsensitive('var_output'),
          caseInsensitive('var_in_out'),
          caseInsensitive('var_global'),
          caseInsensitive('var_temp'),
          caseInsensitive('var_external'),
          caseInsensitive('var'),
        ),
        optional($._retain_modifier),
        optional($._access_modifier),
        repeat(seq(repeat($.pragma_definition), $.var_declaration)),
        caseInsensitive('end_var'),
      ),

    task_statement: $ =>
      seq(
        caseInsensitive('task'),
        $.identifier,
        '(',
        caseInsensitive('interval'),
        $.assignment,
        ');',
      ),

    program_statement: $ =>
      seq(
        caseInsensitive('program'),
        $.identifier,
        caseInsensitive('with'),
        $.identifier,
        ':',
        $.identifier,
        ';',
      ),

    _control_statement: $ => choice($.if_statement, $.case_statement),

    if_statement: $ =>
      seq(
        caseInsensitive('if'),
        field('condition', $._expression),
        caseInsensitive('then'),
        repeat($._statement),
        optional(repeat($.elseif_clause)),
        optional($.else_clause),
        caseInsensitive('end_if'),
        optional(';'),
      ),

    elseif_clause: $ =>
      seq(
        caseInsensitive('elsif'),
        field('elsifCondition', $._expression),
        caseInsensitive('then'),
        repeat($._statement),
      ),

    case_statement: $ =>
      seq(
        caseInsensitive('case'),
        field('caseValue', $.identifier),
        caseInsensitive('of'),
        repeat($.case),
        optional($.else_clause),
        caseInsensitive('end_case'),
        optional(';'),
      ),

    case: $ => seq($.case_value, ':', repeat($._statement)),

    case_value: $ => choice($.integer, $.identifier, $._member_access),

    else_clause: $ => seq(caseInsensitive('else'), repeat($._statement)),

    _loop_statement: $ =>
      choice($.for_statement, $.while_statement, $.repeat_statement),

    for_statement: $ =>
      seq(
        caseInsensitive('for'),
        $.range,
        caseInsensitive('do'),
        repeat($._statement),
        caseInsensitive('end_for'),
        optional(';'),
      ),

    range: $ =>
      seq(
        $._expression,
        ':= ',
        $._expression,
        caseInsensitive('to'),
        $._expression,
        optional(seq(caseInsensitive('by'), $._expression)),
      ),

    while_statement: $ =>
      seq(
        caseInsensitive('while'),
        $._expression,
        caseInsensitive('do'),
        repeat($._statement),
        caseInsensitive('end_while'),
        optional(';'),
      ),

    repeat_statement: $ =>
      seq(
        caseInsensitive('repeat'),
        repeat($._statement),
        caseInsensitive('until'),
        field('terminationCondition', $._expression),
        caseInsensitive('end_repeat'),
        optional(';'),
      ),

    _expression: $ =>
      choice(
        $.identifier,
        $._member_access,
        $.array_access,
        $._literal,
        $.parenthesis_expression,
        $.unary_expression,
        $.boolean_expression,
        $.call_expression,
      ),

    parenthesis_expression: $ => seq('(', $._expression, ')'),

    unary_expression: $ =>
      prec(
        6,
        choice(
          seq(caseInsensitive('not'), $._expression),
          seq('+', $._expression),
          seq('-', $._expression),
        ),
      ),

    boolean_expression: $ =>
      choice(
        prec.left(5, seq($._expression, '**', $._expression)),
        prec.left(4, seq($._expression, '*', $._expression)),
        prec.left(4, seq($._expression, '/', $._expression)),
        prec.left(4, seq($._expression, caseInsensitive('mod'), $._expression)),
        prec.left(3, seq($._expression, '+', $._expression)),
        prec.left(3, seq($._expression, '-', $._expression)),
        prec.left(2, seq($._expression, '<', $._expression)),
        prec.left(2, seq($._expression, '>', $._expression)),
        prec.left(2, seq($._expression, '<=', $._expression)),
        prec.left(2, seq($._expression, '>=', $._expression)),
        prec.left(1, seq($._expression, '=', $._expression)),
        prec.left(1, seq($._expression, '<>', $._expression)),
        prec.left(0, seq($._expression, caseInsensitive('and'), $._expression)),
        prec.left(0, seq($._expression, caseInsensitive('xor'), $._expression)),
        prec.left(0, seq($._expression, caseInsensitive('or'), $._expression)),
      ),

    parameter_assignment: $ =>
      seq(alias($.identifier, $.parameter), ':=', $._expression),

    call_expression: $ =>
      seq(
        field('name', $.identifier),
        '(',
        // Function calls have ordered lists allowing expressions
        commaSep(field('input', choice($.parameter_assignment, $._expression))),
        ')',
        optional(';'),
      ),

    array_access: $ => seq($.identifier, '[', commaSep1($._expression), ']'),

    _member_access: $ =>
      seq(
        $.identifier,
        choice(
          // struct or function_block
          $.struct_access,
          // enum
          $.enum_access,
        ),
      ),

    struct_access: $ => (
      seq(token.immediate('.'), field('member', $.identifier))
    ),

    enum_access: $ => (
      seq(token.immediate('#'), field('member', $.identifier))
    ),

    index_range: $ =>
      seq(
        choice(alias(token(integer), $.integer), $.identifier),
        '..',
        choice(alias(token(integer), $.integer), $.identifier),
      ),

    /* variable */
    var_declaration: $ =>
      seq(
        $.identifier,
        optional($._hw_io),
        ':',
        $._data_type,
        optional(seq(':=', $._expression)),
        ';',
      ),

    _hw_io: $ => seq(caseInsensitive('at'), /%[iIqQ][xXbBwW]/, $._literal),

    /* Data types */
    _data_type: $ => choice($.primitive_type, $.identifier, $.array_type),

    primitive_type: $ =>
      choice(
        caseInsensitive('bool'),
        /U?[SD]?INT/,
        /L?REAL/,
        caseInsensitive('time'),
        caseInsensitive('date'),
        caseInsensitive('time_of_day'),
        caseInsensitive('tod'),
        caseInsensitive('date_and_time'),
        caseInsensitive('dt'),
        /W?STRING/,
        caseInsensitive('byte'),
        /D?WORD/,
      ),

    array_type: $ =>
      seq(
        caseInsensitive('array'),
        '[',
        choice(commaSep1($.index_range), '*'),
        ']',
        caseInsensitive('of'),
        $._data_type,
      ),

    /* Literals */
    _literal: $ =>
      choice(
        $.boolean,
        $.integer,
        $.float,
        $.binary,
        $.octal,
        $.hexidecimal,
        $.time,
        $.date,
        $.time_of_day,
        $.date_and_time,
        $.string,
        $.wstring,
      ),

    boolean: $ =>
      token(choice(caseInsensitive('true'), caseInsensitive('false'))),

    integer: $ => {
      return token(integer);
    },

    float: $ => /([0-9]+([.][0-9]*)?|[.][0-9]+)/,

    binary: $ => token(seq('2#', /_*[0-1]/, repeat(choice('_', /[0-1]/)))),

    octal: $ => token(seq('8#', /_*[0-7]/, repeat(choice('_', /[0-7]/)))),

    hexadecimal: $ =>
      token(seq('16#', /_*[0-9a-fA-F]/, repeat(choice('_', /[0-9a-fA-F]/)))),

    time: $ =>
      token(
        seq(
          caseInsensitive('t'),
          '#',
          optional('-'),
          optional(/\d{1,2}[dD]/),
          optional(/\d{1,3}[hH]/),
          optional(/\d{1,5}[mM]/),
          optional(/\d{1,9}[sS]/),
          optional(/\d{1,9}((ms)|(MS))/),
        ),
      ),

    date: $ =>
      token(
        seq(
          /[dD]/,
          '#',
          /\d(_?\d){3}/, // Year
          /(-\d(_?\d)?){2}/, // Month and day
        ),
      ),

    time_of_day: $ =>
      token(
        seq(
          /[tT][oO][dD]/,
          '#',
          /\d(_?\d)?/,
          ':',
          /\d(_?\d)?/,
          optional(seq(':', /\d(_?\d)?/, optional(seq('.', /\d(_?\d)*/)))),
        ),
      ),

    date_and_time: $ =>
      seq(
        /[dD][tT]/,
        '#',
        /\d(_?\d){3}/, // Year
        /(-\d(_?\d)?){3}/, // Month, day, hour
        /(:\d(_?\d)?){1,2}/, // Minute, second
      ),

    string: $ => token(prec.left(seq("'", /.*/, "'"))),

    wstring: $ => token(prec.left(seq('"', /.*/, '"'))),

    _access_modifier: $ =>
      choice(
        caseInsensitive('protected'),
        caseInsensitive('private'),
        caseInsensitive('public'),
        caseInsensitive('internal'),
      ),

    _retain_modifier: $ =>
      choice(
        caseInsensitive('constant'),
        caseInsensitive('retain'),
        caseInsensitive('non_retain'),
      ),

    identifier: $ => /[a-zA-Z_]\w*/,

    inline_comment: $ => token(seq('//', /.*/)),

    block_comment: $ => token(seq('/*', /[^*]*\*+([^*)][^*]*\*+)*/, '*/')),

    doc_comment: $ => token(seq('///', /.*/)),
  },
});

function commaSep1(rule) {
  return seq(rule, repeat(seq(',', rule)));
}

function commaSep(rule) {
  return optional(commaSep1(rule));
}

// see https://github.com/tree-sitter/tree-sitter/issues/122
function caseInsensitive(keyword, aliasAsWord = true) {
  let result = new RegExp(
    keyword
      .split('')
      .map(letter => `[${letter}${letter.toUpperCase()}]`)
      .join(''),
  );
  if (aliasAsWord) result = alias(result, keyword);
  return result;
}
