import React, { Component } from 'react';
class Dashboard extends Component {
  componentDidMount() {}
  render() {
    return (
      <div className="dashboard-page">
            <p style={{textAlign:'center',margin:'40px 0',fontSize:'16px'}}>
                欢迎来到这里，可以点击左边菜单查看demo效果，谢谢！
            </p>
      </div>
    );
  }
}
export default Dashboard;