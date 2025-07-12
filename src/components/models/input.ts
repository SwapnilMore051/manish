export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
    label?: string;
    errortext?: string;
    successtext?: string;
    warningText?: string;
    textCount?: number;
    textCountLimit?: number;
    component?: 'Input' | 'Textarea';
}

export interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    value?: string;
    errortext?: string;
    successtext?: string;
}

export type InputState = {
    value: string;
    touched: boolean;
    error: string;
    isValid: boolean;
    dirty?: boolean;
};
export type EmailInputProps = {
    customLabel?: string;
    disabled?: boolean;
    parentState: InputState;
    initialFocus: boolean;
    inputKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    parentStateChanger: React.Dispatch<React.SetStateAction<InputState>>;
};

export type SearchInputProps = {
    value?: string;
    onInputChange: (value: string) => void;
    placeholder?: string;
    kind?: 'common' | 'header';
    iconSize?: 'small';
};

export const __dummyInput = {};
