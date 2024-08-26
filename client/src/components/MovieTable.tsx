import React, { useMemo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../redux/store';
import { Table, Spin, Switch } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';
import { IMovie } from '../services/MovieService';
import  { updateMovieToggleProperties } from "../redux/thunks/MovieThunks";
import defaultPosterImg from '../assets/defaultposter.png';
import { SwitchType } from '../services/CommonTypes';

const posterStyle: React.CSSProperties = {
    width: '2em',
    border: '2px solid #eee',
  };

const MovieTable: React.FC = () => {
  // Select the necessary data from the Redux store
  const data = useSelector((state: RootState) => state.movie.data);
  const isLoading = useSelector((state: RootState) => state.movie.isLoading);
  const dispatch = useAppDispatch();

  // Memoized function to handle switch changes
  const handleSwitchChange = useCallback(
    (checked: boolean, movieId: string, switchType: SwitchType) => {
      dispatch(updateMovieToggleProperties(checked, movieId, switchType));
    },
    [dispatch]
  );

  // Define columns using useMemo to avoid recalculating on every render
  const columns = useMemo<ColumnsType<IMovie>>(
    () => [
      {
        title: 'Poster',
        dataIndex: 'poster',
        key: 'poster',
        render: (poster) => <img style={posterStyle} src={poster || defaultPosterImg} />,
      },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Type',
        dataIndex: 'types',
        key: 'types',
        render: (types: string[]) => types.join(', '), // Custom rendering for array of types
      },
      {
        title: 'Show Regions',
        dataIndex: 'showRegions',
        key: 'showRegions',
        render: (regions: string[]) => regions.join(', '), // Custom rendering for array of types
      },
      {
        title: 'Show Time',
        dataIndex: 'showTimeInMinutes',
        key: 'showTimeInMinutes',
        render: (showTime) => `${showTime} Mins`, 
      },
      {
        title: 'Blockbuster',
        dataIndex: 'isPopular',
        key: 'isPopular',
        render: (_, record) => (<Switch
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            checked={record.isPopular}
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            onChange={(newValue) => handleSwitchChange(newValue, record._id!, SwitchType.isPopular)}
          />)
      },
      {
        title: 'Classic',
        dataIndex: 'isClassic',
        key: 'isClassic',
        render: (_, record) => (<Switch
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            checked={record.isClassic}
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            onChange={(newValue) => handleSwitchChange(newValue, record._id!, SwitchType.isClassic)}
          />)
      },
      {
        title: 'Coming Soon',
        dataIndex: 'isComing',
        key: 'isComing',
        render: (_, record) => (<Switch
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            checked={record.isComing}
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            onChange={(newValue) => handleSwitchChange(newValue, record._id!, SwitchType.isComing)}
          />)
      },
    ],
    []
  ); // Empty dependency array because columns do not depend on props or state

  if (isLoading) {
    return <Spin tip="Loading" size="large" />;
  }

  return (
    <div>
      <h2>Movie List Page</h2>

      <Table dataSource={data} columns={columns} rowKey='_id' />
    </div>
  );
};

export default MovieTable;
