export const SET_PAGINATION_DATA = 'SET_PAGINATION_DATA';

export function onSetPaginationData(data) {
  return {
    type: SET_PAGINATION_DATA,
    data,
  };
}