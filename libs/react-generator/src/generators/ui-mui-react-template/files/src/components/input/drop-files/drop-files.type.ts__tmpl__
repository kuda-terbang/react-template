import type { DropEvent, FileRejection } from 'react-dropzone';
import type { DropzoneOptions } from 'react-dropzone';

export type AcceptedFile = File & {
  preview: string;
};

export type DropFilesProps = {
  componentType?: 'thumbnail' | 'row';
  dropzoneOptions?: DropzoneOptions;
  labelDragAccept?: string;
  labelDragActive: string;
  labelDragReject?: string;
  onChange: (
    acceptedFiles: AcceptedFile[],
    fileRejections?: FileRejection[],
    event?: DropEvent
  ) => void;
  onClickSubmit?: (files: AcceptedFile[]) => void;
  onClickRemove?: (
    index: number,
    file: AcceptedFile,
    e?: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  textButtonSelect?: string;
  textButtonSubmit?: string;
  value?: AcceptedFile[];
};
