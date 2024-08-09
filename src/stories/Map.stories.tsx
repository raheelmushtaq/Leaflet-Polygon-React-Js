// src/stories/Map.stories.tsx
import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import Map from '../components/Map';

export default {
  title: 'Map',
  component: Map,
} as Meta;

const Template: StoryFn = (args) => <Map {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const WithPolygons = Template.bind({});
WithPolygons.args = {
  polygons: [
    [[51.505, -0.09], [51.51, -0.1], [51.52, -0.12], [51.505, -0.09]],
  ],
};
