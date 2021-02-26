export const SET_DELETING = 'SET_DELETING';
export const SET_FILTER_DATA = 'SET_FILTER_DATA';
export const SET_LOADING = 'SET_LOADING';
export const SET_MESSAGE = 'SET_MESSAGE';
export const SET_PAGINATION_DATA = 'SET_PAGINATION_DATA';
export const SET_SAVING = 'SET_SAVING';

export function onSetDeleting(deleting) {
  return {
    type: SET_DELETING,
    deleting,
  };
}

export function onSetFilterData(data) {
  return {
    type: SET_FILTER_DATA,
    data,
  };
}

export function onSetLoading(loading) {
  return {
    type: SET_LOADING,
    loading,
  };
}

export function onSetMessage(content, error) {
  return {
    type: SET_MESSAGE,
    content,
    error
  };
}

export function onSetPaginationData(data) {
  return {
    type: SET_PAGINATION_DATA,
    data,
  };
}

export function onSetSaving(saving) {
  return {
    type: SET_SAVING,
    saving,
  };
}
