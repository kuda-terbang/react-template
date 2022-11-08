import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import ImageIcon from '@mui/icons-material/Image';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { styled } from '@mui/material/styles';
import type { DropFilesProps, AcceptedFile } from './drop-files.type';
import { humanFileSize } from '../../../utils/textFormatter';

const Rows = styled('div')`
  display: flex;
  flex-direction: column;
`;
const RowContainer = styled('div')`
  display: flex;
  flex-direction: row;
  flex: 1;
  border-radius: 2;
  border: 1px solid #eaeaea;
  padding: 1rem;
`;
const RowIcon = styled('div')`
  padding-right: 0.5rem;
`;
const RowContent = styled('div')`
  display: flex;
  flex-direction: column;
  flex: 1;
`;
const RowActions = styled('div')``;
const IconButtonRemove = styled(IconButton)`
  height: 3rem;
  width: 3rem;
`;
type Props = {
  files: AcceptedFile[];
  onClickRemove: DropFilesProps['onClickRemove'];
};

const RowView = ({ files, onClickRemove }: Props) => {
  const actions = [
    {
      icon: (rowIndex: number, rowFile: AcceptedFile) => (
        <IconButtonRemove
          onClick={(e) => onClickRemove?.(rowIndex, rowFile, e)}
          size="small"
        >
          <DeleteIcon fontSize="medium" />
        </IconButtonRemove>
      ),
    },
  ];
  return (
    <Rows>
      {files.map((file, index) => (
        <RowContainer key={`${file.name}-${index}`}>
          <RowIcon>
            {file.type.includes('image') ? (
              <ImageIcon fontSize="medium" />
            ) : (
              <UploadFileIcon fontSize="medium" />
            )}
          </RowIcon>
          <RowContent>
            <span>{file.name}</span>
            <span>{humanFileSize(file.size, true)}</span>
          </RowContent>
          <RowActions>
            {actions.map((action) => action.icon(index, file))}
          </RowActions>
        </RowContainer>
      ))}
    </Rows>
  );
};

export default RowView;
