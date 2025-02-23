import _ from 'lodash';

export const ideas = _.times(100, (i) => ({
  nick: `Cool-idea-${i}`,
  name: `Idea ${i}`,
  description: `description ${i}`,
  text: _.times(100, (j) => `<p>Text paragraph ${j} of ${i}...</p>`).join(''),
}));
