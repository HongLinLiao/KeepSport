import { Button, Drawer as AntDrawer } from 'antd';
import { FC } from 'react';

type Props = {
  open: boolean;
  onClose: () => void;
};

const Drawer: FC<Props> = ({ open, onClose }) => {
  return (
    <AntDrawer
      title={
        <>
          <Button>SignIn</Button>
          <Button>Logout</Button>
        </>
      }
      placement={'right'}
      width={250}
      onClose={onClose}
      open={open}
      closable={false}
      maskClosable
      // extra={
      //   <Space>
      //     <Button onClick={onClose}>Cancel</Button>
      //     <Button type="primary" onClick={onClose}>
      //       OK
      //     </Button>
      //   </Space>
      // }
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </AntDrawer>
  );
};

export default Drawer;
