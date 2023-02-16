/**
 * Created by lifuzhen on 2022/5/24.
 * 科目信息组件
 */

import '@wangeditor/editor/dist/css/style.css' // 引入 css
import React, {useState, useEffect} from "react";
import {Input, Button, Table, Modal, Form, Pagination, message, Select, Upload} from "antd";
import {PlusOutlined, ExclamationCircleOutlined, LoadingOutlined} from "@ant-design/icons";
import { Editor, Toolbar } from '@wangeditor/editor-for-react';
import Nav from "@/components/nav";
import "../subject.less";

const Course = (props) => {

    const [form] = Form.useForm();
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [columns, setColumns] = useState([
        {
            title: '序号',
            dataIndex: 'number',
            key: 'number',
        },
        {
            title: '学科类别',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '科目名称',
            dataIndex: 'courseName',
            key: 'courseName',
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
            courseName: '建筑电工',
        },
        {
            key: '2',
            id: '2',
            number: '02',
            name: '七大员',
            courseName: '施工员',
        },
        {
            key: '3',
            id: '3',
            number: '03',
            name: '技工',
            courseName: '架子工',
        },
        {
            key: '4',
            id: '4',
            number: '04',
            name: '三大员',
            courseName: '建筑焊工',
        },
        {
            key: '5',
            id: '5',
            number: '05',
            name: '建筑工',
            courseName: '质量员',
        },
    ]);
    const [addModalVisible, setAddModalVisible] = useState(false);
    const [infoModalVisible, setInfoModalVisible] = useState(false);
    const [batchDelModalVisible, setBatchDelModalVisible] = useState(false);
    const [currentRecord, setCurrentRecord] = useState({});
    const [searchValue, setSearchValue] = useState("");
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState();
    const [editor, setEditor] = useState(null) // 存储 editor 实例
    const [html, setHtml] = useState('<p></p>') // 编辑器内容


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

    //批量删除-弹出模态框
    const handleBatchDelete = () => {
        setBatchDelModalVisible(true);
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

    const detailConfirm = (current) => {
       //TODO：弹出展示详情模态框
        setCurrentRecord(current);
        setInfoModalVisible(true);
    };

    //模态框关闭事件
    const handleCloseModal = () => {
        setInfoModalVisible(false);
        setAddModalVisible(false);
        setCurrentRecord({})
        setEditor(null);
    }


    const onSelectChange = (newSelectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    };

    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';

        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }

        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }

        return isJpgOrPng && isLt2M;
    };

    const handleChange = (info) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }

        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, (url) => {
                setLoading(false);
                setImageUrl(url);
            });
        }
    };

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </div>
    );

    //表格数据
    const data = dataSource.map((x)=>{
        return {
            key: x.key,
            id: x.id,
            name: x.name,
            number: x.number,
            courseName: x.courseName,
            operate: <p className="operate">
                <a className="edit" onClick={()=>handleEdit(x)}>编辑</a>
                <a className="delete" onClick={()=>detailConfirm(x)}>详情</a>
            </p>
        }
    })


    const toolbarConfig = {
        toolbarKeys: [
            // 菜单 key
            'headerSelect','bold', 'italic','underline','through','color','bgColor','insertLink','bulletedList','justifyLeft','blockquote','uploadImage'
        ]
    }
    const editorConfig = {
        placeholder: '请输入内容...',
    }

    // 及时销毁 editor ，重要！
    useEffect(() => {
        return () => {
            if (editor == null) return
            editor.destroy()
            setEditor(null)
        }
    }, [editor])

    console.log("current:", currentRecord);
    return <div className="course-page">
        {/*导航*/}
        <Nav list={[
            {title: "学科管理", key: 0, to: ""},
            {title: "科目信息", key: 1, to: ""},
        ]}/>
        {/*内容*/}
        <div className="course-content">
            <div className="search-content">
                <div className="search-item">
                    <label>学科类别：</label>
                    <Select placeholder="请选择"/>
                </div>
                <div className="search-item">
                    <label>科目名称：</label>
                    <Input placeholder="请输入"/>
                </div>
                <Button type="primary" onClick={handleSearch}>搜索</Button>
            </div>
            <div className="btn-groups">
                <Button className="create-btn" icon={<PlusOutlined />} type="primary" onClick={handleCreate}>新建</Button>
                <Button className="del-btn" type="primary" onClick={handleBatchDelete}>批量删除</Button>
            </div>
            <Table
                rowSelection={rowSelection}
                className="course-table"
                columns={columns}
                dataSource={data}
                pagination={false}
            />
            {/*TODO：分页要更新根据数据来*/}
            <Pagination
                className="course-pagination"
                total={85}
                pageSizeOptions={[10,20,30,40,50,60,70,80,90]}
                showSizeChanger
                showQuickJumper
                showTotal={total => `共 ${total} 条记录 第1/10页`}
            />
        </div>

        {/*新增或编辑学科类别*/}
        <Modal
            className="add-subject"
            title={currentRecord.id ? "编辑科目信息" : "新增科目信息"}
            visible={addModalVisible}
            closable
            onCancel={handleCloseModal}
            footer={null}
            destroyOnClose={true}
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
                    label="学科类别"
                    name="name"
                    rules={[{ required: true, message: '请输入学科类别' }]}
                >
                    <Input placeholder="请输入" maxLength={30}/>
                </Form.Item>
                <Form.Item
                    label="科目名称"
                    name="courseName"
                    rules={[{ required: true, message: '请输入科目名称' }]}
                >
                    <Input placeholder="请输入" maxLength={30}/>
                </Form.Item>
                <Form.Item
                    label="封面图片"
                    name="img"
                    rules={[{ required: false, message: '请输入科目名称' }]}
                >
                   <div>
                       <Upload
                           name="avatar"
                           listType="picture-card"
                           className="avatar-uploader"
                           showUploadList={false}
                           action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                           beforeUpload={beforeUpload}
                           onChange={handleChange}
                       >
                           {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                       </Upload>
                       <p className="tips">注：最多上传1张，上传图片尺寸720*720px，格式支持jpg,png;图片大小不可超过2M</p>
                   </div>
                </Form.Item>
                <Form.Item
                    label="报考条件"
                    name="condition"
                    required={true}
                >
                    <div style={{ border: '1px solid #ccc', zIndex: 100}}>
                        <Toolbar
                            editor={editor}
                            defaultConfig={toolbarConfig}
                            mode="default"
                            style={{ borderBottom: '1px solid #ccc' }}
                        />
                        <Editor
                            defaultConfig={editorConfig}
                            value={html}
                            onCreated={setEditor}
                            onChange={editor => setHtml(editor.getHtml())}
                            mode="default"
                            style={{ height: '200px', overflowY: 'hidden' }}
                        />
                    </div>
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }} className="submit-groups">
                    <p className="btn-groups">
                        <Button onClick={handleCloseModal}>取消</Button>
                        <Button type="primary"  htmlType="submit">{currentRecord.id ? "确定修改" : "确定"}</Button>
                    </p>
                </Form.Item>
            </Form>
        </Modal>
        {/*查看学科类别详情*/}
        <Modal
            className="info-subject"
            title="科目详情"
            visible={infoModalVisible}
            closable
            onCancel={handleCloseModal}
            footer={null}
            destroyOnClose={true}
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
                    label="学科类别"
                    name="name"
                    rules={[{ required: true, message: '请输入学科类别' }]}
                >
                    <Input placeholder="请输入" maxLength={30} value={currentRecord.name} disabled/>
                </Form.Item>
                <Form.Item
                    label="科目名称"
                    name="courseName"
                    rules={[{ required: true, message: '请输入科目名称' }]}
                >
                    <Input placeholder="请输入" maxLength={30} value={currentRecord.courseName} disabled/>
                </Form.Item>
                <Form.Item
                    label="封面图片"
                    name="img"
                    rules={[{ required: false, message: '请输入科目名称' }]}
                >
                    <img src={currentRecord.imgUrl} alt=""/>
                </Form.Item>
                <Form.Item
                    label="报考条件"
                    name="condition"
                    required={true}
                >
                    <div style={{ border: '1px solid #ccc', zIndex: 100}}>
                        <Toolbar
                            editor={editor}
                            defaultConfig={toolbarConfig}
                            mode="default"
                            style={{ borderBottom: '1px solid #ccc' }}
                        />
                        <Editor
                            defaultConfig={editorConfig}
                            value={html}
                            onCreated={setEditor}
                            onChange={editor => setHtml(editor.getHtml())}
                            mode="default"
                            style={{ height: '200px', overflowY: 'hidden' }}
                        />
                    </div>
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

export default Course;
