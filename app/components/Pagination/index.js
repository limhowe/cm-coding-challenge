import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon, Menu } from 'semantic-ui-react';

class Pagination extends Component {
  onPageChange = (pageNum) => () => {
    const { onChange } = this.props;
    onChange(pageNum);
  };

  onFirst = () => {
    this.onPageChange(1)();
  };

  onLast = () => {
    this.onPageChange(this.pageCount)();
  };

  onPrev = () => {
    const { currentPage } = this.props;
    this.onPageChange(currentPage - 1)();
  };

  onNext = () => {
    const { currentPage } = this.props;
    this.onPageChange(currentPage + 1)();
  };

  get pageCount() {
    const { total, perPage } = this.props;
    return Math.ceil(total / perPage) || 1;
  }

  renderPages = () => {
    const { currentPage } = this.props;
    const { pageCount } = this;

    let currMax = currentPage + 1;
    let currMin = currentPage - 1;

    if (currMin < 1) {
      currMax += 1;
      currMin += 1;
    }

    if (currMax > pageCount) {
      currMin -= (currMax - pageCount);
      currMax = pageCount;
    }

    currMin = Math.max(currMin, 1);

    return new Array(currMax - currMin + 1).fill().map((val, index) => {
      const pageNum = currMin + index;
      return (
        <Menu.Item
          key={`page_${pageNum}`}
          active={pageNum === currentPage}
          onClick={this.onPageChange(pageNum)}
        >
          {`${pageNum}`}
        </Menu.Item>
      );
    });
  };

  render() {
    const { currentPage } = this.props;
    const { pageCount } = this;

    return (
      <Menu floated="right" pagination>
        <Menu.Item
          as="a"
          icon
          disabled={currentPage === 1}
          onClick={this.onFirst}
        >
          <Icon name="angle double left" />
        </Menu.Item>
        <Menu.Item as="a" icon disabled={currentPage < 2} onClick={this.onPrev}>
          <Icon name="angle left" />
        </Menu.Item>
        {this.renderPages()}
        <Menu.Item
          as="a"
          icon
          disabled={currentPage + 1 > pageCount}
          onClick={this.onNext}
        >
          <Icon name="angle right" />
        </Menu.Item>
        <Menu.Item
          as="a"
          icon
          disabled={currentPage === pageCount}
          onClick={this.onLast}
        >
          <Icon name="angle double right" />
        </Menu.Item>
      </Menu>
    );
  }
}

Pagination.propTypes = {
  total: PropTypes.number,
  perPage: PropTypes.number,
  currentPage: PropTypes.number,
  onChange: PropTypes.func,
};

Pagination.defaultProps = {
  total: 0,
  perPage: 8,
  currentPage: 1,
  onChange: () => {},
};

export default Pagination;
