import React from 'react'
import PropTypes from 'prop-types'
import { Avatar, Popover, Row, Col } from 'antd'
import QQ from '../../assets/QQ.svg'
import telePhone from '../../assets/telephone.svg'
import wechat from '../../assets/weChat.svg'
import wechatQR from '../../assets/wechat-qrcode.png'
import { CONSUMER_HOTLINE, CONSUMER_QQ } from '../../utils/config'
import styles from './Contact.less'

function Contact({ className }) {
  return (
    <div className={className}>
    </div>
  )
}

Contact.propTypes = {
  className: PropTypes.string,
}

export default Contact
