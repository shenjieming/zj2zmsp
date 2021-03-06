import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Button, Table, Badge, Spin } from 'antd'
import PhotoWall from '../../../../components/PhotoWall'
import { genList } from './data'

const CompareModal = ({ versionDoubleList, compareModalVisible, dispatchAction, getLoading, registTypeList }) => {
  const shutDownModal = () => {
    dispatchAction({
      payload: {
        compareModalVisible: false,
      },
    })
  }
  const modalOpts = {
    title: '版本对比',
    visible: compareModalVisible,
    onCancel() {
      dispatchAction({
        payload: {
          compareModalVisible: false,
        },
      })
    },
    // onOk: handleOk,
    width: 1050,
    maskClosable: false,
    wrapClassName: 'lkc-modal',
    footer: <Button onClick={shutDownModal}>关闭</Button>,
  }
  const [
    { certificateVersionCode, lastEditName, lastEditTime },
    {
      certificateVersionCode: certificateVersionCode2,
      lastEditName: lastEditName2,
      lastEditTime: lastEditTime2,
    },
  ] = versionDoubleList
  const tableParam = {
    columns: [
      {
        title: '字段',
        dataIndex: 'title',
        key: 'title',
        className: 'lkc-bg-columns',
        render: (text, { editNo, editNo2 }) => {
          if (editNo === editNo2 || !!editNo + !!editNo2 === 0) {
            return <Badge status="1" text={text} />
          }
          return <Badge status="error" text={text} />
        },
      },
      {
        title: (
          <div>
            <p>版本号：{certificateVersionCode}</p>
            <p>修改人：{lastEditName}</p>
            <p>最后修改时间：{lastEditTime}</p>
          </div>
        ),
        dataIndex: 'editNo',
        key: 'editNo',
        className: 'lkc-text-center',
        width: 400,
        render: (text, { imgUrlsFlag }) => {
          if (imgUrlsFlag) {
            return <PhotoWall urls={text} />
          }
          return text
        },
      },
      {
        title: (
          <div>
            <p>版本号：{certificateVersionCode2}</p>
            <p>修改人：{lastEditName2}</p>
            <p>最后修改时间：{lastEditTime2}</p>
          </div>
        ),
        dataIndex: 'editNo2',
        key: 'editNo2',
        className: 'lkc-text-center',
        width: 400,
        render: (text, { imgUrlsFlag }) => {
          if (imgUrlsFlag) {
            return <PhotoWall urls={text} />
          }
          return text
        },
      },
    ],
    dataSource: genList(versionDoubleList, registTypeList).filter(({ exclude }) => Number(exclude) === 1),
    pagination: false,
    rowClassName: ({ editNo, editNo2 }) =>
      (editNo === editNo2 || !!editNo + !!editNo2 === 0 ? '' : 'lkc-bg-difference'),
    rowKey: (record, idx) => idx,
  }
  return (
    <Modal {...modalOpts}>
      <Spin spinning={getLoading('viewCertNoCompareList')}>
        <Table bordered {...tableParam} size="small" />
      </Spin>
    </Modal>
  )
}
CompareModal.propTypes = {
  versionDoubleList: PropTypes.array,
  getLoading: PropTypes.func,
  dispatchAction: PropTypes.func,
  onCancel: PropTypes.func,
  compareModalVisible: PropTypes.bool,
  registTypeList: PropTypes.array,
}
export default CompareModal
