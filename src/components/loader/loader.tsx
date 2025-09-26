
import { classNames } from '../models/classNames';
import type { LoaderProps } from '../models/loader';
import './loader.scss';
export default function Loader(props: LoaderProps) {
    return (
        <div className="loader-container">
            <div className={classNames('loader', { 'small-width-loader': !!props.smallWidthLoader })}></div>
        </div>
    );
}
