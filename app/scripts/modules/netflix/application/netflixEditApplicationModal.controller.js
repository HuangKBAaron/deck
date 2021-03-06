/*
 * Copyright 2015 Netflix, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

import _ from 'lodash';

let angular = require('angular');
import PagerDutyFieldModule from '../pagerDuty/pagerDutySelectField.component';
import PagerDutyTagModule from '../pagerDuty/pagerDutyTag.component';

module.exports = angular
  .module('spinnaker.netflix.application.edit.modal.controller', [
    require('angular-ui-router'),
    require('core/application/service/applications.write.service.js'),
    require('core/account/account.service.js'),
    PagerDutyFieldModule,
    PagerDutyTagModule
  ])
  .controller('netflixEditApplicationController', function($controller, $window, $state, $uibModalInstance, application, applicationWriter,
                                                            accountService) {

    if (application.attributes.legacyUdf === undefined) {
      application.attributes.legacyUdf = true;
    }
    angular.extend(this, $controller('EditApplicationController', {
      $window: $window,
      $state: $state,
      $uibModalInstance: $uibModalInstance,
      application: application,
      applicationWriter: applicationWriter,
      _ : _,
      accountService: accountService,
    }));

  });
