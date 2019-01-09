import React, { Component } from 'react'
import { Form, Input, Select, Button } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
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
const payAccountList = [
    { name: '收款账户1', val: 1 },
    { name: '收款账户2', val: 2 },
    { name: '收款账户3', val: 13 }
]

@Form.create()
class Step1 extends Component {
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
    render() {
        const { getFieldDecorator } = this.props.form;
        const { formDefaults } = this.state
        return (
            <Form onSubmit={this.handleSubmit.bind(this)}>
                <FormItem {...formItemLayout} label="付款账户">
                    {getFieldDecorator('payAccount', {
                        initialValue: formDefaults.payAccount,
                        validateFirst: true,
                        validateTrigger: 'onBlur',
                        rules: [
                            { required: true, message: '请输入付款账户' }
                        ]
                    })(
                        <Select>
                            {payAccountList.map(item => <Option key={item.val} value={item.val}>{item.name}</Option>)}
                        </Select>
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label="收款账户">
                    <Input.Group compact>
                        <Select defaultValue="alipay" style={{ width: 100 }}>
                            <Option value="alipay">支付宝</Option>
                            <Option value="bank">银行账户</Option>
                        </Select>
                        {getFieldDecorator('receiverAccount', {
                            initialValue: formDefaults.receiverAccount,
                            validateFirst: true,
                            validateTrigger: 'onBlur',
                            rules: [
                                { required: true, message: '请输入付款账户' }
                            ]
                        })(
                            <Input autoComplete="off" placeholder="请输入收款账户" style={{ width: 'calc(100% - 100px)' }} />
                        )}
                    </Input.Group>
                </FormItem>
                <FormItem {...formItemLayout} label="收款人姓名">
                    {getFieldDecorator('receiverName', {
                        initialValue: formDefaults.receiverName,
                        validateFirst: true,
                        validateTrigger: 'onBlur',
                        rules: [
                            { required: true, message: '请输入收款人姓名' }
                        ]
                    })(
                        <Input autoComplete="off" placeholder="请输入收款人姓名" />
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label="转账金额">
                    {getFieldDecorator('payMoney', {
                        initialValue: formDefaults.payMoney,
                        validateFirst: true,
                        validateTrigger: 'onBlur',
                        rules: [
                            { required: true, message: '请输入转账金额' },
                            { pattern: /^(\d+)((?:\.\d+)?)$/, message: '请输入合法金额数字' }
                        ]
                    })(
                        <Input prefix="￥" autoComplete="off" placeholder="请输入转账金额" />
                    )}
                </FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit">下一步</Button>
                </FormItem>
            </Form>
        );
    }
}

export default Step1