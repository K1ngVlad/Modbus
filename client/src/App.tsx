import type { FC } from 'react';

import { TagChart } from './components';

export const App: FC = () => {
  return (
    <TagChart
      tagNames={['Атмосферное давление', 'ds']}
      deviceNames={['Относительная влажность', 'Комбайн']}
    />
  );
};
