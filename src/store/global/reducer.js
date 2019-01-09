import * as types from './action-type';

let defaultState = {
    globalLoading: false, // 全局loading
    menuActive: {
        selectedKey: [],
        openKeys: []
    }, // 侧栏选中
    companyData: [] // 企业信息
};
// 全局rudex数据
export const globalData = (state = defaultState, action = {}) => {
    switch (action.type) {
        case types.SETLOADING:
            return { ...state, ...{ globalLoading: action.value } };
        case types.SETMENUACTION:
            console.log({ [action.datatype]: action.value })
            return { ...state, ...{ [action.datatype]: action.value } };
        case types.SET_COMPANY_DATA:
            return { ...state, ...{ companyData: action.data } };
        default:
            return state;
    }
};