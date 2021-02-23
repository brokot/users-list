import React, { Component } from 'react';
import {
  Button,
  ButtonGroup,
  Link,
  Stack,
} from '@shopify/polaris';

export default class Paginator extends Component {
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return nextProps.page != this.props.page || nextProps.totalPages != this.props.totalPages;
  }

  handlePagination(page) {
    if (page == this.props.page) {
      return false;
    }
    this.props.changePage && this.props.changePage(page);
  }

  render() {
    let pages = parseInt(this.props.totalPages);

    if (!pages || pages <= 0) return null;

    let current_page = parseInt(this.props.page || 1);
    let next_page = this.props.totalPages > this.props.page && current_page + 1;

    let low_limit = current_page - 2;
    let high_limit = current_page + 2;

    let first_available_page = low_limit > 1 ? low_limit : 1;
    let last_available_page = high_limit < pages ? high_limit : pages;

    let prevAvailable = current_page > 1;
    let nextAvailable = next_page && true;

    let page_nums = [];
    for (let i = first_available_page; i <= last_available_page; i++) {
      page_nums.push(
        <Button
          key={`page-${i}`}
          size="slim"
          pressed={current_page == i}
          onClick={this.handlePagination.bind(this, i)}
        >
          {i}
        </Button>
      );
    }

    let pager = <nav className='pagination'>
      {prevAvailable && <Button size="slim" onClick={this.handlePagination.bind(this, 1)}>‹‹ First</Button>}
      {prevAvailable && <Button size="slim" onClick={this.handlePagination.bind(this, current_page - 1)}>‹ Prev</Button>}

      {first_available_page != 1 && <Button size="slim">...</Button>}

      {page_nums.map(function(object, i){
        return page_nums[i]
      })}

      {last_available_page != pages && <Button size="slim">...</Button>}

      {nextAvailable && <Button size="slim" onClick={this.handlePagination.bind(this, next_page)}>Next ›</Button>}
      {nextAvailable && <Button size="slim" onClick={this.handlePagination.bind(this, pages)}>Last ››</Button>}
    </nav>;

    return (
      <Stack distribution="center">
        <ButtonGroup>
          {pager}
        </ButtonGroup>
      </Stack>
    )
  }
};