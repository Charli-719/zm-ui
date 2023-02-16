/**
 * Created by lifuzhen on 2022/5/22.
 * 学科类别
 */

import React, {useState} from "react";
import {Input, Button, Table, Modal, Form, Pagination, message} from "antd";
import {PlusOutlined, ExclamationCircleOutlined} from "@ant-design/icons";
import Nav from "@/components/nav";
import "../subject.less";

const Category = (props) => {

  const [form] = Form.useForm();
  const [columns, setColumns] = useState([
    {
      title: '序号',
      dataIndex: 'number',
      key: 'number',
    },
    {
      title: '类别名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '科目数量',
      dataIndex: 'count',
      key: 'count',
    },
    {
      title: '操作',
      dataIndex: 'operate',
      key: 'operate',
    },
  ]);
  const [dataSource, setDataSource] = useState([
    {
      key: '1',
      id: '1',
      number: '01',
      name: '特种工',
      count: '8',
    },
    {
      key: '2',
      id: '2',
      number: '02',
      name: '七大员',
      count: '7',
    },
    {
      key: '3',
      id: '3',
      number: '03',
      name: '技工',
      count: '3',
    },
    {
      key: '4',
      id: '4',
      number: '04',
      name: '三大员',
      count: '18',
    },
    {
      key: '5',
      id: '5',
      number: '05',
      name: '建筑工',
      count: '16',
    },
  ]);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState({});
  const [searchValue, setSearchValue] = useState("");


  //更新搜索框内容
  const handleChangeSearchValue = (e) => {
    console.log("e.target.value:", e.target.value);
    setSearchValue(e.target.value);
  }

  //点击搜索按钮
  const handleSearch = () => {
    //TODO 调用搜索接口-更新列表数据
    console.log("searchValue:", searchValue);
  }

  //新建学科类别-弹出模态框
  const handleCreate = () => {
    setAddModalVisible(true);
    form.setFieldsValue({
      name: undefined,
    });
  }

  //点击新建获取编辑的确认按钮
  const onFinish = (values) => {
    console.log('Success:', values);
    if(currentRecord.id) {
      //TODO： 调用编辑接口
    }else{
      //TODO： 调用新建接口
    }
  }

  //点击列表中编辑按钮
  const handleEdit = (current) => {
    setCurrentRecord(current);
    form.setFieldsValue({
      name: current.name,
    });
    setAddModalVisible(true);
  }

  const delConfirm = (current) => {
    Modal.confirm({
      title: '提示',
      icon: <ExclamationCircleOutlined />,
      content: '您确定要删除吗？',
      okText: '确认',
      cancelText: '取消',
      onOk() {
        //TODO：调用删除接口
        message.success("删除成功")
      }
    });
  };

  //模态框关闭事件
  const handleCloseModal = () => {
    setAddModalVisible(false);
    setCurrentRecord({})
  }

  //表格数据
  const data = dataSource.map((x)=>{
    return {
      key: x.key,
      id: x.id,
      name: x.name,
      number: x.number,
      count: x.count,
      operate: <p className="operate">
        <a className="edit" onClick={()=>handleEdit(x)}>编辑</a>
        <a className="delete" onClick={()=>delConfirm(x)}>删除</a>
      </p>
    }
  })
  return <div className="category-page">
    {/*导航*/}
    <Nav list={[
      {title: "学科管理", key: 0, to: ""},
      {title: "学科类别", key: 1, to: ""},
    ]}/>
    {/*内容*/}
    <div className="category-content">
      <div className="search-content">
        <Input placeholder="请输入学科类别名称" onChange={(e) => handleChangeSearchValue(e)}/>
        <Button type="primary" onClick={handleSearch}>搜索</Button>
      </div>
      <Button className="create-btn" icon={<PlusOutlined />} type="primary" onClick={handleCreate}>新建</Button>
      <Table className="category-table" columns={columns} dataSource={data} pagination={false}/>
      {/*TODO：分页要更新根据数据来*/}
      <Pagination
          className="category-pagination"
          total={85}
          pageSizeOptions={[10,20,30,40,50,60,70,80,90]}
          showSizeChanger
          showQuickJumper
          showTotal={total => `共 ${total} 条记录 第1/10页`}
      />
    </div>

    {/*新增学科类别*/}
    <Modal
      className="add-subject"
      title={currentRecord.id ? "编辑学科类别" : "新增学科类别"}
      visible={addModalVisible}
      closable
      onCancel={handleCloseModal}
      footer={null}
    >
      <Form
        name="basic"
        form={form}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="类别名称"
          name="name"
          rules={[{ required: true, message: '请输入类别名称' }]}
        >
          <Input placeholder="请输入" maxLength={30}/>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }} className="submit-groups">
          <p className="btn-groups">
            <Button onClick={handleCloseModal}>取消</Button>
            <Button type="primary"  htmlType="submit">{currentRecord.id ? "确定修改" : "确定"}</Button>
          </p>
        </Form.Item>
      </Form>
    </Modal>

  {/*  删除记录的模态框*/}
    <Modal
        className='delete-subject'
        title="提示"

    >

    </Modal>
  </div>
}

export default Category;
