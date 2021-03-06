import React from 'react'
import PropTypes from 'prop-types'
import { Table, Select, Input, Menu, Dropdown, Icon } from 'antd'
import SearchForm from '../../../../components/SearchFormFilter'
import { getOption } from '../../../../utils'

const noLabelLayout = {
  wrapperCol: { span: 22 },
}
function ProdFactory({
  effects,
  dispatch,
  factoryDataSource,
  pagination,
  searchData,
  tabIndex,
  showConfirm,
}) {
  const searchProps = {
    formData: [
      {
        layout: noLabelLayout,
        field: 'certificateStatus',
        width: 220,
        options: {
          initialValue: null,
        },
        component: {
          name: 'Select',
          props: {
            optionLabelProp: 'title',
            children: getOption([{
              id: null,
              name: '全部',
            }, {
              id: '0',
              name: '启用',
            }, {
              id: '1',
              name: '停用',
            }], { prefix: '状态' }),
          },
        },
      },
      {
        layout: noLabelLayout,
        field: 'importedFlag',
        width: 220,
        options: {
          initialValue: null,
        },
        component: {
          name: 'Select',
          props: {
            optionLabelProp: 'title',
            children: getOption([{
              id: null,
              name: '全部',
            }, {
              id: '0',
              name: '国内',
            }, {
              id: '1',
              name: '进口',
            }], { prefix: '厂家类型' }),
          },
        },
      },
      {
        width: 220,
        layout: noLabelLayout,
        field: 'keywords',
        component: (
          <Input placeholder="生产厂家/总经销商" />
        ),
        options: {
          initialValue: null,
        },
      },
    ],
    onSearch: (value) => {
      dispatch({
        type: 'newMyCertificate/prodFactoryList',
        payload: {
          ...value,
          current: 1,
          pageSize: 10,
        },
      })
    },
  }
  // 表格
  const columns = [
    {
      key: 'produceFactoryName',
      dataIndex: 'produceFactoryName',
      title: '生产厂家/总经销商',
      render: (value, record) => (<span>
        <p>{value}</p>
        {record.importedFlag ? `总代：${record.agentSupplierName}` : ''}
      </span>),
    },
    {
      key: 'importedFlag',
      dataIndex: 'importedFlag',
      title: '厂家类型',
      className: 'lkc-text-center',
      render: (value) => {
        if (value) {
          return '进口'
        }
        return '国内'
      },
    },
    {
      key: 'maintainStatus',
      dataIndex: 'maintainStatus',
      title: '维护状态',
      className: 'lkc-text-center',
      render: (value) => {
        if (value === 1) {
          return '已维护'
        }
        return <span className="lkc-red">未维护</span>
      },
    },
    {
      key: 'certificateStatus',
      dataIndex: 'certificateStatus',
      title: '状态',
      className: 'lkc-text-center',
      render: (value) => {
        let str = ''
        if (value) {
          str = '停用'
        } else {
          str = '启用'
        }
        return str
      },
    },
    {
      key: 'operation',
      dataIndex: 'operation',
      title: '操作',
      width: 150,
      className: 'lkc-text-center',
      render: (value, record) => {
        // 下拉按钮点击事件 TODO
        const handleMenuClick = (val) => {
          const key = val.key
          dispatch({
            type: 'newMyCertificate/updateState',
            payload: {
              modalTitle: '换证',
              rowSelectData: record,
            },
          })
          switch (key) {
            case '1':
              dispatch({
                type: 'newMyCertificate/getprodFactoryDetai',
                payload: {
                  factoryAgentCertificateId: record.factoryAgentCertificateId,
                  replacedFlag: true,
                },
              })
              break
            default:
              showConfirm({
                content: record.certificateStatus ? '确定要启用该证件吗？' : '确定要停用该证件吗？',
                handleOk() {
                  dispatch({
                    type: 'newMyCertificate/setProdFactoryStatus',
                    payload: {
                      factoryAgentCertificateId: record.factoryAgentCertificateId,
                      certificateStatus: !record.certificateStatus,
                    },
                  })
                },
              })
              break
          }
          dispatch({
            type: 'newMyCertificate/updateState',
            payload: {
              rowSelectData: record,
            },
          })
        }
        // 下拉按钮
        const menu = (
          <Menu onClick={handleMenuClick}>
            {record.replacedFlag ? '' : <Menu.Item key="1">换证</Menu.Item>}
            <Menu.Item key="2">{record.certificateStatus ? '启用' : '停用'}</Menu.Item>
          </Menu>
        )
        return (
          <span>
            <a
              onClick={() => {
                dispatch({
                  type: 'newMyCertificate/updateState',
                  payload: {
                    modalTitle: '编辑厂家/总代证件',
                    rowSelectData: record,
                  },
                })
                dispatch({
                  type: 'newMyCertificate/getprodFactoryDetai',
                  payload: {
                    factoryAgentCertificateId: record.factoryAgentCertificateId,
                  },
                })
              }}
            >编辑</a>
            <span className="ant-divider" />
            <Dropdown overlay={menu} trigger={['click']}>
              <a>
                更多<Icon type="down" />
              </a>
            </Dropdown>
          </span>
        )
      },
    },
  ]
  // 翻页
  const handleChange = (value) => {
    dispatch({
      type: 'newMyCertificate/prodFactoryList',
      payload: {
        ...searchData,
        ...value,
      },
    })
  }
  return (
    <div key={tabIndex}>
      <SearchForm {...searchProps} />
      <Table
        columns={columns}
        dataSource={factoryDataSource}
        pagination={pagination}
        bordered
        onChange={handleChange}
        loading={!!effects['newMyCertificate/prodFactoryList']}
        rowKey="factoryAgentCertificateId"
      />
    </div>
  )
}

ProdFactory.propTypes = {
  effects: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  factoryDataSource: PropTypes.array.isRequired,
  pagination: PropTypes.object.isRequired,
  searchData: PropTypes.object.isRequired,
  tabIndex: PropTypes.string.isRequired,
  showConfirm: PropTypes.func.isRequired,
}

export default ProdFactory
