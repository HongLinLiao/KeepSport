import useGeneral from '@/hooks/context/useGeneral';
import { MenuOutlined } from '@ant-design/icons';
import { Typography } from 'antd';

const Header = () => {
  const { setDrawer } = useGeneral();

  return (
    <div className="flex justify-between items-center p-5">
      <Typography.Title level={1} className="!mb-0">
        Keep Sport
      </Typography.Title>
      <MenuOutlined
        className="w-[30px] h-[30px] text-[30px] p-2  text-white border border-solid border-gray-600 rounded-md"
        onClick={() => setDrawer(true)}
      />
    </div>
  );
};

export default Header;
