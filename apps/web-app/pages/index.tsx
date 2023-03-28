import useGeneral from '@/hooks/useGeneral';
import { Card, Button } from 'antd';

export function Index() {
  const ctx = useGeneral();

  return (
    <>
      <Card
        title="Default size card"
        extra={<a href="#">More</a>}
        style={{ width: 300 }}
      >
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
      </Card>
      <Card style={{ width: 'max-content' }}>
        <Button onClick={ctx.toggleDarkMode}>Change Theme</Button>
      </Card>
    </>
  );
}

export default Index;
