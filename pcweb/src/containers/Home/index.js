import React from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import { Layout } from "antd";

import { signout } from "../../actions";
import Loadable from "react-loadable";
const MyLoadingComponent = ({ isLoading, error }) => {
  if (isLoading) {
    return <div>Loading...</div>;
  } else if (error) {
    return <div>Sorry, there was a problem loading the page.</div>;
  } else {
    return null;
  }
};

const Navbar = Loadable({
  loader: () => import("./Navbar"),
  loading: MyLoadingComponent
});
const Sidebar = Loadable({
  loader: () => import("./Sidebar"),
  loading: MyLoadingComponent
});
const Users = Loadable({
  loader: () => import("../Users/index"),
  loading: MyLoadingComponent
});
const Goods = Loadable({
  loader: () => import("../Goods/index"),
  loading: MyLoadingComponent
});
const CategoryFirst = Loadable({
  loader: () => import("../CategoryFirst/index"),
  loading: MyLoadingComponent
});
const Orders = Loadable({
  loader: () => import("../Orders/index"),
  loading: MyLoadingComponent
});
const Dashboard = Loadable({
  loader: () => import("../Dashboard/index"),
  loading: MyLoadingComponent
});
const Advs = Loadable({
  loader: () => import("../Advs/index"),
  loading: MyLoadingComponent
});
const Administrators = Loadable({
  loader: () => import("../Administrators"),
  loading: MyLoadingComponent
});
const OrderRefund = Loadable({
  loader: () => import("../OrderRefund/index"),
  loading: MyLoadingComponent
});
const OrderDispatch = Loadable({
  loader: () => import("../OrderDispatch/index"),
  loading: MyLoadingComponent
});

@connect(
  state => ({
    adminId: state.auth.admin.adminId,
    token: state.auth.admin.token
  }),
  dispatch => ({
    signout: () => dispatch(signout())
  })
)
export default class Home extends React.Component {
  state = {
    collapsed: false,
    superLevel: true
  };

  handleLogout = () => {
    this.props.signout();
  };

  toggleCollapse = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  render() {
    const superLevel = this.state.superLevel;

    return (
      <div className="page page-home">
        <Layout>
          <Sidebar collapsed={this.state.collapsed} permission={superLevel} />
          <Layout>
            <Navbar
              collapsed={this.state.collapsed}
              handleClick={this.toggleCollapse}
              signout={this.handleLogout}
            />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/users" component={Users} />
            <Route path="/goods" component={Goods} />
            <Route path="/category/first" component={CategoryFirst} />
            <Route path="/orders" component={Orders} />
            <Route path="/order/refund" component={OrderRefund} />
            <Route path="/order/dispatch" component={OrderDispatch} />
            <Route path="/advertisments" component={Advs} />
            <Route path="/admins" component={Administrators} />
            {/* <Route paht="/admins" component={Administrators} /> */}
          </Layout>
        </Layout>
      </div>
    );
  }
}
