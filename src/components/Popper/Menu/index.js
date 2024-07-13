import Tippy from '@tippyjs/react/headless'
import 'tippy.js/dist/tippy.css'
import classNames from 'classnames/bind';

import styles from './Menu.module.scss'
import { Wrapper as PopperWrapper} from '../index'
import MenuItem from './MenuItem';
import Header from './Header';
import { useState } from 'react';

const cx = classNames.bind(styles)
const defaultFn = ()=>{}
function Menu({children, items = [], onChange = defaultFn}) {
    const [history, setHistory] = useState([{ data: items}])
    const current = history[history.length - 1]
    const renderItems = () => {
        return current.data.map((item, index) => {
            const isParent = !!item.children
            return (
                <MenuItem 
                    key={index} 
                    data={item} 
                    onClick={() => {
                        if(isParent){
                            setHistory(prev => [...prev, item.children])
                        }else{
                            onChange(item)
                        }
                    }}
                />
            )
        })
    }
    return (  
        <Tippy
            delay={[0, 500]}                    
            interactive
            placement='bottom-end'
            offset={[12, 8]}
            onHide={() => {
                setHistory(prev => prev.slice(0, 1))
            }}
            render={attrs => (
                <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
                    <PopperWrapper className={cx('menu-popper')}>
                        {
                            (history.length > 1 && current.title) && 
                            <Header 
                                title={current.title} 
                                onBack={() => {
                                    setHistory(prev => prev.slice(0, prev.length - 1))
                                }}
                            />
                        }
                        {renderItems()}
                    </PopperWrapper>
                </div>
            )}    
        >
            {children}
        </Tippy>
    );
}

export default Menu;