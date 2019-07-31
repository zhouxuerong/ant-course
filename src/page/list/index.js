import { Table, Modal, Button, Form, Input } from 'antd';
import { connect } from 'dva';
import React from 'react';
import SampleChart from '../../component/SampleChart';


const FormItem = Form.Item;


class List extends React.Component {

  state = {
    visible: false,
    statisticVisible: false,
    id: null,
  };

  columns = [
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '描述',
      dataIndex: 'desc',
    },
    {
      title: '链接',
      dataIndex: 'url',
      render: value => <a href={value}>{value}</a>,
    },
    {
      title: '',
      dataIndex: '_',
      render: (_, { id }) => {
        return (
          <Button onClick={() => { this.showStatistic(id); }}>图表</Button>
        );
      },
    },
  ];


  //为按钮添加相应事件，使其可以改变 state 中 visible 的值
  showModal = () => {
    this.setState({ visible: true });
  };

  //撤销操作
  handleCancel = () => {
    this.setState({
      visible:false,
    });
  }

  // 添加展示逻辑。
  showStatistic = (id) =>{
    this.props.dispatch({
      type: 'cards/getStatistic',
      payload: id,
    });
    // 更新 state，弹出包含图表的对话框
    this.setState({ id, statisticVisible: true });
  };

  handleStatisticCancel = () => {
    this.setState({
      statisticVisible: false,
    });
  }
  

  //确定操作
  handleOk = () => {
    const { dispatch,form:{validateFields}} = this.props;

    validateFields((err,values) =>{
      if(!err){
        dispatch({
          type:"cards/addOne",
          payload:values,
        });
        // 重置 `visible` 属性为 false 以关闭对话框
        this.setState({ visible:false })
      }
    })

  }


  componentDidMount() {
    this.props.dispatch({
      type: 'cards/queryList',
    });
  }


  render() {
    const { visible,statisticVisible,id } = this.state;
    //getFieldDecorator 是用于将包裹的组件与表单进行双向绑定使用
    const { form: { getFieldDecorator },statistic } = this.props;

    const { cardsList, cardsLoading } = this.props;
    // const { /* ... */ statisticVisible, id } = this.state;
    // const { /* ... */ statistic } = this.props;   

    return (
      <div>
        <Table columns={this.columns} dataSource={cardsList} loading={cardsLoading} rowKey="id" />
        <Button onClick={this.showModal}>新建</Button>
        <Modal 
        title="新建记录" 
        visible={visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        >
          <Form>
            <FormItem label="名称">
              {getFieldDecorator('name', {
                rules: [{ required: true }],
              })(
                <Input />
              )}
            </FormItem>
            <FormItem label="描述">
              {getFieldDecorator('desc')(
                <Input />
              )}
            </FormItem>
            <FormItem label="链接">
              {getFieldDecorator('url', {
                rules: [{ type: 'url' }],
              })(
                <Input />
              )}
            </FormItem>
          </Form>
        </Modal>
        <Modal visible={statisticVisible} footer={null} onCancel={this.handleStatisticCancel}>
        <SampleChart data={statistic[id]} />
        </Modal>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    cardsList: state.cards.cardsList,
    cardsLoading: state.loading.effects['cards/queryList'],
    statistic: state.cards.statistic,
  };
}

export default connect(mapStateToProps)(Form.create()(List));