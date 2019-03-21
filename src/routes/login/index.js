import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Radio, Alert, Button  } from 'antd'
import styles from './index.less'
import QuickLogin from './quickLogin'
import AccountLogin from './accountLogin'
import LoginPage from './LoginPage'

import { Link } from 'dva/router'
const Login = ({ login, dispatch }) => {
  const {
    passwordVisible,
    countDownStatus,
    quickLoginButtonLoading,
    accountLoginButtonLoading,
    tab,
    accountErrorText,
    quickErrorText,
  } = login

  // 帐号登录页属性
  const accountLoginProps = {
    handleAccountLogin: (values) => {
      dispatch({ type: 'login/update', payload: { accountErrorText: undefined } })
      dispatch({ type: 'login/accountLogin', payload: values })
    },
    passwordVisible,
    handlePasswordVisibleIconClick: () => {
      dispatch({ type: 'login/switchPasswordVisble' })
    },
    loginLoading: accountLoginButtonLoading,
    handleErrorTextChange: (text) => {
      dispatch({ type: 'login/update', payload: { accountErrorText: text } })
    },
  }

  // 快速登录页面属性
  const quickLoginProps = {
    handleQuickLogin: (values) => {
      dispatch({ type: 'login/update', payload: { quickErrorText: undefined } })
      dispatch({ type: 'login/quickLogin', payload: values })
    },
    countDownStatus,
    handleCountDownComplete: () => {
      dispatch({ type: 'login/countDownComplete' })
    },
    handleClickGetCaptcha: (payload) => {
      dispatch({ type: 'login/update', payload: { quickErrorText: undefined } })
      dispatch({ type: 'login/getMobileCaptcha', payload })
    },
    buttonLoading: quickLoginButtonLoading,
    handleErrorTextChange: (text) => {
      dispatch({ type: 'login/update', payload: { quickErrorText: text } })
    },
  }

  const radioGroupProps = {
    // value: tab,
    style: { width: '100%' },
    size: 'large',
    // onChange: (e) => {
    //   dispatch({
    //     type: 'login/update',
    //     payload: {
    //       tab: e.target.value,
    //       accountErrorText: undefined,
    //       quickErrorText: undefined,
    //       countDownStatus: false,
    //     },
    //   })
    // },
  }

  const buttonLogin = function (value) {
    dispatch({ type: 'login/update', payload: { tab: 'login' } })
  }
  const buttonRegist = function (value) {
    dispatch({ type: 'login/update', payload: { tab: 'regist' } })
  }
  console.log(tab)

  return (
    <LoginPage>
      <div className={styles.login}>
        <Radio.Group {...radioGroupProps}>
          <Radio.Button value="account" className={styles.radio}>
            用户登陆
          </Radio.Button>
          {/* <Radio.Button value="quick" className={styles.radio}>
            快速登录
          </Radio.Button> */}
        </Radio.Group>
        <div className={styles.formContent}>
          {tab == 'login' && (
            <div>
              <linl to="/login">
                <Button type="primary"  onClick={buttonLogin}>已有账户？ 请登陆</Button >
              </linl>
              <Link to="/regist">
                <Button type="primary" className={styles["button-active"]} onClick={buttonRegist}>初次账户？ 请注册</Button >
              </Link>
            </div>
          )}
          {tab == 'regist' && (
            <div className={styles.titlebutton}>
              <linl to="/login" >
                <Button type="primary" className={styles["button-active"]} onClick={buttonLogin}>已有账户？ 请登陆</Button >
              </linl>
              <Link to="/regist">
                <Button type="primary"  onClick={buttonRegist}>初次账户？ 请注册</Button >
              </Link>
            </div>
          )}
            <span  className={styles.underline}></span>
          <p>使用注册信息登录：</p>
          <p>Log in with registered details</p>
          <div>
            {accountErrorText && (
              <Alert type="error" message={accountErrorText} showIcon style={{ marginTop: 1 }} />
            )}
            {
              tab == 'login' && (<AccountLogin {...accountLoginProps} />)
            }
            {
              tab == 'regist' && (<AccountLogin {...accountLoginProps} />)
            }
          </div>
        </div>
      </div>
    </LoginPage>
  )
}

Login.propTypes = {
  login: PropTypes.object,
  dispatch: PropTypes.func,
  children: PropTypes.node,
  location: PropTypes.object,
}

export default connect(({ login }) => ({ login }))(Login)
