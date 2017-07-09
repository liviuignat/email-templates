import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import {asyncConnect} from 'redux-async-connect';
import {initialize as initializeForm, startSubmit} from 'redux-form';
import {push as pushState} from 'react-router-redux';
import config from 'universal/../config';
import {
  getProjectDetailByIdAction,
  insertTemplateAction,
  updateTemplateAction,
  deleteTemplateAction,
  insertLayoutAction,
  updateLayoutAction,
  deleteLayoutAction
} from 'universal/redux/reducers/currentProject/actionCreators';
import {GenericList, Breadcrumbs} from 'universal/components';
import TemplatesList from './TemplatesList';
import LayoutsList from './LayoutsList';

@asyncConnect([{
  promise: ({params: {projectId}, store: {dispatch}}) =>
    dispatch(getProjectDetailByIdAction(projectId))
}])
@connect(
  ({currentProject: {project}}) => ({
    project,
    projectId: project.objectId,
    templates: project.templates,
    layouts: project.layouts
  }), {
    pushState,
    initializeForm,
    startSubmit,
    getProjectDetailByIdAction,
    insertTemplateAction,
    updateTemplateAction,
    deleteTemplateAction,
    insertLayoutAction,
    updateLayoutAction,
    deleteLayoutAction
  })
export default class ProjectDetailPage extends Component {
  static propTypes = {
    projectId: PropTypes.string.isRequired,
    project: PropTypes.object,
    templates: PropTypes.array,
    layouts: PropTypes.array,
    pushState: PropTypes.func.isRequired,
    initializeForm: PropTypes.func.isRequired,
    startSubmit: PropTypes.func.isRequired,
    insertTemplateAction: PropTypes.func.isRequired,
    updateTemplateAction: PropTypes.func.isRequired,
    deleteTemplateAction: PropTypes.func.isRequired,
    insertLayoutAction: PropTypes.func.isRequired,
    updateLayoutAction: PropTypes.func.isRequired,
    deleteLayoutAction: PropTypes.func.isRequired
  };

  render() {
    const { project, templates, layouts } = this.props;
    const {isTranslationsEnabled} = config.app;

    return (
      <div>
        <Helmet title={`maildoodle - ${project.name} project`} />
        <Breadcrumbs links={[{
          text: `projects`,
          href: `/app/projects`
        }, {
          text: `project details`
        }]}/>

        <TemplatesList
          project={project}
          templates={templates}
          pushState={this.props.pushState}
          initializeForm={this.props.initializeForm}
          startSubmit={this.props.startSubmit}
          insertTemplateAction={this.props.insertTemplateAction}
          updateTemplateAction={this.props.updateTemplateAction}
          deleteTemplateAction={this.props.deleteTemplateAction} />

        <LayoutsList
          project={project}
          layouts={layouts}
          pushState={this.props.pushState}
          initializeForm={this.props.initializeForm}
          startSubmit={this.props.startSubmit}
          insertLayoutAction={this.props.insertLayoutAction}
          updateLayoutAction={this.props.updateLayoutAction}
          deleteLayoutAction={this.props.deleteLayoutAction} />

        {isTranslationsEnabled && <GenericList subheader="languages"
          items={project.languages}
          onEditPressed={() => {}}
          onDeletePressed={() => {}}
          onAddPressed={() => {}}
          onRowClick={() => {}}
          primaryText={(item) => item.key}
          secondaryText={(item) => item.name}/>}
      </div>
    );
  }
}
