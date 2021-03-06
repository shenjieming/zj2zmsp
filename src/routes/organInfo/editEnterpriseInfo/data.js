/* eslint-disable */
import { REGEXP_FAX, REGEXP_TELEPHONE, REGEXP_EMAIL } from '@utils/constant'

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 16,
  },
}
const form = ({ orgDetail, addressList }) => [
  {
    label: '机构名称',
    layout: formItemLayout,
    field: 'orgName',
    view: true,
    options: {
      rules: [{ required: true, message: '请输入' }],
      initialValue: orgDetail.orgName,
    },
    col: 24,
    component: {
      name: 'Input',
      props: {
        placeholder: '输入机构全称',
      },
    },
  },
  {
    label: '机构类型',
    layout: formItemLayout,
    field: 'orgType',
    view: true,
    options: {
      initialValue: orgDetail.orgTypeText,
    },
    col: 24,
    component: {
      name: 'Select',
      props: {
        placeholder: '请选择',
      },
    },
  },
  {
    label: '机构等级',
    exclude: !(orgDetail.orgTypeCode === '02' || orgDetail.orgTypeCode === '05'),
    layout: formItemLayout,
    field: 'parentGrade',
    view: true,
    col: 24,
    options: {
      initialValue:
        orgDetail.orgTypeCode === '02'
          ? `${orgDetail.orgGradeText || ''}${orgDetail.orgParentGradeText || ''}`
          : orgDetail.orgGradeText,
    },
    component: {
      name: 'Select',
      props: {
        placeholder: '请选择',
      },
    },
  },
  {
    label: '营利性质',
    exclude: orgDetail.orgTypeCode !== '02',
    layout: formItemLayout,
    col: 24,
    field: 'profit',
    view: true,
    options: {
      initialValue: orgDetail.profit ? '营利' : '非营利',
    },
    component: {
      name: 'RadioGroup',
      props: {
        options: [{ label: '营利', value: 1 }, { label: '非营利', value: 0 }],
      },
    },
  },
  {
    label: '上级机构',
    layout: formItemLayout,
    field: 'parentOrgName',
    view: true,
    options: {
      initialValue: orgDetail.parentOrgName,
    },
    col: 24,
    component: {
      name: 'Input',
    },
  },
  {
    label: '法人',
    layout: formItemLayout,
    field: 'legalPerson',
    view: true,
    options: {
      initialValue: orgDetail.legalPerson,
    },
    col: 24,
    component: {
      name: 'Input',
      props: {
        placeholder: '输入法人姓名',
      },
    },
  },
  {
    label: '机构注册地',
    layout: formItemLayout,
    view: true,
    field: 'arrayOrgRegAddr',
    options: {
      initialValue: orgDetail.arrayOrgRegAddr
        ? orgDetail.arrayOrgRegAddr[3] +
          orgDetail.arrayOrgRegAddr[4] +
          orgDetail.arrayOrgRegAddr[5] +
          orgDetail.registeredAddress
        : '',
    },
    col: 24,
    component: {
      name: 'Cascader',
      props: {
        placeholder: '请选择',
      },
    },
  },
  {
    label: orgDetail.orgTypeCode === '02' ? '诊疗科目' : '经营范围',
    layout: formItemLayout,
    field: 'businessScope',
    options: {
      initialValue: orgDetail.businessScope,
    },
    col: 24,
    component: {
      name: 'TextArea',
      props: {
        placeholder: '输入企业经营范围（字数不超过300字）',
        maxLength: 300,
      },
    },
  },
  {
    label: '办公地址',
    layout: formItemLayout,
    field: 'arrayOrgOfficeAddr',
    options: {
      initialValue: orgDetail.arrayOrgOfficeAddr,
      getValueFromEvent: (val, selectedOptions) => {
        const addressArray = [...val]
        for (const item of selectedOptions) {
          addressArray.push(item.label)
        }
        return addressArray
      },
    },
    col: 24,
    component: {
      name: 'Cascader',
      props: {
        placeholder: '请选择省市区',
        options: addressList,
      },
    },
  },
  {
    label: '详细地址',
    layout: formItemLayout,
    field: 'officeAddress',
    options: {
      initialValue: orgDetail.officeAddress,
    },
    col: 24,
    component: {
      name: 'TextArea',
      maxLength: 200,
      props: {
        placeholder: '请填写详细地址，如街道名称、楼层和门牌号等信息',
      },
    },
  },
  {
    label: '固话',
    layout: formItemLayout,
    field: 'phone',
    options: {
      initialValue: orgDetail.phone,
      rules: [
        {
          pattern: REGEXP_FAX,
          message: '格式错误',
        },
      ],
    },
    col: 24,
    component: {
      name: 'Input',
      props: {
        placeholder: '例：0571 - 58796324',
      },
    },
  },
  {
    label: '传真',
    layout: formItemLayout,
    field: 'fax',
    options: {
      initialValue: orgDetail.fax,
      rules: [
        {
          pattern: REGEXP_FAX,
          message: '格式错误',
        },
      ],
    },
    col: 24,
    component: {
      name: 'Input',
      props: {
        placeholder: '输入传真号',
      },
    },
  },
  {
    label: '联系人',
    layout: formItemLayout,
    field: 'principal',
    options: {
      initialValue: orgDetail.principal,
    },
    col: 24,
    component: {
      name: 'Input',
      props: {
        placeholder: '输入负责人姓名',
      },
    },
  },
  {
    label: '联系人手机号',
    layout: formItemLayout,
    field: 'mobile',
    options: {
      initialValue: orgDetail.mobile,
      rules: [
        {
          pattern: REGEXP_TELEPHONE,
          message: '格式错误',
        },
      ],
    },
    col: 24,
    component: {
      name: 'Input',
      props: {
        placeholder: '输入11位手机号',
      },
    },
  },
  {
    label: '邮箱',
    layout: formItemLayout,
    field: 'email',
    options: {
      initialValue: orgDetail.email,
      rules: [
        {
          pattern: REGEXP_EMAIL,
          message: '格式错误',
        },
      ],
    },
    col: 24,
    component: {
      name: 'Input',
      props: {
        placeholder: '输入邮箱',
      },
    },
  },
]
export default {
  form,
}
