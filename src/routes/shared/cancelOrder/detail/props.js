import React from 'react'

const operationItemColumns = [
  {
    title: '企业名称',
    dataIndex: 'customerOrgName',
    width: 300,
    className: 'lkc-text-center',
  },
  {
    title: '人员',
    dataIndex: 'submitName',
    className: 'lkc-text-center',
  },
  {
    title: '操作时间',
    dataIndex: 'submitTime',
    className: 'lkc-text-center',
  },
  {
    title: '操作',
    dataIndex: 'operation',
    className: 'lkc-text-center',
  },
  {
    title: '备注',
    dataIndex: 'remark',
    className: 'lkc-text-center',
  },
]
const returnItemColumns = [
  {
    title: '序号',
    key: 'index',
    width: 50,
    className: 'lkc-text-center',
    render: (value, row, index) => <div>{index + 1}</div>,
  },
  {
    title: '物资名称',
    dataIndex: 'materialsName',
  },
  {
    title: '规格',
    dataIndex: 'materialsSku',
    className: 'lkc-text-center',
  },
  {
    title: '批次/有效期',
    key: 'batchNo',
    width: 200,
    className: 'lkc-text-center',
    render: (_, record) => (
      <div>
        <div>{record.batchNo}</div>
        <div>{record.expiredDate}</div>
      </div>
    ),
  },
  {
    title: '跟踪码',
    dataIndex: 'trackCode',
    className: 'lkc-text-center',
  },
  {
    title: '发票信息',
    key: 'invoiceInfo',
    width: 200,
    className: 'lkc-text-center',
    render: (_, record) => (
      <div>
        <div>{record.invoiceNo}</div>
        <div>{record.invoiceDate}</div>
      </div>
    ),
  },
  {
    title: '退货数量',
    dataIndex: 'returnQty',
    className: 'lkc-text-center',
    render: (text, record) => `${text}${record.packageUnitText}`,
  },
  {
    title: '单价',
    dataIndex: 'materialsPrice',
    className: 'lkc-text-right',
    render: text => `￥${text}`,
  },
  {
    title: '金额小计',
    dataIndex: 'materialsAmount',
    className: 'lkc-text-right',
    render: text => `￥${text}`,
  },
]
export default {
  returnItemColumns,
  operationItemColumns,
}
