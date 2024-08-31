import React, { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Table, Switch, Button, Popconfirm, message, Input, Space } from 'antd';
import { CheckOutlined, CloseOutlined, SearchOutlined } from '@ant-design/icons';
import { ColumnsType, TablePaginationConfig } from 'antd/es/table';
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
  onChange: (newPage: number) => void;
  onSearchKeyChange: (keyword: string) => void;
  onSearch: ()=> void;
}

const posterStyle: React.CSSProperties = {
  width: '2em',
  border: '2px solid #eee',
};

const MovieTable: React.FC<IMovieTableProps> = ({
  onSwitchChange,
  onDelete,
  onChange,
  onSearchKeyChange,
  onSearch,
}) => {
  // Select the necessary data from the Redux store
  const movieRecordState = useSelector((state: RootState) => state.movie);
  const data = useSelector((state: RootState) => state.movie.data);
  const isLoading = useSelector((state: RootState) => state.movie.isLoading);

  const handleChange = useCallback(
    (pagination: TablePaginationConfig) => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      onChange(pagination.current!);
    },
    [onChange]
  );

  const getPaginationConfig = useCallback(():
    | TablePaginationConfig
    | false
    | undefined => {
    if (movieRecordState.total === 0) {
      return false;
    }
    return {
      position: ['bottomRight'],
      current: movieRecordState.searchCriteria.page,
      pageSize: movieRecordState.searchCriteria.limit,
      total: movieRecordState.total,
      showTotal: (total, range) => `${range[0]}-${range[1]} of ${total}`,
      showQuickJumper: true,
    };
  }, [movieRecordState]);

  const getSearchDropdown = useCallback(() => {
    // console.log(props);
    return (
      <div style={{ padding: 8 }} >
        <Input
          style={{ marginBottom: 8, display: 'block' }}
          value={movieRecordState.searchCriteria.key}
          onChange={ e => {
            onSearchKeyChange(e.target.value);
          }}
          onPressEnter={onSearch}
        />
        <Space>
          <Button
            type="primary"
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
            onClick={onSearch}
          >
            Search
          </Button>
          <Button
            size="small"
            style={{ width: 90 }}
            onClick={() => {
              onSearchKeyChange('');
              onSearch();
            }}
          >
            Reset
          </Button>
        </Space>
      </div>
    );
  }, [movieRecordState.searchCriteria.key, onSearchKeyChange, onSearch]);

  // Define columns using useMemo to avoid recalculating on every render
  const columns = useMemo<ColumnsType<IMovie>>(
    () => [
      {
        title: 'Poster',
        dataIndex: 'poster',
        key: 'poster',
        render: (poster) => (
          <img
            alt='movie_poster'
            style={posterStyle}
            src={poster || defaultPosterImg}
          />
        ),
      },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        filterDropdown: getSearchDropdown,
        filterIcon: (filtered: boolean) => (
          <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
        ),
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
    [onDelete, onSwitchChange, getSearchDropdown]
  ); // Empty dependency array because columns do not depend on props or state

  // if (isLoading) {
  //   return <Spin tip='Loading' size='large' fullscreen/>;
  // }

  return (
    <div>
      <Table
        dataSource={data}
        columns={columns}
        rowKey='_id'
        pagination={getPaginationConfig()}
        onChange={handleChange}
        loading={{ spinning: isLoading, size: 'large' }} // 'delay' property doesn't work
      />
    </div>
  );
};

export default MovieTable;
