import useAuthCtx from '@/hooks/context/useAuth';
import useGeneral from '@/hooks/context/useGeneral';
import useAuth from '@/hooks/useAuth';
import useLineLogin from '@/hooks/useLineLogin';
import { Avatar, Button, Drawer as AntDrawer, Typography } from 'antd';

const Drawer = () => {
  const { isDrawerOpen, setDrawer } = useGeneral();
  const { userInfo } = useAuthCtx();
  const { redirectToOAuth } = useLineLogin();
  const { signOut } = useAuth();

  const onSignOutClick = () => {
    signOut();
    setDrawer(false);
  };

  return (
    <AntDrawer
      title={
        userInfo ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Avatar src={userInfo.avatar} className="mr-2" />
              <Typography.Title className="!mb-0" level={5}>
                {userInfo.userName}
              </Typography.Title>
            </div>
            <Button onClick={onSignOutClick}>Logout</Button>
          </div>
        ) : (
          <Button onClick={redirectToOAuth}>SignIn</Button>
        )
      }
      placement="right"
      width={250}
      onClose={() => setDrawer(false)}
      open={isDrawerOpen}
      closable={false}
      maskClosable
    ></AntDrawer>
  );
};

export default Drawer;
