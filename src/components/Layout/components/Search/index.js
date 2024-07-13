import { useEffect, useRef, useState } from 'react';
import HeadlessTippy from '@tippyjs/react/headless'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';

import { Wrapper as PopperWrapper} from '../../../Popper'
import AccountItem from '../../../AccountItem';
import { faCircleXmark, faMagnifyingGlass, faSpinner } from '@fortawesome/free-solid-svg-icons';
import styles from './Search.module.scss'

const cx = classNames.bind(styles)

function Search() {
    const [searchValue, setSearchValue] = useState('')
    const [searchResult, setSearchReult] = useState([])
    const [showResult, setShowResult] = useState(true)
    
    const inputRef = useRef()

    const handleClear = () => {
        setSearchValue('')
        setSearchReult([])
        inputRef.current.focus()
    }
    const handleHideResult = () => {
        setShowResult(false)
    }
    // useEffect(() => {
    //     setTimeout(() => {
    //         setSearchReult(["Khánh huyền", "DiNo", "IVelvet"])
    //     }, 1000)
    // }, [])
    return (
        <HeadlessTippy
                    visible={searchResult.length > 0 && showResult}
                    interactive
                    render={attrs => (
                        <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                            <PopperWrapper>
                                <h4 className={cx('search-title')}>
                                    Accounts
                                </h4>
                                <AccountItem />
                                <AccountItem />
                                <AccountItem />
                                <AccountItem />
                            </PopperWrapper>
                        </div>
                    )}
                    onClickOutside={handleHideResult}
                >
                    <div className={cx('search')}>
                        <input                
                            value={searchValue}
                            ref={inputRef}
                            placeholder='Search account and video' 
                            spellCheck={false} 
                            onChange={(e) => {
                                setSearchValue(e.target.value)
                                setSearchReult([1])
                            }}
                            onFocus={() => setShowResult(true)}
                        />
                        {!!searchValue && (
                            <button 
                                className={cx('clear')} 
                                onClick={handleClear}
                            >
                                <FontAwesomeIcon icon={faCircleXmark} />
                            </button>
                        )}
                        {/* <FontAwesomeIcon className={cx('loading')} icon={faSpinner} /> */}
                        <button className={cx('search-btn')}>
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </button>
                    </div>
                </HeadlessTippy>
    );
}

export default Search;