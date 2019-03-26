import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Row, Col, Form, Spin } from 'antd'
import moment from 'moment'

import { FORM_ITEM_LAYOUT } from '../../../utils/constant'
import GetFormItem from '../../../components/GetFormItem'

import { getApproveData } from './approveForm'
import styles from './index.less'

const EntrustApprove = ({
  detailData,
  visible,
  certificateId,
  hideHandler,
  okHandler,
  loading,
  toAction,
  refuseTypeArr,
  oprateType,
  reviewAgain,
  form: { validateFields, resetFields },
}) => {
  const formData = (data, type, isOlder) => {
    const isView = type === 'view'
    return [
      detailData.oldFlag && <div>{isOlder ? '原证信息' : '新证信息'}</div>,
      {
        label: '业务员信息',
        layout: FORM_ITEM_LAYOUT,
        exclude: false,
        view: true,
        options: {
          initialValue: `${data.customerContactName || ''} - ${data.customerContactPhone || ''}`,
        },
        component: {
          name: 'Input',
          props: {
            placeholder: '请输入产品名称',
          },
        },
      },
      {
        label: '有效期',
        layout: isView
          ? FORM_ITEM_LAYOUT
          : {
            labelCol: {
              span: 12,
            },
            wrapperCol: {
              span: 12,
            },
          },
        field: `validDateStart${isOlder ? '_older' : ''}`,
        view: isView,
        viewRender() {
          if (data.validDateLongFlag) {
            return `${data.validDateStart} 至 长期有效`
          }
          return `${data.validDateStart || ''} 至 ${data.validDateEnd || ''}`
        },
        col: isView ? 24 : 12,
        options: {
          initialValue: data.validDateStart && moment(data.validDateStart, 'YYYY-MM-DD'),
          rules: [{ required: true, message: '必填项不能为空' }],
        },
        component: {
          name: 'DatePicker',
          props: {
            style: { width: '100%' },
          },
        },
      },
      {
        col: 1,
        view: true,
        exclude: isView,
        options: {
          initialValue: (
            <span
              style={{
                lineHeight: '30px',
                width: '100%',
                display: 'inline-block',
                textAlign: 'center',
              }}
            >
              至
            </span>
          ),
        },
      },
      {
        layout: {
          wrapperCol: { span: 24 },
        },
        field: `validDateEnd${isOlder ? '_older' : ''}`,
        col: 6,
        view: false,
        exclude: isView || data.validDateLongFlag,
        options: {
          initialValue: data.validDateEnd && moment(data.validDateEnd, 'YYYY-MM-DD'),
          rules: [{ required: !data.validDateLongFlag, message: '必填项不能为空' }],
        },
        component: {
          name: 'DatePicker',
          props: {},
        },
      },
      {
        field: `validDateLongFlag${isOlder ? '_older' : ''}`,
        col: 5,
        exclude: isView,
        layout: {
          wrapperCol: {
            span: 20,
            offset: 4,
          },
        },
        options: {
          valuePropName: 'checked',
          initialValue: data.validDateLongFlag,
        },
        component: {
          name: 'Checkbox',
          props: {
            children: '长期有效',
            onChange: (event) => {
              data.validDateLongFlag = event.target.checked
              toAction({})
            },
          },
        },
      },
      {
        label: '委托书',
        layout: FORM_ITEM_LAYOUT,
        view: true,
        options: {
          imgSrc: data.certificateImageUrls,
        },
      },
      {
        label: '业务员身份证',
        layout: FORM_ITEM_LAYOUT,
        view: true,
        options: {
          imgSrc: data.businessImageUrls,
        },
      },
    ]
  }
  const isView = oprateType === 'view'
  const submitHandler = () => {
    validateFields((errors, values) => {
      if (errors) {
        return
      }
      if (!isView) {
        const param = values
        param.refuseType = values.refuseType && values.refuseType.toString()
        param.validDateStart = values.validDateStart && values.validDateStart.format('YYYY-MM-DD')
        param.validDateEnd = values.validDateEnd && values.validDateEnd.format('YYYY-MM-DD')
        param.certificateId = certificateId
        param.oldCertificate = detailData.oldFlag
        okHandler(param)
      } else {
        reviewAgain()
      }
    })
  }
  const modalOpts = {
    title: isView ? '查看审核情况' : '审核委托书',
    visible,
    okText: isView ? '再次审核' : '确定',
    afterClose: resetFields,
    onCancel: hideHandler,
    onOk: submitHandler,
    maskClosable: false,
    width: 1100,
    wrapClassName: 'lkc-modal',
  }
  const getFormData = () => {
    if (!detailData.oldFlag) {
      return formData(detailData.certificate || {}, oprateType)
    }
    return formData(detailData.oldCertificate, 'view', true).concat(
      formData(detailData.certificate, oprateType),
    )
  }
  return (
    <Modal {...modalOpts}>
      <Spin spinning={loading}>
        <Row className={styles.horizon}>
          <Col span="12" className={styles.left}>
            <div style={{ fontWeight: 'bold', marginBottom: '20px' }}>
              用户维护信息
            </div>
            <Form style={{ position: 'relative', overflow: 'hidden' }}>
              <GetFormItem
                style={{
                  position: 'relative',
                  maxHeight: '600px',
                  left: '8px',
                  overflowX: 'hidden',
                  overflowY: 'scroll',
                }}
                formData={getFormData()}
              />
            </Form>
          </Col>
          <Col span="12" className={styles.right}>
            <Form>
              <GetFormItem
                formData={getApproveData(
                  detailData.certificate || {},
                  oprateType === 'view',
                  toAction,
                  refuseTypeArr,
                )}
              />
            </Form>
          </Col>
        </Row>
      </Spin>
    </Modal>
  )
}

EntrustApprove.propTypes = {
  certificateId: PropTypes.string,
  detailData: PropTypes.object,
  refuseTypeArr: PropTypes.array,
  okHandler: PropTypes.func,
  reviewAgain: PropTypes.func,
  hideHandler: PropTypes.func,
  form: PropTypes.object,
  loading: PropTypes.bool,
  oprateType: PropTypes.string,
  visible: PropTypes.bool,
  toAction: PropTypes.func,
}

export default Form.create()(EntrustApprove)
