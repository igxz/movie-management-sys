import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Table, Spin, Switch, Button, Popconfirm, message } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';
import { IMovie } from '../services/MovieService';
import defaultPosterImg from '../assets/defaultposter.png';
import { SwitchType } from '../services/CommonTypes';
import { NavLink } from 'react-router-dom';

interface IMovieTableProps {
  onSwitchChange: (
    checked: boolean,
    movieId: string,
    switchType: SwitchType
  ) => void;
  onDelete: (movieId: string) => Promise<void>;
}

const posterStyle: React.CSSProperties = {
  width: '2em',
  border: '2px solid #eee',
};

const MovieTable: React.FC<IMovieTableProps> = ({
  onSwitchChange,
  onDelete,
}) => {
  // Select the necessary data from the Redux store
  const data = useSelector((state: RootState) => state.movie.data);
  const isLoading = useSelector((state: RootState) => state.movie.isLoading);

  // Define columns using useMemo to avoid recalculating on every render
  const columns = useMemo<ColumnsType<IMovie>>(
    () => [
      {
        title: 'Poster',
        dataIndex: 'poster',
        key: 'poster',
        render: (poster) => (
          <img style={posterStyle} src={poster || defaultPosterImg} />
        ),
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
        render: (_, record) => (
          <Switch
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            checked={record.isPopular}
            onChange={(newValue) =>
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              onSwitchChange(newValue, record._id!, SwitchType.isPopular)
            }
          />
        ),
      },
      {
        title: 'Classic',
        dataIndex: 'isClassic',
        key: 'isClassic',
        render: (_, record) => (
          <Switch
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            checked={record.isClassic}
            onChange={(newValue) =>
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              onSwitchChange(newValue, record._id!, SwitchType.isClassic)
            }
          />
        ),
      },
      {
        title: 'Coming Soon',
        dataIndex: 'isComing',
        key: 'isComing',
        render: (_, record) => (
          <Switch
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            checked={record.isComing}
            onChange={(newValue) =>
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              onSwitchChange(newValue, record._id!, SwitchType.isComing)
            }
          />
        ),
      },
      {
        title: 'Edit',
        dataIndex: '_id',
        key: '_id',
        render: (id) => (
          <div>
            <NavLink to={'/movie/edit/' + id}>
              <Button type='primary' size='small'>
                Edit
              </Button>
            </NavLink>
            <Popconfirm
              title='Delete the movie'
              description='Are you sure to delete this movie?'
              onConfirm={async () => {
                await onDelete(id);
                message.success('Moive deleted successfully!');
              }}
              okText='Yes'
              cancelText='No'
            >
              <Button type='primary' danger size='small'>
                Delete
              </Button>
            </Popconfirm>
          </div>
        ),
      },
    ],
    []
  ); // Empty dependency array because columns do not depend on props or state

  if (isLoading) {
    return <Spin tip='Loading' size='large' />;
  }

  return (
    <div>
      <h2>Movie List Page</h2>

      <Table dataSource={data} columns={columns} rowKey='_id' />
    </div>
  );
};

export default MovieTable;
