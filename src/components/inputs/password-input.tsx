import { forwardRef, useState } from 'react';
import Input from './input';
import './password-input.scss';
import type { PasswordInputProps } from '../models/input';
// import visibleIcon from '../../icons/ic_visible.svg';
// import invisibleIcon from '../../icons/ic_invisible.svg';

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>((props, ref) => {
    const { value, errortext, successtext, ...rest } = props;
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const onPasswordIconClick = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    return (
        <>
            <div className="password-input-container">
                <Input
                    ref={ref}
                    label={props.label || 'Password'}
                    placeholder="Enter Your Password"
                    type={!isPasswordVisible ? 'password' : 'text'}
                    value={value}
                    errortext={errortext}
                    successtext={successtext}
                    {...rest}
                ></Input>
                <div className="visible-icon-container">
                    <img src={isPasswordVisible ? '/icons/ic_visible.svg' : '/icons/ic_invisible.svg'} onClick={onPasswordIconClick} />
                </div>
            </div>
        </>
    );
});

export default PasswordInput;
