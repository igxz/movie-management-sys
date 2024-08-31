import {
  Button,
  Form,
  Input,
  Checkbox,
  InputNumber,
  Switch,
  message,
} from 'antd';
import React, { useCallback, useEffect } from 'react';
import { IMovie } from '../services/MovieService';
import ImgUploader from './ImgUploader';
import { useNavigate } from 'react-router-dom';

interface IMovieFormProps {
  onSubmit: (obj: IMovie) => Promise<string>;
  movie?: IMovie;
}

const formItemLayout = {
  labelCol: { span: 8 },
  rapperCol: { span: 16 },
};

const submitButtonLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const RegionGroups = Checkbox.Group;
const availableRegions: { label: string; value: string }[] = [
  { label: 'USA', value: 'USA' },
  { label: 'Asia', value: 'Asia' },
  { label: 'Euro', value: 'Euro' },
  { label: 'Pacific', value: 'Pacific' },
];

const TypeGroups = Checkbox.Group;
const types: { label: string; value: string }[] = [
  { label: 'Thriller', value: 'Thriller' },
  { label: 'Disaster', value: 'Disaster' },
  { label: 'Comedy', value: 'Comedy' },
  { label: 'Action', value: 'Action' },
];

const DescInput = Input.TextArea;

const MovieForm: React.FC<IMovieFormProps> = ({ onSubmit, movie }) => {

  const navigate = useNavigate();
  const [form] = Form.useForm(); // 创建表单实例

  useEffect(() => {
    if (movie) {
      form.setFieldsValue(movie); // 在 movie 数据加载完成后手动设置表单字段值
    }
  }, [movie, form]);

  const handleSubmit = useCallback(
    async (val: IMovie) => {
      // console.log(val);
      const error = await onSubmit(val);
      if (!error) {
        const opt = movie ? 'updated' : 'added';
        message.success(`movie ${opt} successfully!`, 1, () => {
          // Jump to moive list page
          navigate('/movie');
        });
      } else {
        message.error('movie add failed!' + error);
      }
    },
    [onSubmit, navigate, movie]
  );

  // handle cancel when user changes mind
  const handleCancel = useCallback(() => {
    form.resetFields(); // reset form fields
    navigate('/movie'); // jump to movie list page
  }, [navigate, form]);

  return (
    <Form
      name='basic'
      form={form} // set fiels data
      {...formItemLayout}
      style={{ maxWidth: 600 }}
      onFinish={handleSubmit}
      onFinishFailed={(error) => console.log(error)}
      autoComplete='off'
    //   initialValues={movie}
    >
      <Form.Item<IMovie>
        label='name'
        name='name'
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<IMovie>
        label='Poster'
        name='poster'
        valuePropName='url'
        rules={[]}
      >
        <ImgUploader />
      </Form.Item>

      <Form.Item<IMovie>
        label='Regions'
        name='showRegions'
        rules={[
          { required: true, message: 'Please select at least one region ' },
        ]}
      >
        <RegionGroups options={availableRegions} />
      </Form.Item>

      <Form.Item<IMovie>
        label='Types'
        name='types'
        rules={[{ required: true, message: 'Please select movie type(s)' }]}
      >
        <TypeGroups options={types} />
      </Form.Item>

      <Form.Item<IMovie>
        label='Length (mins)'
        name='showTimeInMinutes'
        rules={[
          {
            required: true,
            message: 'Please add length of movie show-time in minutes',
          },
        ]}
      >
        <InputNumber min={1} step={10} />
      </Form.Item>

      <Form.Item<IMovie>
        label='Blockbuster'
        name='isPopular'
        initialValue={false}
      >
        <Switch />
      </Form.Item>

      <Form.Item<IMovie> label='Classic' name='isClassic' initialValue={false}>
        <Switch />
      </Form.Item>

      <Form.Item<IMovie>
        label='Coming soon'
        name='isComing'
        initialValue={false}
      >
        <Switch />
      </Form.Item>

      <Form.Item<IMovie> label='Description' name='description'>
        <DescInput rows={5} placeholder='add movie description here...' />
      </Form.Item>

      <Form.Item {...submitButtonLayout}>
        <Button type='primary' htmlType='submit'>
          Submit
        </Button>
        <Button
          style={{ marginLeft: '10px' }}
          onClick={handleCancel}
        >Cancel</Button>
      </Form.Item>
    </Form>
  );
};

export default MovieForm;
