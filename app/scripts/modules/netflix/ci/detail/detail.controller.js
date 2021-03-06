'use strict';

const angular = require('angular');

module.exports = angular
  .module('spinnaker.netflix.ci.detail.controller', [
    require('angular-ui-router'),
    require('../build.read.service.js'),
    require('core/scheduler/scheduler.factory'),
  ])
  .controller('CiDetailCtrl', function ($scope, $state, $stateParams, buildService, schedulerFactory) {
    this.viewState = {
      isDownloadable: () => $state.params.tab === 'output',
      isRunning: false
    };

    let getDetails = () => {
      buildService.getBuildDetails($stateParams.buildId).then((response) => {
        if ($state.includes('**.ci.detail')) {
          $state.go('.detailTab', {buildId: $stateParams.buildId, tab: 'output'}, {location: 'replace'});
        }
        this.build = response;
        this.viewState.isRunning = response.completionStatus === 'INCOMPLETE';
      });
    };

    let activeRefresher = schedulerFactory.createScheduler(1000);
    activeRefresher.subscribe(() => {
      if (this.viewState.isRunning) {
        getDetails();
      }
    });

    this.downloadLink = buildService.getBuildRawLogLink($stateParams.buildId);
    getDetails();

    $scope.$on('$destroy', () => activeRefresher.unsubscribe());
  });
