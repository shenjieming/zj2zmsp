import React from 'react'
import { FORM_ITEM_LAYOUT } from '../../../utils/constant'
import { getOption } from '../../../utils'

const formData = ({
  rowData,
  packageUnit,
  inviteRequired,
  selectChange,
  getFieldValue,
  branOptionList,
  onSearchBrandListFun,
}) => {
  const {
    materialsName,
    materialsSku,
    factoryName,
    certificateNo,
    brandName,
    inviteType,
    inviteNo,
    price,
    materialsUnit,
    materialsUnitText,
    materialsCommenName,
    productCode,
  } = rowData
  return [
    <div className="lkc-form-head">基础信息</div>,
    {
      label: '物料名称',
      field: 'materialsName',
      view: true,
      col: 12,
      layout: FORM_ITEM_LAYOUT,
      options: {
        initialValue: materialsName,
      },
      component: {
        name: 'Input',
        props: {
          placeholder: '请输入',
        },
      },
    }, {
      label: '规格型号',
      field: 'materialsSku',
      view: true,
      col: 12,
      layout: FORM_ITEM_LAYOUT,
      options: {
        initialValue: materialsSku,
      },
      component: {
        name: 'Input',
        props: {
          placeholder: '请输入',
        },
      },
    }, {
      label: '厂家',
      field: 'factoryName',
      view: true,
      col: 12,
      layout: FORM_ITEM_LAYOUT,
      options: {
        initialValue: factoryName,
      },
      component: {
        name: 'Input',
        props: {
          placeholder: '请输入',
        },
      },
    }, {
      label: '注册证号',
      field: 'certificateNo',
      view: true,
      col: 12,
      layout: FORM_ITEM_LAYOUT,
      options: {
        initialValue: certificateNo,
      },
      component: {
        name: 'LkcSelect',
        props: {
          placeholder: '请输入',
          url: '/certificate/my/register/options',
          optionConfig: {
            idStr: 'certificateId',
            nameStr: 'certificateNo',
          },
        },
      },
    }, {
      label: '产品编号',
      field: 'productCode',
      col: 12,
      layout: FORM_ITEM_LAYOUT,
      options: {
        initialValue: productCode,
        rules: [{
          max: 32,
          message: '最多输入32个字符',
        }],
      },
      component: {
        name: 'Input',
        props: {
          placeholder: '请输入产品编号',
        },
      },
    }, {
      label: '品牌',
      field: 'brandName',
      col: 12,
      layout: FORM_ITEM_LAYOUT,
      options: {
        initialValue: brandName,
        rules: [{
          max: 40,
          message: '最多输入40个字符',
        }],
      },
      component: {
        name: 'Select',
        props: {
          placeholder: '请输入品牌',
          children: getOption(branOptionList, { idStr: 'brandName', nameStr: 'brandName' }),
          onSearch: onSearchBrandListFun,
          mode: 'combobox',
          optionLabelProp: 'title',
          showSearch: true,
          defaultActiveFirstOption: false,
          filterOption: false,
          notFoundContent: false,
          allowClear: true,
        },
      },
    },
    <div className="lkc-form-head lkc-mb10">补充信息</div>,
    {
      label: '单价',
      field: 'price',
      col: 12,
      layout: FORM_ITEM_LAYOUT,
      options: {
        initialValue: price,
        rules: [{
          required: true,
          message: '请输入单价',
        }],
      },
      component: {
        name: 'LkcInputNumber',
        props: {
          placeholder: '请输入单价',
        },
      },
    },
    {
      label: '单位',
      field: 'materialsUnit',
      col: 12,
      layout: FORM_ITEM_LAYOUT,
      options: {
        initialValue: (materialsUnit && materialsUnitText) ? {
          label: materialsUnitText, key: materialsUnit,
        } : undefined,
        rules: [{
          required: true,
          message: '请选择单位',
        }],
      },
      component: {
        name: 'Select',
        props: {
          showSearch: true,
          placeholder: '请选择单位',
          optionFilterProp: 'children',
          allowClear: true,
          labelInValue: true,
          children: getOption(packageUnit, { idStr: 'dicValue', nameStr: 'dicValueText' }),
        },
      },
    },
    {
      label: '通用名称',
      field: 'materialsCommenName',
      col: 12,
      layout: FORM_ITEM_LAYOUT,
      options: {
        initialValue: materialsCommenName,
        rules: [{
          max: 200,
          message: '最多输入200个字符',
        }],
      },
      component: {
        name: 'Input',
        props: {
          placeholder: '请输入通用名称',
        },
      },
    },
    {
      label: '招标信息',
      field: 'inviteType',
      col: 8,
      layout: {
        labelCol: {
          span: 9,
        },
        wrapperCol: {
          span: 12,
        },
      },
      options: {
        initialValue: '1',
      },
      component: {
        name: 'Select',
        props: {
          placeholder: '请选择',
          children: getOption([{
            id: '1',
            name: '无',
          }, {
            id: '2',
            name: '省标',
          }, {
            id: '3',
            name: '市标',
          }, {
            id: '4',
            name: '院标',
          }]),
          onSelect(value) {
            selectChange(value)
          },
        },
      },
    },
    {
      field: 'inviteNo',
      options: {
        initialValue: inviteNo,
        rules: [{
          required: inviteRequired,
          whitespace: true,
          message: '请输入招标编号',
        }, {
          max: 50,
          message: '最多输入50个字符',
        }],
      },
      col: 4,
      layout: {
        wrapperCol: {
          span: 24,
        },
      },
      component: {
        name: 'Input',
        props: {
          disabled: !inviteRequired,
          placeholder: '请输入招标编号',
        },
      },
    },
  ]
}

export default {
  formData,
}
