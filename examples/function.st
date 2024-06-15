FUNCTION TestFunction : INT
    VAR_INPUT
        test_input : BOOL;
    END_VAR

    IF test_input THEN
        TestFunction := TRUE;
    ELSE
        TestFunction := FALSE;
    END_IF;

END_FUNCTION
