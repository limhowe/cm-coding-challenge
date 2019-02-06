import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react';

const TextFilter = ({ searchKeyword, onChange }) => (
  <Form>
    <Form.Input
      label="Search"
      type="text"
      value={searchKeyword}
      onChange={(e) => onChange('searchKeyword', e.target.value)}
    />
  </Form>
);

TextFilter.propTypes = {
  searchKeyword: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default TextFilter;
