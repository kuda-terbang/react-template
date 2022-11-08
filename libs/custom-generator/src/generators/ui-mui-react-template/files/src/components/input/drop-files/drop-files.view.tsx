import {useEffect} from 'react';
import Button from '@mui/material/Button'
import {useDropzone} from 'react-dropzone';
import { styled } from '@mui/material/styles';
import RowFiles from './row.view'
import Thumbnails from './thumbnails.view'
import type { DropFilesProps } from './drop-files.type';

type ContainerProps = {
  isDragAccept: boolean
  isDragReject: boolean
  isFocused: boolean
}
const getColor = (props: ContainerProps) => {
  if (props.isDragAccept) {
      return '#00e676';
  }
  if (props.isDragReject) {
      return '#ff1744';
  }
  if (props.isFocused) {
      return '#2196f3';
  }
  return '#eeeeee';
}

const Container = styled('div')<ContainerProps>`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 2px;
  border-color: ${props => getColor(props)};
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  outline: none;
  transition: border .24s ease-in-out;
`;

const DropFiles = ({
  componentType = 'thumbnail',
  dropzoneOptions,
  labelDragAccept,
  labelDragActive,
  labelDragReject,
  onChangeFile,
  onClickSubmit,
  onClickRemove,
  textButtonSelect,
  textButtonSubmit,
  value,
}: DropFilesProps) => {
  const {
    getRootProps,
    getInputProps,
    isDragAccept,
    isDragReject,
    isFocused,
    open: openDialogFiles,
  } = useDropzone({
    ...dropzoneOptions,
    noClick: true,
    noKeyboard: true,
    onDrop: (acceptedFiles, ...otherProps) => {
      onChangeFile(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })), ...otherProps);
    }
  });

  const handleClickSubmit = () => {
    onClickSubmit(value)
  }

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => value.forEach(file => file.preview && URL.revokeObjectURL(file.preview));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section>
      <Container {...getRootProps({isFocused, isDragAccept, isDragReject})}>
        <input {...getInputProps()} />
        <p>{labelDragActive}</p>
        <Button variant="contained" onClick={openDialogFiles}>
          {textButtonSelect || 'Select Files'}
        </Button>
        {(isDragAccept && !!labelDragAccept) && <p>{labelDragAccept}</p>}
        {(isDragReject && !!labelDragReject) && <p>{labelDragReject}</p>}
      </Container>
      {componentType === 'thumbnail' ? (
        <Thumbnails
          files={value}
          onClickRemove={onClickRemove}
        />
      ) : (
        <RowFiles files={value} onClickRemove={onClickRemove} />
      )}
      <Button variant="contained" onClick={handleClickSubmit}>{textButtonSubmit || 'Submit'}</Button>
    </section>
  );
}

export default DropFiles
