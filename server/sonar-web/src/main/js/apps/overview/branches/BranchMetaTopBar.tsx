/*
 * SonarQube
 * Copyright (C) 2009-2024 SonarSource SA
 * mailto:info AT sonarsource DOT com
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 3 of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program; if not, write to the Free Software Foundation,
 * Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 */
import { SeparatorCircleIcon } from 'design-system';
import React from 'react';
import { useIntl } from 'react-intl';
import { formatMeasure } from '~sonar-aligned/helpers/measures';
import { getCurrentPage } from '../../../app/components/nav/component/utils';
import ComponentReportActions from '../../../components/controls/ComponentReportActions';
import HomePageSelect from '../../../components/controls/HomePageSelect';
import { findMeasure } from '../../../helpers/measures';
import { Branch } from '../../../types/branch-like';
import { MetricKey, MetricType } from '../../../types/metrics';
import { Component, MeasureEnhanced } from '../../../types/types';
import { HomePage } from '../../../types/users';

interface Props {
  component: Component;
  branch: Branch;
  measures: MeasureEnhanced[];
}

export default function BranchMetaTopBar({ branch, measures, component }: Readonly<Props>) {
  const intl = useIntl();

  const currentPage = getCurrentPage(component, branch) as HomePage;
  const locMeasure = findMeasure(measures, MetricKey.ncloc);

  const leftSection = (
    <h1 className="sw-flex sw-gap-2 sw-items-center sw-heading-md">{branch.name}</h1>
  );
  const rightSection = (
    <div className="sw-flex sw-gap-2 sw-items-center">
      {locMeasure && (
        <>
          <div className="sw-flex sw-items-center sw-gap-1">
            <strong>{formatMeasure(locMeasure.value, MetricType.ShortInteger)}</strong>
            {intl.formatMessage({ id: 'metric.ncloc.name' })}
          </div>
          <SeparatorCircleIcon />
        </>
      )}
      {component.version && (
        <>
          <div className="sw-flex sw-items-center sw-gap-1">
            {intl.formatMessage({ id: 'version_x' }, { '0': <strong>{component.version}</strong> })}
          </div>
          <SeparatorCircleIcon />
        </>
      )}
      <HomePageSelect currentPage={currentPage} type="button" />
      <ComponentReportActions component={component} branch={branch} />
    </div>
  );

  return (
    <div className="sw-flex sw-justify-between sw-whitespace-nowrap sw-body-sm sw-mb-2">
      {leftSection}
      {rightSection}
    </div>
  );
}
