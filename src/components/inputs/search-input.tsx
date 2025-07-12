import type { SearchInputProps } from '../models/input';
import './search-input.scss';

function SearchInput(props: SearchInputProps) {
    const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        props.onInputChange(e.target.value);
    };

    const clearInput = () => {
        props.onInputChange('');
    };

    return (
        <div className={`search-container ${props.kind}`}>
            <img src="/icons/search_icon.svg" alt="Search Icon" className={`search-icon ${props.iconSize}`} />

            <input type="text" className="search-input" placeholder={props.placeholder} value={props.value} onChange={onValueChange} />
            {props.value && <img src="icons/close.svg" alt="Close Icon" className="cross-icon {{ iconSize }}" onClick={clearInput} />}
        </div>
    );
}

export default SearchInput;
