import { useEffect } from 'react';
import Input from './input';
import type { EmailInputProps, InputState } from '../models/input';
import { Errors } from '../constants/errors';
import GlobalConstants from '../constants/constants';


function EmailInput({ customLabel, disabled, parentState, initialFocus, inputKeyUp, parentStateChanger }: EmailInputProps) {
    useEffect(() => {
        validateEmail();
    }, [parentState.value, parentState.touched]);

    const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        parentStateChanger((prevState: InputState) => {
            return {
                ...prevState,
                value: e.target.value,
            };
        });
    };

    const onEmailBlur = () => {
        parentStateChanger((prevState: InputState) => {
            return {
                ...prevState,
                touched: true,
            };
        });
    };

    const validateEmail = () => {
        if (parentState.touched) {
            if (!parentState.value) {
                parentStateChanger((prevState) => {
                    return {
                        ...prevState,
                        ...{
                            error: Errors.email.required,
                            isValid: false,
                        },
                    };
                });
                return;
            } else if (!GlobalConstants.EMAIL_REGEX.test(parentState.value)) {
                parentStateChanger((prevState) => {
                    return {
                        ...prevState,
                        ...{ error: Errors.email.pattern, isValid: false },
                    };
                });
                return;
            }
        }

        const isValid = GlobalConstants.EMAIL_REGEX.test(parentState.value);
        parentStateChanger((prevState) => {
            return {
                ...prevState,
                ...{ error: '', isValid: isValid },
            };
        });
    };

    const onEmailKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
        inputKeyUp && inputKeyUp(e);
    };

    return (
        <>
            <Input
                label={customLabel ? customLabel : 'Email ID'}
                placeholder="Enter Your Email ID"
                value={parentState.value}
                onChange={onEmailChange}
                onBlur={onEmailBlur}
                errortext={parentState.error}
                autoFocus={initialFocus}
                onKeyUp={onEmailKeyUp}
                disabled={disabled}
            ></Input>
        </>
    );
}

export default EmailInput;
