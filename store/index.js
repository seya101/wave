import axiosClient from '~~/axios';
import axios from 'axios';
import { createStore } from 'vuex';
import api from '@/data.json';

const store = createStore({
  state: {
    user: {
      data: {},
      id: "KUAJEBBA",
      role: 3,
      group_id: "KX724IUQ",
      brands: "Coral Sports,Coral Gaming,Coral Retail,Ladbrokes Sports,Ladbrokes Gaming,Ladbrokes Retail,Cheeky,Foxy Bingo,Foxy Games,Gala Bingo,Gala Casino,Gala Spins,bwin Sports,bwin Casino",
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
    brands: {
      data: api.brands
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
    setUserData: (state, data) => {
      state.userAPI.data = data;
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