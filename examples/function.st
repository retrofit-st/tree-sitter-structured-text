FUNCTION TestFunction : BOOL
    VAR_INPUT
        test_input : BOOL;
    END_VAR

    VAR_IN_OUT
        test_in_out : BOOL;
    END_VAR

    IF test_input THEN
        TestFunction := TRUE;
    ELSE
        TestFunction := FALSE;
    END_IF;

    TestFunction := test_in_out;

END_FUNCTION
