import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchCategories, fetchAllCategorySecond } from "../actions";
import { Select, Spin } from "antd";

const Option = Select.Option;

@connect(
  state => ({
    firstIsFetching: state.categories.first.isFetching,
    categoryFirst: state.categories.first.categories
  }),
  dispatch => ({
    fetchCategoryFirst: () => dispatch(fetchCategories())
  })
)
export default class CategorySelector extends React.Component {
  static defaultProps = {
    isFetching: PropTypes.bool.isRequired,
    categoryFirst: PropTypes.array.isRequired,
    allItem: PropTypes.bool.isRequired,
    level: PropTypes.oneOf(["first", "second"])
  };

  constructor(props) {
    super(props);
    const value = this.props.value || "";
    this.state = {
      value
    };
  }

  componentDidMount() {
    this.fetchCategories();
  }

  fetchCategories = () => {
    const { level } = this.props;

    if (level === "first") {
      this.props.fetchCategoryFirst();
    }
  };

  componentWillReceiveProps(nextProps) {
    // Should be a controlled component.
    if ("value" in nextProps) {
      const value = nextProps.value;
      this.setState({
        value
      });
    }
  }

  handleChange = value => {
    if (!("value" in this.props)) {
      this.setState(value);
    }
    this.triggerChange(value);
  };

  handleBlur = () => {
    console.log("blur");
  };

  handleFocus = () => {
    console.log("focus");
  };

  triggerChange = changedValue => {
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(changedValue);
    }
  };

  renderCategory = () => {
    const { level, categoryFirst } = this.props;

    if (level === "first") {
      return categoryFirst.map(item => (
        <Option value={item.categoryFirstId} key={item.categoryFirstId}>
          {item.categoryName}
        </Option>
      ));
    } else {
    }
  };

  render() {
    const { categoryFirst, isFetching, level, allItem } = this.props;
    const value = this.state.value;

    const categories = level === "first" ? categoryFirst : "";

    if (categories.length === 0) {
      return (
        <Spin>
          <Select defaultValue="1" style={{ width: 120 }} allowClear disabled>
            <Option value="1">正在获取数据</Option>
          </Select>
        </Spin>
      );
    } else {
      // const defaultValue = categories.length != 0 ? categories[0] : ""
      return (
        <Select
          showSearch
          style={{ width: 200 }}
          // placeholder="请选择一个分类"
          value={value}
          optionFilterProp="children"
          onChange={this.handleChange}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
            0
          }
        >
          {allItem ? (
            <Option value="all" key={-1}>
              全部
            </Option>
          ) : (
            ""
          )}
          {this.renderCategory()}
        </Select>
      );
    }
  }
}
