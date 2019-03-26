import React from 'react'

const formItemLayout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
}
const formItemLayoutHalf = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 8,
  },
}
const formItemLayoutFilled = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 19,
  },
}

const form = (initValue = {}, eventFun) => {
  const {
    currentItem: {
      commonName, // 通用名称
      materialsModel, // 物料型号
      materialsSku, // 物料规格
      materialsSkuCode, // 物料规格编号
      materialsSkuStatus, // 物料状态
      productCode, // 产品编号
      remark, // 备注
      skuUnitId, // 物料规格单位标识
    },
    addModalType,
  } = initValue
  const { asyncSkuList } = eventFun
  return [
    <div className="lkc-form-head">基础信息</div>,
    {
      label: '产品编号',
      col: 12,
      layout: formItemLayout,
      field: 'productCode',
      options: {
        rules: [],
        initialValue: productCode,
      },
      component: {
        name: 'Input',
      },
    },
    {
      label: '规格单位',
      layout: formItemLayout,
      field: 'skuUnitId',
      col: 12,
      options: {
        initialValue: skuUnitId,
        rules: [{ required: true, message: '请选择' }],
      },
      component: {
        name: 'Select',
        props: {
          placeholder: '',
          ...asyncSkuList,
          showSearch: true,
          optionFilterProp: 'children',
          defaultActiveFirstOption: false,
          filterOption: true,
          notFoundContent: false,
          allowClear: true,
        },
      },
    },
    {
      label: '规格',
      col: 12,
      layout: formItemLayout,
      field: 'materialsSku',
      options: {
        rules: [
          { required: true, message: '请输入' },
        ],
        initialValue: materialsSku,
      },
      component: {
        name: 'Input',
        props: {},
      },
    },
    {
      label: '型号',
      col: 12,
      layout: formItemLayout,
      field: 'materialsModel',
      options: {
        rules: [],
        initialValue: materialsModel,
      },
      component: {
        name: 'Input',
      },
    },
    // {
    //   label: '通用名称',
    //   col: 12,
    //   layout: formItemLayout,
    //   field: 'commonName',
    //   options: {
    //     rules: [],
    //     initialValue: commonName,
    //   },
    //   component: {
    //     name: 'Input',
    //   },
    // },
    <div className="lkc-form-head">其他信息</div>,
    {
      label: '备注',
      layout: formItemLayoutFilled,
      field: 'remark',
      options: {
        rules: [{ max: 500, message: '字数不可超过500' }],
        initialValue: remark,
      },
      component: {
        name: 'TextArea',
      },
    },
  ]
}
export default {
  form,
}
