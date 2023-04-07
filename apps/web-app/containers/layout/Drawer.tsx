import useGeneral from '@/hooks/useGeneral';
import useLineLogin from '@/hooks/useLineLogin';
import { Button, Drawer as AntDrawer, Typography } from 'antd';

const Drawer = () => {
  const { userInfo, isDrawerOpen, setDrawer } = useGeneral();
  const { redirectToOAuth } = useLineLogin();

  return (
    <AntDrawer
      title={
        userInfo ? (
          <>
            <Typography>Hi {userInfo.userName}!</Typography>
            <Button>Logout</Button>
          </>
        ) : (
          <Button onClick={redirectToOAuth}>SignIn</Button>
        )
      }
      placement={'right'}
      width={250}
      onClose={() => setDrawer(false)}
      open={isDrawerOpen}
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
