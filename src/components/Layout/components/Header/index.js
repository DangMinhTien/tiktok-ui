import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless'
import 'tippy.js/dist/tippy.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faSpinner, faMagnifyingGlass, faSign, faRightToBracket } from '@fortawesome/free-solid-svg-icons';

import styles from './Header.module.scss'
import images from '../../../../assets/images/index'
import { Wrapper as PopperWrapper} from '../../../Popper/index'
import AccountItem from '../../../AccountItem';
import Button from '../../../Button';

const cx = classNames.bind(styles)
function Header() {
    const [searchResult, setSearchReult] = useState([])
    useEffect(() => {
        setTimeout(() => {
            // setSearchReult(["Khánh huyền", "DiNo", "IVelvet"])
        }, 1000)
    }, [])
    return ( 
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('logo')}>
                    <img src={images.logo} alt='Logo Tiktok'/>
                </div>
                <Tippy 
                    visible={searchResult.length > 0}
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
                >
                    <div className={cx('search')}>
                        <input placeholder='Search account and video' spellCheck={false}/>
                        <button className={cx('clear')}>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                        <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />
                        <button className={cx('search-btn')}>
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </button>
                    </div>
                </Tippy>
                <div className={cx('actions')}>
                    <Button text>Upload</Button>
                    <Button primary>Log in</Button>
                </div>
            </div>
        </header>
    );
}

export default Header;