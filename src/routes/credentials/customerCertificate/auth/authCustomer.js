import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Transfer, Avatar, Spin, Radio } from 'antd'
import Styles from './authCustomer.less'

const propTypes = {
  data: PropTypes.array.isRequired,
  visible: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  handleCancel: PropTypes.func.isRequired,
  handleTargetKeysChange: PropTypes.func.isRequired,
  targetKeys: PropTypes.array.isRequired,
  handleOk: PropTypes.func.isRequired,
}

const render = item => ({
  label: (
    <span className={Styles.item}>
      <Avatar src={item.imgUrl} icon="user" />
      <span className={Styles.title}>
        <div>{item.title}</div>
        {item.customerQty > 0 && (
          <span className="lkc-text-disable lkc-font-small">(已有{item.customerQty}个业务员)</span>
        )}
      </span>
    </span>
  ),
  value: item.title,
})

function EditModal(props) {
  const dataSource = props.data.map(item => ({
    key: item.orgId,
    title: item.orgName,
    imgUrl: item.orgLogoUrl,
    customerQty: item.customerQty,
  }))

  const transferProps = {
    className: Styles.transfer,
    dataSource,
    showSearch: true,
    render,
    targetKeys: props.targetKeys,
    titles: [
      <span className="lkc-font-large">未选择客户</span>,
      <span className="lkc-font-large">已选择客户</span>,
    ],
    operations: ['移入', '移出'],
    notFoundContent: '',
    listStyle: { width: 290 },
    lazy: { height: 46 },
    searchPlaceholder: '请输入客户名称',
    onChange: props.handleTargetKeysChange,
  }

  const modalProps = {
    title: '授权客户',
    visible: props.visible,
    confirmLoading: props.loading,
    width: 700,
    onCancel: props.handleCancel,
    wrapClassName: 'lkc-modal',
    onOk: props.handleOk,
    maskClosable: false,
  }

  return (
    <Modal {...modalProps}>
      <Spin spinning={props.loading}>
        <div className={Styles.wrap}>
          <Transfer {...transferProps} />
        </div>
      </Spin>
    </Modal>
  )
}

EditModal.propTypes = propTypes

export default EditModal
