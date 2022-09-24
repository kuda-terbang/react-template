import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import ImageIcon from '@mui/icons-material/Image';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import styled from 'styled-components';
import type { DropFilesProps, AcceptedFile } from './drop-files.type';

const Rows = styled.div`
  display: flex;
  flex-direction: column;
`
const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  border-radius: 2;
  border: 1px solid #eaeaea;
  padding: 1rem;
`
const RowIcon = styled.div`
  padding-right: 0.5rem;
`
const RowContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`
const RowActions = styled.div``
const IconButtonRemove = styled(IconButton)`
  height: 3rem;
  width: 3rem;
`
type Props = {
  files: AcceptedFile[]
  onClickRemove: DropFilesProps['onClickRemove']
}

/**
 * Format bytes as human-readable text.
 *
 * @param bytes Number of bytes.
 * @param si True to use metric (SI) units, aka powers of 1000. False to use
 *           binary (IEC), aka powers of 1024.
 * @param dp Number of decimal places to display.
 *
 * @return Formatted string.
 */
 export const humanFileSize = (bytes: number, si = false, dp = 1) => {
  const thresh = si ? 1000 : 1024;

  if (Math.abs(bytes) < thresh) {
    return bytes + ' B';
  }

  const units = si
    ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
  let u = -1;
  const r = 10**dp;

  do {
    bytes /= thresh;
    ++u;
  } while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1);


  return bytes.toFixed(dp) + ' ' + units[u];
}

const RowView = ({ files, onClickRemove }: Props) => {
  const actions = [
    {
      icon: (rowIndex: number, rowFile: AcceptedFile) => (
        <IconButtonRemove onClick={(e) => onClickRemove?.(rowIndex, rowFile, e)} size="small">
          <DeleteIcon fontSize='medium' />
        </IconButtonRemove>
      )
    }
  ]
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
  )
}

export default RowView
