export interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
    classes: string;
    label: string;
    kind?: string;
    labelClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export const __dummyRadio = {};
