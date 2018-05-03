import axios from 'axios';
import { getToken } from '@/utils/auth';
import request, { apiRoot, config } from './request';

export function getMechanicList(params) {
  return request.get('api/mechanic/getMechanicList', {
    params,
  });
}

export function addMechanic(params) {
  const formData = new FormData();

  for (const key in params) {
    if (params[key] != null) {
      formData.append(key, params[key]);
    }
  }

  formData.append('token', getToken());

  return axios.post(`${apiRoot}/api/mechanic/addMechanic`, formData, config);
}

export function updateMechanic(params) {
  const formData = new FormData();

  for (const key in params) {
    if (params[key] != null) {
      formData.append(key, params[key]);
    }
  }

  formData.append('token', getToken());

  return axios.post(`${apiRoot}/api/mechanic/updateMechanic`, formData, config);
}

export function deleteMechanic(params) {
  return request.get('api/mechanic/deleteMechanic', {
    params,
  });
}

export function getProjectHour(params) {
  return request.get('api/project/admin/getProjectHour', {
    params,
  });
}

export function getMechanicPriceList(params) {
  return request.get('api/mechanicPrice/getMechanicPriceList', {
    params,
  });
}

export function addMechanicPriceList(params) {
  const formData = new FormData();

  for (const key in params) {
    if (params[key] != null) {
      formData.append(key, params[key]);
    }
  }

  formData.append('token', getToken());

  return axios.post(`${apiRoot}/api/mechanicPrice/addMechanicPriceList`, formData, config);
}


export function updateWorkHour(params) {
  const formData = new FormData();

  for (const key in params) {
    if (params[key] != null) {
      formData.append(key, params[key]);
    }
  }

  formData.append('token', getToken());

  return axios.post(`${apiRoot}/api/project/visitor/updateWorkHour`, formData, config);
}

export function updateMechanicPrice(params) {
  const formData = new FormData();

  for (const key in params) {
    if (params[key] != null) {
      formData.append(key, params[key]);
    }
  }

  formData.append('token', getToken());

  return axios.post(`${apiRoot}/api/mechanicPrice/updateMechanicPrice`, formData, config);
}

export function getMechanicPriceNum(params) {
  return request.get('api/mechanicPrice/getMechanicPriceNum', {
    params,
  });
}
