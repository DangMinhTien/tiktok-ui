import { useState, forwardRef, useMemo } from 'react'
import classNames from 'classnames/bind'

import image from '../../assets/images'
import styles from './Image.module.scss'

const cx = classNames.bind(styles)
function Image({src, alt, className, ...props}, ref) {
    const [fallback, setFallBack] = useState(null)
    const handleError = () => {
        setFallBack(image.noImage)
    }
    return <img className={cx('wrapper', className)} src={fallback || src} alt={alt} ref={ref} {...props} onError={handleError}/>
}

export default forwardRef(Image);