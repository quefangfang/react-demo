import React, { Component } from 'react'
import { Row, Col, Button } from 'antd';
class Step3 extends Component {
    state = {
        formDefaults: {
            payAccount: 'sssddd',
            receiverAccount: 'test@example.com',
            receiverName: '测试',
            payMoney: 24.21
        }
    }
    handleFinishClick() {
        this.props.onNext();
    }
    handlePrevClick() {
        this.props.onPrev();
    }
    render() {
        const { formDefaults } = this.state
        return (
            <div className='form-confirm'>
                <Row>
                    <Col xs={24} sm={8}>
                        付款账户：
                    </Col>
                    <Col xs={24} sm={16}>
                        {formDefaults.payAccount}
                    </Col>
                </Row>
                <Row>
                    <Col xs={24} sm={8}>
                        收款账户：
                    </Col>
                    <Col xs={24} sm={16}>
                        {formDefaults.receiverAccount}
                    </Col>
                </Row>
                <Row>
                    <Col xs={24} sm={8}>
                        收款人姓名：
                    </Col>
                    <Col xs={24} sm={16}>
                        {formDefaults.receiverName}
                    </Col>
                </Row>
                <Row>
                    <Col xs={24} sm={8}>
                        转账金额：
                    </Col>
                    <Col xs={24} sm={16}>
                        <span>{formDefaults.payMoney}</span> 元
                    </Col>
                </Row>
                <div className="btn-group">
                    <Button type="primary" onClick={this.handlePrevClick.bind(this)}>上一步</Button>
                    <Button type="primary" onClick={this.handleFinishClick.bind(this)}>完成</Button>
                </div>
            </div>
        );
    }
}

export default Step3