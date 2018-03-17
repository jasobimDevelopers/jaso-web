import { getProject, getBuildingInfo } from '@/api/projectManage';

const project = {
  state: {
    info: null,
    building: null,
  },
  mutations: {
    SET_PROJECT: (state, info) => {
      state.info = info;
    },
    SET_BUILDING_INFO: (state, info) => {
      state.building = info;
    },
  },
  actions: {
    getBuildingInfo({ commit }, payload) {
      const { id } = payload;
      return new Promise((resolve, reject) => {
        getBuildingInfo({
          projectId: id,
        }).then((res) => {
          const { data } = res;
          const { buildingNum } = data;
          const buildingList = [];
          for (let i = 1; i <= buildingNum; i += 1) {
            buildingList.push(i);
          }

          data.buildingList = buildingList;
          commit('SET_BUILDING_INFO', data);

          resolve(data);
        }).catch((error) => {
          reject(error);
        });
      });
    },
    getProject({ commit }, payload) {
      const { id } = payload;
      return new Promise((resolve, reject) => {
        getProject({
          projectId: id,
        }).then((res) => {
          const { data } = res;
          commit('SET_PROJECT', data);

          resolve(data);
        }).catch((error) => {
          reject(error);
        });
      });
    },
  },
};

export default project;
