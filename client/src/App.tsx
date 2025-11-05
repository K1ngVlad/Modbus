import { useState, type FC } from 'react';
import {
  MultiSelect,
  MultiSelectItem,
  Select,
  SelectItem,
} from '@tremor/react';

import { TagChart } from './components';

export const App: FC = () => {
  const [devices, setDevices] = useState<string[]>(['Мультиварка']);

  const [tag, setTag] = useState<string>('Относительная влажность');

  return (
    <>
      <MultiSelect onValueChange={setDevices} value={devices}>
        <MultiSelectItem value="Мультиварка">Мультиварка</MultiSelectItem>
        <MultiSelectItem value="Комбайн">Комбайн</MultiSelectItem>
        <MultiSelectItem value="Кофемашина">Кофемашина</MultiSelectItem>
        <MultiSelectItem value="Фен">Фен</MultiSelectItem>
        <MultiSelectItem value="Домофон">Домофон</MultiSelectItem>
        <MultiSelectItem value="Пейджер">Пейджер</MultiSelectItem>
      </MultiSelect>
      <Select onValueChange={setTag} value={tag}>
        <SelectItem value="Время">Время</SelectItem>
        <SelectItem value="Атмосферное давление">
          Атмосферное давление
        </SelectItem>
        <SelectItem value="Температура">Температура</SelectItem>
        <SelectItem value="Относительная влажность">
          Относительная влажность
        </SelectItem>
      </Select>
      <TagChart
        // tagNames={[]}
        deviceNames={devices}
        tagNames={[tag]}
        // deviceNames={['Мультиварка', 'Комбайн']}
      />
    </>
  );
};
