
import './input.scss';
import type { InputProps } from '../models/input';
import { classNames } from '../models/classNames';
import { forwardRef, type Ref } from 'react';

const Input = forwardRef<
    HTMLInputElement | HTMLTextAreaElement,
    InputProps & (React.InputHTMLAttributes<HTMLInputElement> | React.TextareaHTMLAttributes<HTMLTextAreaElement>)
>((props, ref) => {
    const { label, errortext, successtext, warningText, textCount, textCountLimit, component = 'Input', ...rest } = props;

    return (
        <div className="input-container">
            {label && <label className="input-label">{label}</label>}
            {component === 'Input' && (
                <input
                    className={classNames('input-comp', { invalid: !!errortext, warning: !!warningText })}
                    ref={ref as Ref<HTMLInputElement>}
                    {...rest}
                />
            )}

            {component === 'Textarea' && (
                <textarea
                    className={classNames('input-comp', 'textarea-comp', { invalid: !!errortext, warning: !!warningText })}
                    ref={ref as Ref<HTMLTextAreaElement>}
                    {...rest}
                />
            )}

            {(warningText || errortext || (textCount && textCount > -1) || successtext) && (
                <div
                    className={classNames('input-warning-container', { 'justify-between': !!warningText || !!errortext || !!successtext })}
                >
                    {errortext && (
                        <div className="input-error">
                            <img src={'/assets/icons/ic_error_colored.svg'} />
                            {errortext}
                        </div>
                    )}
                    {successtext && (
                        <div className="input-success">
                            <img src={'/icons/ic_input_success.svg'} />
                            {successtext}
                        </div>
                    )}

                    {warningText && (
                        <div className="input-warning">
                            <img src={'/icons/ic_warning_colored.svg'} />
                            {warningText}
                        </div>
                    )}

                    {textCount && textCount > -1 && (
                        <div className="input-count-text">
                            {textCount}/{textCountLimit}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
});

export default Input;
