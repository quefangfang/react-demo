import React, { Component } from 'react'
import { Table, Input, InputNumber, Popconfirm, Form, Divider, Button } from 'antd';
import axios from '@/utils/axios';
const FormItem = Form.Item;
const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
    <EditableContext.Provider value={form}>
        <tr {...props} />
    </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends Component {
    getInput = () => {
        if (this.props.inputType === 'number') {
            return <InputNumber />;
        }
        return <Input />;
    };

    render() {
        const {
            editing,
            dataIndex,
            title,
            inputType,
            record,
            index,
            ...restProps
        } = this.props;
        return (
            <EditableContext.Consumer>
                {(form) => {
                    const { getFieldDecorator } = form;
                    return (
                        <td {...restProps}>
                            {editing ? (
                                <FormItem style={{ margin: 0 }}>
                                    {getFieldDecorator(dataIndex, {
                                        rules: [{
                                            required: true,
                                            message: `Please Input ${title}!`,
                                        }],
                                        initialValue: record[dataIndex],
                                    })(this.getInput())}
                                </FormItem>
                            ) : restProps.children}
                        </td>
                    );
                }}
            </EditableContext.Consumer>
        );
    }
}

class EditableTable extends Component {
    constructor(props) {
        super(props);
        this.state = { data: [], editingKey: '', selectedRowKeys: [] };
        this.columns = [
            {
                title: 'name',
                dataIndex: 'name',
                width: '25%',
                editable: true,
            },
            {
                title: 'age',
                dataIndex: 'age',
                width: '15%',
                editable: true,
            },
            {
                title: 'address',
                dataIndex: 'address',
                width: '40%',
                editable: true,
            },
            {
                title: 'operation',
                dataIndex: 'operation',
                render: (text, record) => {
                    const editable = this.isEditing(record);
                    return (
                        <div>
                            {editable ? (
                                <span>
                                    <EditableContext.Consumer>
                                        {form => (
                                            <a
                                                href="javascript:;"
                                                onClick={() => this.save(form, record.key)}
                                                style={{ marginRight: 8 }}
                                            >
                                                Save
                      </a>
                                        )}
                                    </EditableContext.Consumer>
                                    <Popconfirm
                                        title="Sure to cancel?"
                                        onConfirm={() => this.cancel(record.key)}
                                    >
                                        <a>Cancel</a>
                                    </Popconfirm>
                                </span>
                            ) : (
                                    <div>
                                        <a onClick={() => this.edit(record.key)}>Edit</a>
                                        <Divider type="vertical" />
                                        <a onClick={() => this.delete(record.key)}>Delete</a>
                                    </div>
                                )}
                        </div>
                    );
                },
            },
        ];
    }
    componentDidMount() {
        this.handleSearch()
    }
    async handleSearch() {
        let result = await axios.get('mockData/mockForm.json');
        if (result.length > 0) {
            this.setState({
                data: result
            })
        }
    }
    isEditing = record => record.key === this.state.editingKey;
    onSelectChange = (selectedRowKeys, selectedRows) => {
        this.setState({
            selectedRowKeys
        });
    }
    // 批量删除
    handleDel() {
        const { selectedRowKeys } = this.state
        const newList = [...this.state.data]
        selectedRowKeys.map(element => {
            const index = newList.findIndex(item => element === item.key);
            newList.splice(index, 1);
        });
        this.setState({
            data: newList,
            selectedRowKeys: []
        })
    }
    cancel = () => {
        this.setState({ editingKey: '' });
    }
    handleAdd() {
        const { data } = this.state;
        const count = +data[data.length - 1].key + 1;
        const newData = {
            key: count,
            name: '',
            age: '',
            address: '',
        };
        this.setState({
            data: [...data, newData],
            editingKey: count
        });
    }
    save(form, key) {
        form.validateFields((error, row) => {
            if (error) {
                return;
            }
            const newData = [...this.state.data];
            const index = newData.findIndex(item => key === item.key);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                this.setState({ data: newData, editingKey: '' });
            } else {
                newData.push(row);
                this.setState({ data: newData, editingKey: '' });
            }
        });
    }

    edit(key) {
        this.setState({ editingKey: key });
    }
    delete(key) {
        const data = [...this.state.data];
        this.setState({ data: data.filter(item => item.key !== key) });
    }
    saveAll() {
        const { data } = this.state
        console.log(data)
        // TODO 保存数据
    }
    render() {
        const components = {
            body: {
                row: EditableFormRow,
                cell: EditableCell,
            },
        };

        const columns = this.columns.map((col) => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: record => ({
                    record,
                    inputType: col.dataIndex === 'age' ? 'number' : 'text',
                    dataIndex: col.dataIndex,
                    title: col.title,
                    editing: this.isEditing(record),
                }),
            };
        });
        const { editingKey, selectedRowKeys } = this.state
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        }
        return (
            <div className='advance-form'>
                <Button type="danger" disabled={selectedRowKeys.length === 0 || editingKey !== '' || this.state.data.length === 0}
                    style={{ textAlign: 'right', margin: '20px' }} onClick={this.handleDel.bind(this)}
                >
                    删除
                </Button>
                <Table
                    rowSelection={rowSelection}
                    components={components}
                    bordered
                    dataSource={this.state.data}
                    columns={columns}
                    pagination={false}
                    rowClassName="editable-row"
                />
                <Button
                    disabled={editingKey !== ''}
                    style={{ width: '100%', marginTop: 16, marginBottom: 8 }}
                    type="dashed"
                    onClick={this.handleAdd.bind(this)}
                    icon="plus"
                >
                    新增
        </Button>
                <Button disabled={editingKey !== ''} className='saveAll' type="primary" onClick={this.saveAll.bind(this)}>保存</Button>
            </div>
        );
    }
}

export default EditableTable