import React, { Component } from 'react'
import { Steps, Card } from 'antd';
import Step1 from '@/pages/form/Step1';
import Step2 from '@/pages/form/Step2';
import Step3 from '@/pages/form/Step3';
const Step = Steps.Step

class StepForm extends Component {
    state = {
        current: 0
    }
    next() {
        if (this.state.current === 2) {
            alert('填写完成！')
            return
        }
        const current = this.state.current + 1;
        this.setState({ current });
    }
    prev() {
        const current = this.state.current - 1;
        this.setState({ current });
    }
    render() {
        const { current } = this.state
        return (
            <Card bordered={false}>
                <Steps current={current}>
                    <Step title="填写转账信息" />
                    <Step title="确认转账信息" />
                    <Step title="完成" />
                </Steps>
                <div className="steps-content">
                    <div style={{ display: current === 0 ? 'block' : 'none' }}>
                        <Step1 onNext={this.next.bind(this)}></Step1>
                    </div>
                    <div style={{ display: current === 1 ? 'block' : 'none' }}>
                        <Step2 onNext={this.next.bind(this)} onPrev={this.prev.bind(this)}></Step2>
                    </div>
                    <div style={{ display: current === 2 ? 'block' : 'none' }}>
                        <Step3 onNext={this.next.bind(this)} onPrev={this.prev.bind(this)}></Step3>
                    </div>
                </div>
            </Card>
        );
    }
}

export default StepForm