import React, { useState, useEffect } from 'react'
import moment from 'moment'
import {EditOutlined,DeleteOutlined} from '@ant-design/icons'
import { Modal, Select, Table, DatePicker } from 'antd'
import { Form, Input, message } from 'antd'
import axios from 'axios'
import Layout from '../components/Layout/Layout'
const { RangePicker } = DatePicker



const Homepage = () => {
  const [showModal, setShowModal] = useState(false)
  const [allTransaction, setAllTransaction] = useState([])
  const [filter, setFilter] = useState('7')
  const [selectedDate, setSeleteddate] = useState([])
  const [type, setType] = useState('all')
  const [editTable,setEditTable]=useState(null)


  // Table data
  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      render: (text) => <span>{moment(text).format('YYYY-MM-DD')}</span>
    },
    {
      title: 'Amount',
      dataIndex: 'amount'
    },
    {
      title: 'Category',
      dataIndex: 'category'
    }, {
      title: 'Description',
      dataIndex: 'description'
    },
    {
      title: 'Actions',
      render:(text,record)=>(
        <div>
          <EditOutlined onClick={()=>{
            setEditTable(record)
            setShowModal(true)
          }}/>
          <DeleteOutlined className='mx-2' onClick={()=>{handleDelete(record)}}/>
        </div>
      )
    }
  ]

  // GetAllTransaction



  // useEffect Hook
  useEffect(() => {
    const getAllTransections = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const res = await axios.post('/transections/get-transection', { userid: user._id, filter, selectedDate, type, });
        setAllTransaction(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err);
        message.error('Fetch issue with transaction');
      }
    };
    getAllTransections();
  }, [filter, selectedDate, type])


  // Delete handler
  const handleDelete= async(record)=>{
    try{
      await axios.post('/transections/delete-transection',{transacationId:record._id})
      message.success('Transaction Deleted')
    }catch(err){
      console.log(err);
      message.error('Unable to Delete')
    }

  }

  // Form handling
  const handleSubmit = async (val) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
     if(editTable){
      await axios.post('/transections/edit-transection', {payload:{ ...val, userid: user._id},transacationId:editTable._id });
      message.success('Transaction Updated Successfully');
     }else{
      await axios.post('/transections/add-transection', { ...val, userid: user._id });
      message.success('Transaction Added Successfully');
     }
      setShowModal(false);
      setEditTable(null)
    } catch (err) {
      message.error('Failed to Add Transaction');
    }
  };

  return (
    <Layout>
      <div className="filters">
        <div>
          <h6>Select Filter</h6>
          <Select value={filter} onChange={(values) =>
            setFilter(values)
          }>
            <Select.Option value='7'>Last 1 Week</Select.Option>
            <Select.Option value='30' >Last 1 Months</Select.Option>
            <Select.Option value='365'>Last 1 Year</Select.Option>
            <Select.Option value='custom'>Custom</Select.Option>
          </Select>
          {filter === 'custom' && <RangePicker value={selectedDate} onChange={(val) => setSeleteddate(val)} />}
        </div>
        <div>
          <h6>Select Category</h6>
          <Select value={type} onChange={(values) =>
            setType(values)
          }>
            <Select.Option value='All'>ALL</Select.Option>
            <Select.Option value='Income' >Income</Select.Option>
            <Select.Option value='Expense'>Expense</Select.Option>
            <Select.Option value='tax' >Tax</Select.Option>
            <Select.Option value='transportation' >Transprtaion</Select.Option>
            <Select.Option value='medical'>Medical</Select.Option>
            <Select.Option value='food'>Food</Select.Option>
            <Select.Option value='project' >Project</Select.Option>
            <Select.Option value='salary'>Salary</Select.Option>
          </Select>
        </div>
        <div>
          <button className='btn btn-primary' onClick={() => setShowModal(true)}>Add new</button>
        </div>

      </div>


      {/* Table  */}
      <div className="content">
        <Table columns={columns} dataSource={allTransaction} />
      </div>
      <Modal title={editTable ? 'Edit Transaction' : 'Add Transaction'} open={showModal} onCancel={() => setShowModal(false)} footer={false}>
        <Form Layout='vertical' onFinish={handleSubmit} initialValues={editTable}>
          <Form.Item label="Amount" name="amount">
            <Input type='text' />
          </Form.Item>
          <Form.Item label="Category" name="category">
            <Select>
              <Select.Option value='salary'>Salary</Select.Option>
              <Select.Option value='tip'>Tip</Select.Option>
              <Select.Option value='project'>Project</Select.Option>
              <Select.Option value='food'>Food</Select.Option>
              <Select.Option value='transportation' >Transprtaion</Select.Option>
              <Select.Option value='movie'>Movie</Select.Option>
              <Select.Option value='bills'>Bills</Select.Option>
              <Select.Option value='medical'>Medical</Select.Option>
              <Select.Option value='fee'>Fee</Select.Option>
              <Select.Option value='tax'>Tax</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Date" name="date">
            <Input type='date' />
          </Form.Item>
          <Form.Item label="Desc" name="description">
            <Input type='text' />
          </Form.Item>
          <div className="d-flex justify-content-end">
            <button type='submit' className='btn btn-primary'>{" "}SAVE</button>
          </div>
        </Form>
      </Modal>

    </Layout>
  )
}

export default Homepage
