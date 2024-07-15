import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faEarthAsia, faCircleQuestion, faKeyboard, faCloudUpload, faUser, faCoins, faGear, faSignOut } from '@fortawesome/free-solid-svg-icons';
import 'tippy.js/dist/tippy.css'

import styles from './Header.module.scss'
import images from '../../../../assets/images/index'
import Button from '../../../Button';
import Menu from '../../../Popper/Menu'
import Image from '../../../Image';
import Search from '../Search'
import { Link } from 'react-router-dom';
import routesConfig from '../../../../config/routes'

const cx = classNames.bind(styles)
const MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faEarthAsia}/>,
        title: 'English',
        children: {
            title: 'Language',
            data: [
                {
                    code: 'en',
                    title: 'English'
                },
                {
                    code: 'vi',
                    title: 'Tiếng Việt',
                },
                {
                    code: 'Arap',
                    title: 'Ả rập'
                },
                {
                    code: 'fra',
                    title: 'France'
                },
                {
                    code: 'spa',
                    title: 'Spain'
                }
            ]
        }
    },
    {
        icon: <FontAwesomeIcon icon={faCircleQuestion}/>,
        title: 'Feedback and help',
        to: '/feedback'
    },
    {
        icon: <FontAwesomeIcon icon={faKeyboard}/>,
        title: 'Keyboard shortcuts'
    }
]
function Header() {

    const currentUser = true
    
    const userMenu = [
        {
            icon: <FontAwesomeIcon icon={faUser}/>,
            title: 'View Profile',
            to: '/@hoaa'
        },
        {
            icon: <FontAwesomeIcon icon={faCoins}/>,
            title: 'Get coin',
            to: '/coin'
        },
        {
            icon: <FontAwesomeIcon icon={faGear}/>,
            title: 'Settings',
            to: '/settings'
        },
        ...MENU_ITEMS,
        {
            icon: <FontAwesomeIcon icon={faSignOut}/>,
            title: 'Logout',
            to: '/logout',
            separate: true
        }        
    ]
    const handleMenuChange = (menuItem) => {
        console.log(menuItem)
    }

    
    return ( 
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Link className={cx('logo-link')} to={routesConfig.home}>
                    <img src={images.logo} alt='Logo Tiktok'/>
                </Link>
                <Search />
                <div className={cx('actions')}>
                    {
                        currentUser ? 
                        (
                            <>
                                <div className={cx('current-user')}>
                                    <Tippy delay={[0, 200]} content="Upload video" placement='bottom'>
                                        <button className={cx('action-btn')}>
                                            <FontAwesomeIcon icon={faCloudUpload} />
                                        </button>
                                    </Tippy>
                                </div>
                            </>
                        ) :
                        (
                            <>
                                <Button text>Upload</Button>
                                <Button primary>Log in</Button>
                            </>
                        )
                    }
                    <Menu items={currentUser ? userMenu : MENU_ITEMS} onChange={handleMenuChange}>
                        {
                            currentUser ? 
                            (
                                <Image className={cx('user-avatar')} 
                                    src='https://p16-sign-useast2a.tiktokcdn.com/tos-useast2a-avt-0068-aiso/7117be442230cb11fba74783558c8fcb~c5_100x100.jpeg?lk3s=a5d48078&nonce=17215&refresh_token=068fff28ff1bf615ec127ea6fe5a07f1&x-expires=1720864800&x-signature=kFQ76jrWZ3d45%2BIgub44ws9tXA8%3D&shp=a5d48078&shcp=b59d6b55' 
                                    alt="Nguyễn Văn A"
                                />
                            )
                            :
                            (
                                <button className={cx('more-btn')}>
                                    <FontAwesomeIcon icon={faEllipsisVertical} />
                                </button>
                            )
                        }        
                    </Menu>
                </div>
            </div>
        </header>
    );
}

export default Header;