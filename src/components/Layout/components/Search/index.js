import { useEffect, useRef, useState } from 'react';
import HeadlessTippy from '@tippyjs/react/headless'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';

import { Wrapper as PopperWrapper} from '../../../Popper'
import AccountItem from '../../../AccountItem';
import { faCircleXmark, faMagnifyingGlass, faSpinner } from '@fortawesome/free-solid-svg-icons';
import styles from './Search.module.scss'
import { useDebounce } from '../../../../hooks';
import * as searchServices from '../../../../apiServices/searchService'

const cx = classNames.bind(styles)

function Search() {
    const [searchValue, setSearchValue] = useState('')
    const [searchResult, setSearchReult] = useState([])
    const [showResult, setShowResult] = useState(true)
    const [loading, setLoading] = useState(false)
    
    const inputRef = useRef()

    const debounces = useDebounce(searchValue, 500)

    const handleClear = () => {
        setSearchValue('')
        setSearchReult([])
        inputRef.current.focus()
    }
    const handleHideResult = () => {
        setShowResult(false)
    }
    const handleChange = (e) => {
        const searchValue = e.target.value
        if(searchValue.startsWith(' ') || !searchValue.trim()){
            setSearchValue('')
            return
        }
        setSearchValue(searchValue)
    }
    useEffect(() => {
        if(debounces.trim() === '' || !debounces){
            if(searchResult.length > 1)
                setSearchReult([])
            return
        }
        setLoading(true)
        
        const fetchApi = async () => {
            try{
                setLoading(true)
                const result = await searchServices.search(debounces, 'less')
                setSearchReult(result)
                setLoading(false)
            }catch(error){
                console.log(error)
                setLoading(false)
            }        
        }
        fetchApi()

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debounces])
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
                                {searchResult.map((result, index) => {
                                    return (
                                        <AccountItem 
                                            key={result.id} 
                                            data={result}
                                        />
                                    )
                                })}
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
                            onChange={handleChange}
                            onFocus={() => setShowResult(true)}
                        />
                        {(!!searchValue && !loading) && (
                            <button
                                className={cx('clear')} 
                                onClick={handleClear}
                            >
                                <FontAwesomeIcon icon={faCircleXmark} />
                            </button>
                        )}
                        {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}
                        <button className={cx('search-btn')}>
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </button>
                    </div>
                </HeadlessTippy>
    );
}

export default Search;