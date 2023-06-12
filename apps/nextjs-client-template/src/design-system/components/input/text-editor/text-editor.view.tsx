import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import React, { Component } from 'react';
import ReactQuillComponent from 'react-quill';
import type { FormControlProps } from '@mui/material';

type ReactQuillProps = React.ComponentProps<typeof ReactQuillComponent>;
type TextEditorProps = ReactQuillProps & {
  formControlProps?: FormControlProps;
  label: string;
};

// image modules not implemented yet
const defaultModules: ReactQuillProps['modules'] = {
  toolbar: [
    ['bold', 'italic', 'underline', 'strike'], // toggled buttons
    ['blockquote', 'code-block'],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
    [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
    [{ direction: 'rtl' }], // text direction

    [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],

    ['clean'], // remove formatting button
    ['link'],
  ],
};

class TextEditor extends Component<
  TextEditorProps,
  {
    quill: typeof ReactQuillComponent;
  }
> {
  constructor(props: TextEditorProps) {
    super(props);
    if (document) {
      this.quill = require('react-quill');
    }
  }
  quill: typeof ReactQuillComponent | null = null;

  override render() {
    const ReactQuill = this.quill;
    if (ReactQuill) {
      const { formControlProps, label, modules = defaultModules, ...props } = this.props;
      return (
        <FormControl {...formControlProps}>
          <FormLabel>{label}</FormLabel>
          <ReactQuill {...props} modules={modules} theme="snow" />
        </FormControl>
      );
    } else {
      return null;
    }
  }
}

export default TextEditor;
