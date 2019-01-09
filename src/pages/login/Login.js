import React, { Component } from 'react';
import { Form, Input, Button, Icon} from 'antd';
import './login.css';
const FormItem = Form.Item;


@Form.create()
class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
            loginName: '',
            loginPassword: ''
        }
    }
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                this.props.history.push('/app/dashboard');
            }
        })
    }
    render () {
        const { getFieldDecorator } = this.props.form;
        return(
            <div className='login-box'>
                <p className='login-title text-c'>欢迎登录</p>
                <Form className="login-form" onSubmit={this.handleSubmit}>
                    <FormItem>
                        {getFieldDecorator('loginName', {
                            validateFirst: true,
                            validateTrigger: 'onBlur',
                            rules: [
                            { required: true, message: '请输入用户名' }
                            ]
                        })(
                            <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            autoComplete="off"
                            onFocus={this.fixAutoComplete}
                            placeholder="请输入用户名"
                            />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('loginPassword', {
                            validateFirst: true,
                            validateTrigger: 'onBlur',
                            rules: [
                            { required: true, message: '请输入用户密码' },
                            {pattern:/^[a-zA-Z0-9]{6,32}$/,message: '6-32位数字、字母字符串'},
                            ]
                        })(
                            <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            onFocus={this.fixAutoComplete}
                            autoComplete="off"
                            placeholder="请输入用户密码"
                            />
                        )}
                    </FormItem>
                    <FormItem>
                        <Button type="primary" htmlType="submit" className="login-form-submit">登录</Button>
                    </FormItem>
                </Form>
            </div>
        )
    }
}
export default  Login