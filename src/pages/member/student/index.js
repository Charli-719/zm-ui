/**
 * Created by lifuzhen on 2022/6/29.
 * 学员信息
 */
import React, {useEffect, useState} from "react";
import Nav from "@/components/nav";
import {Button, Form, Input, Modal, Pagination, Select, Table, Upload} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import "../member.less";
import {Editor, Toolbar} from "@wangeditor/editor-for-react";

const {Option} = Select;

const Student = (props) => {
    const [form] = Form.useForm();
    const [columns, setColumns] = useState([
        {
            title: '序号',
            dataIndex: 'number',
            key: 'number',
        },
        {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '联系方式',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: '单位名称',
            dataIndex: 'company',
            key: 'company',
        },
        {
            title: '身份证号',
            dataIndex: 'idNumber',
            key: 'idNumber',
        },
        {
            title: '所报学科',
            dataIndex: 'subject',
            key: 'subject',
        },
        {
            title: '报名科目',
            dataIndex: 'course',
            key: 'course',
        },
        {
            title: '联系人',
            dataIndex: 'user',
            key: 'user',
        },
        {
            title: '报名类型',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: '状态',
            dataIndex: 'state',
            key: 'state',
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            key: 'createTime',
        },
        {
            title: '操作',
            dataIndex: 'operate',
            key: 'operate',
        },
    ]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [currentRecord, setCurrentRecord] = useState({});
    const [createModalVisible, setCreateModalVisible] = useState(false);

    //点击搜索按钮
    const handleSearch = (searchValue) => {
        //TODO 调用搜索接口-更新列表数据
        console.log("searchValue:", searchValue);
    }

    //新建
    const handleCreate = () => {
        setCreateModalVisible(true);
    }


    //批量删除
    const handleBatchDelete = () => {

    }

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const onSelectChange = (newSelectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };

    //点击新建获取编辑的确认按钮
    const onFinish = (values) => {
        console.log('Success:', values);
        if(currentRecord.id) {
            //TODO： 调用编辑接口
        }else{
            //TODO： 调用新建接口
        }
    }

    return <div className="student-page">
        {/*导航*/}
        <Nav list={[
            {title: "学员管理", key: 0, to: ""},
            {title: "学员信息", key: 1, to: ""},
        ]}/>
        {/*内容*/}
        <div className="student-content">
            <div className="search-content">
                <div className="search-item">
                    <Input.Group compact>
                        <Select defaultValue="01">
                            <Option value="01">按学员姓名</Option>
                            <Option value="02">状态</Option>
                            <Option value="03">报名类型</Option>
                        </Select>
                        <Input.Search
                            allowClear
                            style={{
                                width: '60%',
                            }}
                            placeholder="请输入内容"
                        />
                    </Input.Group>
                </div>
                <div className="search-item">
                    <label>状态：</label>
                    <Select placeholder="请选择">

                    </Select>
                </div>
                <div className="search-item">
                    <label>报名类型：</label>
                    <Select placeholder="请选择">

                    </Select>
                </div>
                <Button type="primary" onClick={handleSearch}>搜索</Button>
            </div>
            <div className="btn-groups">
                <Button className="create-btn" icon={<PlusOutlined />} type="primary" onClick={handleCreate}>新建</Button>
                <Button className="del-btn" type="primary" onClick={handleBatchDelete}>批量报名导入</Button>
                <Button className="del-btn" type="primary" onClick={handleBatchDelete}>批量缴费导入</Button>
                <Button className="del-btn" type="primary" onClick={handleBatchDelete}>批量导出</Button>
            </div>
            <Table
                rowSelection={rowSelection}
                className="student-table"
                columns={columns}
                dataSource={[]}
                pagination={false}
            />
            {/*TODO：分页要更新根据数据来*/}
            <Pagination
                className="student-pagination"
                total={85}
                pageSizeOptions={[10,20,30,40,50,60,70,80,90]}
                showSizeChanger
                showQuickJumper
                showTotal={total => `共 ${total} 条记录 第1/10页`}
            />
        </div>
        <Modal
            visible={createModalVisible}
            title="新增学员"
        >
            <Form
                preserve={false}
                name="basic"
                form={form}
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item
                    label="姓名"
                    name="name"
                    rules={[{ required: true, message: '请输入姓名' }]}
                >
                    <Input placeholder="请输入" maxLength={30}/>
                </Form.Item>
                <Form.Item
                    label="联系方式"
                    name="courseName"
                    rules={[{ required: true, message: '请输入联系方式' }]}
                >
                    <Input placeholder="请输入" maxLength={30}/>
                </Form.Item>
                <Form.Item
                    label="报名科目"
                    name="img"
                    rules={[{ required: false, message: '请输入报名科目' }]}
                >
                    <div>
                        <Select placeholder="请选择学科"></Select>
                        <Select placeholder="请选择科目"></Select>
                    </div>
                </Form.Item>
                <Form.Item
                    label="性别"
                    name="gender"
                    required={false}
                >
                    <Select>
                        <Option value="0">未知</Option>
                        <Option value="1">男</Option>
                        <Option value="2">女</Option>
                    </Select>
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }} className="submit-groups">
                    <p className="btn-groups">
                        <Button onClick={handleCloseModal}>取消</Button>
                        <Button type="primary"  htmlType="submit">{currentRecord.id ? "确定修改" : "确定"}</Button>
                    </p>
                </Form.Item>
            </Form>
        </Modal>
    </div>
}

export default Student;