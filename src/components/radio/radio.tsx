
import type { RadioProps } from '../models/radio';
import './radio.scss';

function Radio(props: RadioProps) {
    const { classes, label, kind, labelClick, ...rest } = props;
    return (
        <div className={`radio-input-container ${kind ? kind : ''}`}>
            <div className={`custom-radio ${classes}`} {...rest}></div>
            {props.label ? (
                <div
                    className="radio-label"
                    onClick={(e) => {
                        if (labelClick) {
                            labelClick(e);
                        }
                    }}
                >
                    {label}
                </div>
            ) : null}
        </div>
    );
}

export default Radio;
