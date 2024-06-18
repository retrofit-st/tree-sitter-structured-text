NAMESPACE TestNamespaceAndClass
    TYPE 
        ColorWithValues : (
            RED := 1,
            GREEN := 2,
            BLUE := 3,
            YELLOW := 4) := RED;

        Color : (
            RED,
            GREEN,
            BLUE,
            YELLOW
        );
    END_TYPE
    
    CLASS TestClass
        VAR
            staticVar : BOOL;
        END_VAR

        METHOD PUBLIC TestMethod : INT
            // Input variables of method
            VAR_INPUT
                testInput : REAL;
            END_VAR

            TestMethod := testInput * 2;
        END_METHOD

        METHOD TestCase : INT
            VAR_INPUT
                state : INT;
            END_VAR
            VAR_TEMP
                stateCase : ColorWithValues;
            END_VAR

            CASE state OF
                Color#RED:
                    stateCase := state;
                Color#GREEN:
                    stateCase := state;
                3:
                    stateCase := state;
                Color#YELLOW:
                    stateCase := state;
                ELSE 
                    stateCase := 1;
            END_CASE

            TestCase := stateCase;
        END_METHOD
    END_CLASS
END_NAMESPACE
