import SummaryType from '@/enums/SummaryType';
import { Card } from 'antd';
import { FC } from 'react';

type Props = {
  type: SummaryType;
};

const SummaryCard: FC<Props> = ({ type }) => {
  return (
    <Card>
      <p>{type.capitalize()}</p>
      <p>Card content</p>
      <p>Card content</p>
      <p>Card content</p>
    </Card>
  );
};

export default SummaryCard;
