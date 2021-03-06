import * as actions from './actions';

export function getTemplateDetailByIdAction(projectId, templateId) {
  return {
    types: [actions.LOAD_TEMPLATE_DETAIL, actions.LOAD_TEMPLATE_DETAIL_SUCCESS, actions.LOAD_TEMPLATE_DETAIL_FAIL],
    promise: (client) => {
      const url = `/projects/${projectId}/templates/${templateId}`;
      return client.get(url);
    }
  };
}

export function updateTemplateDevelopmentVersion(projectId, templateId, version) {
  return {
    types: [actions.UPDATE_DEVELOPMENT_VERSION, actions.UPDATE_DEVELOPMENT_VERSION_SUCCESS, actions.UPDATE_DEVELOPMENT_VERSION_FAIL],
    promise: (client) => {
      const url = `/projects/${projectId}/templates/${templateId}/versions/development`;
      return client.post(url, {data: version});
    }
  };
}

export function promoteTemplateToProductionVersion(projectId, templateId, version) {
  return {
    types: [actions.PROMOTE_PRODUCTION_VERSION, actions.PROMOTE_PRODUCTION_VERSION_SUCCESS, actions.PROMOTE_PRODUCTION_VERSION_FAIL],
    promise: (client) => {
      const url = `/projects/${projectId}/templates/${templateId}/versions/production`;
      return client.post(url, {data: version});
    }
  };
}

export function changeProductionVersion(projectId, templateId, versionId) {
  return {
    types: [actions.CHANGE_PRODUCTION_VERSION, actions.CHANGE_PRODUCTION_VERSION_SUCCESS, actions.CHANGE_PRODUCTION_VERSION_FAIL],
    promise: (client) => {
      const url = `/projects/${projectId}/templates/${templateId}/versions/${versionId}`;
      return client.put(url);
    }
  };
}

export function loadTemplateVersion(versionId) {
  return {
    types: [actions.LOAD_VERSION_FROM_HISTORY, actions.LOAD_VERSION_FROM_HISTORY_SUCCESS, actions.LOAD_VERSION_FROM_HISTORY_FAIL],
    promise: () => {
      return Promise.resolve({
        objectId: versionId
      });
    }
  };
}
