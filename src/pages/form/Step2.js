import React, { Component } from 'react'
import { Form, Input, Alert, Divider, Button } from 'antd';
const FormItem = Form.Item;
const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 10 },
    },
};


@Form.create()
class Step2 extends Component {
    state = {
        formDefaults: {
            payAccount: 1,
            receiverAccount: 'test@example.com',
            receiverName: '测试',
            payMoney: 24.21
        }
    }
    handleSubmit(e) {
        e.preventDefault();
        console.log(this.props)
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.onNext()
            }
        });
    }
    handlePrevClick() {
        this.props.onPrev();
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const { formDefaults } = this.state
        return (
            <Form onSubmit={this.handleSubmit.bind(this)}>
                <Alert
                    closable
                    showIcon
                    message="确认转账后，资金将直接打入对方账户，无法退回。"
                    style={{ marginBottom: 24 }}
                />
                <FormItem {...formItemLayout} label="付款账户">
                    {formDefaults.payAccount}
                </FormItem>
                <FormItem {...formItemLayout} label="收款账户">
                    {formDefaults.receiverAccount}
                </FormItem>
                <FormItem {...formItemLayout} label="收款人姓名">
                    {formDefaults.receiverName}
                </FormItem>
                <FormItem {...formItemLayout} label="转账金额">
                    {formDefaults.payMoney}
                </FormItem>
                <Divider style={{ margin: '24px 0' }} />
                <Form.Item {...formItemLayout} label="支付密码" required={false}>
                    {getFieldDecorator('password', {
                        initialValue: '123456',
                        rules: [
                            {
                                required: true,
                                message: '需要支付密码才能进行支付',
                            },
                        ],
                    })(<Input type="password" autoComplete="off" style={{ width: '80%' }} />)}
                </Form.Item>
                <FormItem className='btn-group'>
                    <Button type="primary" onClick={this.handlePrevClick.bind(this)}>上一步</Button>
                    <Button type="primary" htmlType="submit">下一步</Button>
                </FormItem>
            </Form>
        );
    }
}

export default Step2