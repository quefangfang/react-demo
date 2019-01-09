import * as types from './action-type';

// 设置全局loading
export const setLoading = value => {
  return {
    type: types.SETLOADING,
    value
  };
};
// 设置侧栏选中
export const setMenuAction = (datatype, value) => {
  return {
    type: types.SETMENUACTION,
    value,
    datatype
  };
};
