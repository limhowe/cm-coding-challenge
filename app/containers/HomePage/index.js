import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import {
  Segment,
  Table,
  Header,
  Container,
  Dimmer,
  Loader,
  Dropdown,
  Icon,
  Button,
} from 'semantic-ui-react';
import Pagination from 'components/Pagination';
import TextFilter from 'components/Filter/TextFilter';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import { dataListRequest } from './actions';
import reducer from './reducer';
import saga from './saga';

import { makeSelectDataList, makeSelectDataListLoading } from './selectors';

const pageSizeOptions = [
  { key: 1, text: '10', value: 10 },
  { key: 2, text: '25', value: 25 },
  { key: 3, text: '50', value: 50 },
];

const filedSorter = (field, order) => (a, b) => (order ? a.get(field) - b.get(field) : b.get(field) - a.get(field));

class DataListPage extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      page: 1,
      pageSize: 10,
      searchKeyword: '',
      sortField: 'id',
      sortOrder: true,
    };
  }

  componentDidMount() {
    const { dataList } = this.props;
    dataList();
  }

  onChangePage = (page) => {
    this.setState({ page });
  };

  handleChangePageSize = (e, { value }) => {
    this.setState({ pageSize: value, page: 1 });
  };

  onChangeFilter = (filterName, value) => {
    this.setState({ [filterName]: value });
  };

  renderData = (data) => {
    const { page, pageSize } = this.state;

    if (!data.size) {
      return (
        <Table.Row>
          <Table.Cell colSpan="7">NO DATA</Table.Cell>
        </Table.Row>
      );
    }

    return data.slice((page - 1) * pageSize, page * pageSize).map((item) => (
      <Table.Row key={item.get('id')}>
        <Table.Cell>{item.get('id')}</Table.Cell>
        <Table.Cell>{item.get('title')}</Table.Cell>
        <Table.Cell>{item.get('year')}</Table.Cell>
        <Table.Cell>{item.get('description')}</Table.Cell>
      </Table.Row>
    ));
  };

  changeSort(sortField) {
    const { sortField: currSortField, sortOrder } = this.state;
    if (sortField === currSortField) {
      this.setState({
        sortOrder: !sortOrder,
      });
    } else {
      this.setState({
        sortField,
      });
    }
  }

  render() {
    const { data, loading } = this.props;
    const {
      page, pageSize, searchKeyword, sortField, sortOrder
    } = this.state;

    let filteredData = data.filter(
      (item) => item
        .get('id')
        .toLowerCase()
        .search(searchKeyword.toLowerCase()) !== -1
        || item
          .get('title')
          .toLowerCase()
          .search(searchKeyword.toLowerCase()) !== -1
        || item
          .get('year')
          .toLowerCase()
          .search(searchKeyword.toLowerCase()) !== -1
        || item
          .get('description')
          .toLowerCase()
          .search(searchKeyword.toLowerCase()) !== -1
    );

    filteredData = filteredData.sort(filedSorter(sortField, sortOrder));

    const iconName = sortOrder ? 'caret up' : 'caret down';

    return (
      <Container>
        <Dimmer active={loading}>
          <Loader />
        </Dimmer>
        <Segment>
          <Header as="h4" content="Filter" dividing color="teal" />
          <TextFilter
            searchKeyword={searchKeyword}
            onChange={this.onChangeFilter}
          />
        </Segment>

        <Dropdown
          onChange={this.handleChangePageSize}
          options={pageSizeOptions}
          placeholder="Choose page size"
          selection
          value={pageSize}
        />
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>
                <Button
                  icon
                  labelPosition="right"
                  onClick={() => this.changeSort('id')}
                >
                  #{sortField === 'id' && <Icon name={iconName} />}
                </Button>
              </Table.HeaderCell>
              <Table.HeaderCell>
                <Button
                  icon
                  labelPosition="right"
                  onClick={() => this.changeSort('title')}
                >
                  TITLE
                  {sortField === 'title' && <Icon name={iconName} />}
                </Button>
              </Table.HeaderCell>
              <Table.HeaderCell>
                <Button
                  icon
                  labelPosition="right"
                  onClick={() => this.changeSort('year')}
                >
                  YEAR
                  {sortField === 'year' && <Icon name={iconName} />}
                </Button>
              </Table.HeaderCell>
              <Table.HeaderCell>DESCRIPTION</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>{this.renderData(filteredData)}</Table.Body>

          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan="7">
                <Pagination
                  total={filteredData.size}
                  currentPage={page}
                  onChange={this.onChangePage}
                  perPage={pageSize}
                />
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
      </Container>
    );
  }
}

DataListPage.propTypes = {
  dataList: PropTypes.func.isRequired,
  data: PropTypes.any.isRequired,
  loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  data: makeSelectDataList(),
  loading: makeSelectDataListLoading(),
});

const mapDispatchToProps = {
  dataList: dataListRequest,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: 'home', reducer });
const withSaga = injectSaga({ key: 'home', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(DataListPage);
