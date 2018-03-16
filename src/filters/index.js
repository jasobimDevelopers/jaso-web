export function spliteWords(words, count) {
  if (words && words.length > count) {
    words = `${words.substring(0, count)}...`;
  }
  return words;
}

// file root
export function setFileRoot(url) {
  const fileRoot = 'http://jasobim.com/';

  return `${fileRoot}${url}`;
}

// user role name map
export const roleList = ['管理员', '普通用户', '投资方', '项目人员/项目负责人'];
export function setUserRole(userType) {
  return roleList[userType];
}

// user system
export const systemTypeList = ['安装人员', '土建人员'];
export function setUserSystem(systemType) {
  return systemTypeList[systemType];
}

// work name
export const workNameList = [
  {
    name: '项目员工',
    list: ['技术员', '材料员', '质量员', '安全员', '施工员', '资料员', '机管员', '钢筋翻样员', '木工翻样员', '技术负责人', '安装负责人'],
  },
  {
    name: '公司内部员工',
    list: ['技术科长', '技术主管', '研发人员', '预算主管', '总经理', '副总经理', '质安科长', '预算员', '预算科长', '生产经理', '市场助理', '质量员'],
  },
  {
    name: '其他',
    list: ['管理员', '普通用户', '投资方', '项目人员/项目负责人', '项目经理', '常务经理', '土建负责人', 'BIM工程师'],
  },
];

// project stats list
export const projectStateList = [
  '未上线',
  '已上线',
];

// item
export const itemProfessionTypeList = ['全部', '电气', '暖通', '给排水', '消防'];
export const householdNumList = ['全部', '公共部位', 'N户型', 'Q户型', 'Q户型反', 'N户型反'];

// question
export const questionOfTypeList = ['全部', '安全', '质量', '其他'];
export const questionOfPriorityList = ['全部', '一般', '重要', '紧急'];
export const questionStateList = ['全部', '待解决', '已解决'];

// quantity
export const quantityTypeList = ['模型工程量', '预算工程量'];

// paper
export const paperProfessionTypeList = ['全部', '电气', '暖通', '给排水', '消防', '建筑', '装饰', '结构'];

// teach
export const teachTypeList = ['全部', '质量', '安全', '技术'];
