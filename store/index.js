import axiosClient from '~~/axios';
import axios from 'axios';
import { createStore } from 'vuex';
import api from '@/data.json';

const store = createStore({
  state: {
    user: {
      data: {},
      // id: "KUAJERLJ", //dev
      // id: "KUAJERIS", //motion
      id: "KUAJEP4F", //des
      role: 2, //teamlead
      // group_id: "KX724IUQ", //dev
      // group_id: "KX724M7F", //motion
      group_id: "KX724M7I", //des
      // brands: "Coral Sports,Coral Gaming,Coral Retail,Ladbrokes Sports,Ladbrokes Gaming,Ladbrokes Retail",
      brands: "Coral Sports,Coral Gaming,Coral Retail,Ladbrokes Sports,Ladbrokes Gaming,Ladbrokes Retail,Cheeky,Foxy Bingo,Foxy Games,Gala Bingo,Gala Casino,Gala Spins,bwin Sports,bwin Casino,PartyCasino,PartyPoker,PartySports,PartyGaming",
    },
    grp: {
      data: {}
    },
    userDB: {
      data: {}
    },
    userAPI: {
      data: {}
    },
    group: {
      data: {}
    },
    role: {
      data: api.role
    },
    // brands: {
    //   data: api.brands
    // }
    brands: {
      data: {}
    }
  },
  getter: {},
  actions: {
    getGroupsData({ commit }) {
      return axiosClient.get(`/groups`)
        .then((res) => {
          commit('setGroupsData', res.data.data)
          return res;
        })
        .catch(err => {
          console.log(err);
          return err;
        })
    },
    getGroup({ commit }, id) {
      return axiosClient.get(`/groups/${id}`)
        .then((res) => {
          commit('setGroup', res.data.data)
          return res;
        })
        .catch(err => {
          return err;
        })
    },
    getUserData({ commit }, id) {
      return axiosClient.get(`/contacts/${id}`)
        .then((res) => {
          commit('setUserData', res.data.data)
          return res;
        })
        .catch(err => {
          return err;
        })
    },
    getBrands({ commit }) {
      return axiosClient.get(`/customfields/IEADVMHZJUABUJGM`)
        .then((res) => {
          commit('setBrands', res.data.data.map((s) => s.settings).map((v) => v.values).flat())
          return res;
        })
        .catch(err => {
          return err;
        })
    },
    getUserinDB({ commit }) {
      return axios.get('http://localhost:8000/users')
        .then((res) => {
          commit('setUserinDB', res.data)
          return res;
        })
        .catch(err => {
          console.log(err);
          return err;
        })
    },
  },
  mutations: {
    setGroupsData: (state, data) => {
      state.group.data = data;
    },
    setGroup: (state, data) => {
      state.grp.data = data;
    },
    setUserData: (state, data) => {
      state.userAPI.data = data;
    },
    setBrands: (state, data) => {
      state.brands.data = data;
    },
    setUser: (state, userData) => {
      state.user.group_id = userData.group_id
      sessionStorage.setItem('GROUP', userData.group_id)
    },
    setUserinDB: (state, data) => {
      state.userDB.data = data;
    }
  }
});

export default store;