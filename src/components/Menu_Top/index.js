import { AuditOutlined, HomeOutlined, DashboardOutlined, DollarOutlined, SettingOutlined, TeamOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import React from 'react';
import ReactDOM from 'react-dom';

const { SubMenu } = Menu;

class Menu_Top extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {
        current: 'client',
    };

    handleClick = e => {
        const KeyMapRouter = {
            "dashboard": `/forwarder/${e.key}/project_summary`,
            "warehouse": `/forwarder/${e.key}/ship`,
            "order": `/forwarder/${e.key}/draft`,
            "client": `/forwarder/${e.key}/activated`,
        }
        this.props.history.push(KeyMapRouter[e.key])
        console.log('click ', e);
        // this.setState({
        //     current: e.key,
        // });
    };

    render() {
        return (
            <Menu
                // style={{   display: 'inline-block', }}
                onClick={this.handleClick}
                style={{ display: 'inline-block', fontSize: 16, lineHeight: '63px' }}
                // selectable ={false}
                selectedKeys={[this.props.current_selected]}

                mode="horizontal">
                <Menu.Item key="dashboard">
                <DashboardOutlined />工作台
                    {/* <a href="http://localhost:8081/forwarder/dashboard/project_summary" >
                    
                        </a> */}

                </Menu.Item>
                <Menu.Item key="order" >
                    <AuditOutlined />
                    订单管理
                </Menu.Item>
                <Menu.Item key="warehouse"  >
                    <HomeOutlined />
                    仓库管理
                </Menu.Item>
                <Menu.Item key="client" >
                    <TeamOutlined />
                    客户管理
                </Menu.Item>
                <Menu.Item key="wallet" >
                    <DollarOutlined />
                    财务中心
                </Menu.Item>
                <Menu.Item key="setting" >
                    <SettingOutlined />
                    设置中心
                </Menu.Item>
            </Menu>
        );
    }
}

export default Menu_Top