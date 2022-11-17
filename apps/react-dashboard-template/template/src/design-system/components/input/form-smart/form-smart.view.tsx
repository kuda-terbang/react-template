import React from 'react';
import Button from '@mui/material/Button';
import { useForm } from 'react-hook-form';
import type { UseFormProps, SubmitHandler, FieldValues } from 'react-hook-form';
import { styled } from '@mui/material';

type FormProps<TFieldValues extends FieldValues> = {
  propsForm?: UseFormProps<TFieldValues>;
  children: React.ReactElement | React.ReactElement[];
  onSubmit: SubmitHandler<TFieldValues>;
};
const StyledContainerForm = styled('div')`
  display: flex;
  flex-direction: column;
  column-gap: 8px;
`;

const Form = <TFieldValues extends FieldValues>({
  propsForm,
  children,
  onSubmit,
}: FormProps<TFieldValues>) => {
  const methods = useForm(propsForm);
  const { handleSubmit } = methods;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <StyledContainerForm>
        {React.Children.map(children, (child) => {
          return child.props.name
            ? React.createElement(child.type, {
                ...{
                  ...child.props,
                  methods,
                  key: child.props.name,
                },
              })
            : child;
        })}
      </StyledContainerForm>
      <div>
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
};
export default Form;
