import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Button } from 'antd'
import CountDown from '../../components/CountUp'
import { routerRedux } from 'dva/router'
import success from '../../assets/success.gif'
import Styles from './index.less'

class Fourth extends React.Component {
  componentDidMount() {
    this.mount = true
  }

  componentWillUnmount() {
    this.mount = false
  }

  render() {
    const dispatch = this.props.dispatch

    return (
      <Row>
        <Col span="9">
          <div className="lkc-text-right">
            <img src={success} alt="密码重置成功" />
          </div>
        </Col>
        <Col span="15">
          <h2 className="lkc-text-left" style={{ marginTop: '20px' }}>
          密码设置成功
          </h2>
          <p className="lkc-text-help lkc-text-left lkc-mtb10 lkc-font-small">
            请牢记您设置的新密码
          </p>
          <p className="lkc-text-left lkc-text-help lkc-mt30 lkc-font-small">
            <Button
              type="primary"
              onClick={() => { dispatch(routerRedux.replace({ pathname: '/login' })) }}
            >
              立即登录
            </Button>
            <CountDown
              className="lkc-ml20"
              start={30}
              end={0}
              duration={30}
              suffix="s"
              useEasing={false}
              onComplete={() => {
                if (this.mount) {
                  dispatch(routerRedux.replace({ pathname: '/login' }))
                }
              }}
            />后将会自动跳转到登录页面！
          </p>
        </Col>
      </Row>
    )
  }
}

Fourth.propTypes = {
  dispatch: PropTypes.func.isRequired,
}

export default Fourth
