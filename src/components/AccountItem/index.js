import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

import classNames from "classnames/bind";
import styles from './AccountItem.module.scss'
import Image from '../Image'

const cx = classNames.bind(styles)
function AccountItem() {
    return ( 
        <div className={cx("wrapper")}>
            <Image 
                className={cx('avatar')} 
                src="https://p16-sign-useast2a.tiktokcdn.com/tos-useast2a-avt-0068-aiso/7117be442230cb11fba74783558c8fcb~c5_100x100.jpeg?lk3s=a5d48078&nonce=17215&refresh_token=068fff28ff1bf615ec127ea6fe5a07f1&x-expires=1720864800&x-signature=kFQ76jrWZ3d45%2BIgub44ws9tXA8%3D&shp=a5d48078&shcp=b59d6b55" 
                alt=""
            />
            <div className={cx('info')}>
                <h4 className={cx('name')}>
                    <span>Nguyễn Văn A</span>
                    <FontAwesomeIcon className={cx('check')} icon={faCheckCircle}/>
                </h4>
                <span className={cx('username')}>nguyenvana</span>
            </div>
        </div>
    );
}

export default AccountItem;