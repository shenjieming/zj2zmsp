import React from 'react'
import PropTypes from 'prop-types'
import { Card, Avatar, Button } from 'antd'
import classnames from 'classnames'
import { getImgCompress } from '@utils'
import Styles from './UserCard.less'

function UserCard(props) {
  const { item, handleBtnClick } = props

  return (
    <Card className={Styles.card} key={item.userId}>
      <div className={Styles.content}>
        <Avatar
          className={classnames(Styles.avatar, 'lkc-avatar-border')}
          icon="user"
          src={getImgCompress(item.userImageUrl)}
          size="large"
        />
        <div className={classnames('lkc-ptb10', 'lkc-font-large', 'lkc-text-overflow')}>
          {item.userRealName}
        </div>
        <div className="lkc-font-small lkc-text-overflow" title={item.userMobile}>
          联系电话: {item.userMobile}
        </div>
        <div className="lkc-font-small lkc-text-overflow" title={item.deptName}>
          部门: {item.deptName}
        </div>
        <div className={classnames('lkc-ptb10', 'lkc-font-small', 'lkc-text-overflow')}>
          拥有客户数: <span className="lkc-orange">{item.customerQty}</span>
        </div>
        <Button
          type="primary"
          onClick={() => {
            handleBtnClick(item)
          }}
        >
          设置客户权限
        </Button>
      </div>
    </Card>
  )
}

UserCard.propTypes = {
  item: PropTypes.object.isRequired,
  handleBtnClick: PropTypes.func.isRequired,
}

export default UserCard
