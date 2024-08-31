import { PlusOutlined } from '@ant-design/icons';
import { UploadFile, message, Image } from 'antd';
import Upload from 'antd/es/upload/Upload';
import axios from 'axios';
import React, { useCallback, useMemo, useState } from 'react';
import { IResponseData, IResponseError } from '../services/CommonTypes';

interface IImgUploaderProps {
  url?: string;
  onChange?: (imgUrl: string) => void;
}

const uploadButton = (
  <button style={{ border: 0, background: 'none' }} type='button'>
    <PlusOutlined />
    <div style={{ marginTop: 8 }}>Upload</div>
  </button>
);

const ImgUploader: React.FC<IImgUploaderProps> = (props) => {
  const [preview, setPreview] = useState(false);
  const [previewImageUrl, setPreviewImageUrl] = useState('');

  const getUploadedImage = useMemo(() => {
    if (props.url) {
      return null;
    } else {
      return uploadButton;
    }
  }, [props.url]);

  const getFileList = useMemo((): UploadFile[] => {
    if (props.url) {
      return [
        {
          url: props.url,
          uid: props.url,
          name: props.url,
        },
      ];
    } else {
      return [];
    }
  }, [props.url]);

  const handleRequest = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async (p: any) => {
      try {
        const formData = new FormData();
        formData.append(p.filename, p.file);

        // Using axios to make the POST request
        const response = await axios.post<
          IResponseData<string> | IResponseError
        >(p.action, formData);

        const resp = response.data;

        if (resp.error) {
          // If there's an error in the response
          message.error('Upload failed! ' + resp.error);
        } else {
          // Trigger the callback with the received data
          if(props.onChange) {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            props.onChange(resp.data!);
          } 
        }
      } catch (error) {
        // Handle any unexpected errors during the request
        message.error('Upload failed!' + error);
      }
    },
    [props]
  );

  const handlePreview = useCallback(() => {
    // set preview to true
    setPreview(true);
    // set preview url
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    setPreviewImageUrl(props.url!);
  },[props.url]);

  return (
    <>
      <Upload
        action='/api/upload'
        name='imgfile'
        accept='image/png,image/jpg'
        listType='picture-card'
        fileList={getFileList}
        customRequest={handleRequest}
        onRemove={() => {
          if(props.onChange){
            props.onChange('');
          }
        }}
        onPreview={handlePreview}
      >
        {getUploadedImage}
      </Upload>
      {previewImageUrl && (
        <Image
          alt=''
          src={previewImageUrl}
          wrapperStyle={{ display: 'none' }}
          preview={{
            visible: preview,
            onVisibleChange: (visible) => setPreview(visible),
            afterOpenChange: (visible) => !visible && setPreviewImageUrl(''),
          }}
        />
      )}
    </>
  );
};

export default ImgUploader;
