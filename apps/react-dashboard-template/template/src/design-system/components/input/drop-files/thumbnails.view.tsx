import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import type { DropFilesProps, AcceptedFile } from './drop-files.type';

const ThumbnailsContainer = styled('aside')`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 16;
  gap: 1rem;
`;
const ThumbnailContainer = styled('div')`
  display: inline-flex;
  border-radius: 2;
  border: 1px solid #eaeaea;
  margin-bottom: 8;
  margin-right: 8;
  width: 100px;
  height: 100px;
  padding: 4;
  box-sizing: border-box;
  position: relative;
`;
const ThumbnailInner = styled('div')`
  display: flex;
  min-width: 0;
  overflow: hidden;
`;
const ThumbnailImage = styled('img')`
  display: block;
  width: auto;
  height: 100%;
`;
const ThumbnailButtonRemove = styled(IconButton)`
  height: 20px;
  position: absolute;
  top: 0;
  right: 0;
  width: 20px;
`;

type ThumbnailProps = {
  file: AcceptedFile;
  index: number;
  onClickRemove: DropFilesProps['onClickRemove'];
};

const Thumbnail = ({ index, file, onClickRemove }: ThumbnailProps) => {
  let thumbnailComponent = <p>{file.name}</p>;
  if (file.type.includes('image')) {
    thumbnailComponent = (
      <ThumbnailImage
        alt={`${file.name}-${index}`}
        src={file.preview}
        onLoad={() => {
          URL.revokeObjectURL(file.preview);
        }}
      />
    );
  }
  return (
    <ThumbnailContainer>
      <ThumbnailInner>{thumbnailComponent}</ThumbnailInner>
      <ThumbnailButtonRemove onClick={(e) => onClickRemove?.(index, file, e)} size="small">
        <CloseIcon fontSize="inherit" />
      </ThumbnailButtonRemove>
    </ThumbnailContainer>
  );
};

type ThumbnailViewProps = {
  files: AcceptedFile[];
  onClickRemove: DropFilesProps['onClickRemove'];
};
const ThumbnailView = ({ files, onClickRemove }: ThumbnailViewProps) => {
  return (
    <ThumbnailsContainer>
      {files.map((file, index) => (
        <Thumbnail key={file.name} file={file} index={index} onClickRemove={onClickRemove} />
      ))}
    </ThumbnailsContainer>
  );
};

export default ThumbnailView;
