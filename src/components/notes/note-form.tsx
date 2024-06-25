import { Form } from '../ui/form'
import {z} from 'zod';
import { FormTextInput } from '../form/form-text-input';
import { useForm } from 'react-hook-form';
import {zodResolver} from "@hookform/resolvers/zod";
import NoteEditor from './note-editor';
import { Button } from '../ui/button';

type P = {
  defaultValues?: z.infer<typeof noteFormSchema>;
  onSubmit: any;
}

export const noteFormSchema = z.object({
  title: z.string().min(1, "Title shouldn't be empty"),
  data: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
})

export type NoteForm = z.infer<typeof noteFormSchema>;

const DEFAULT_VALUES: NoteForm = {
  title: '',
  data: '',
  createdAt: new Date(),
  updatedAt: new Date(),
}

export default function NoteForm({onSubmit, defaultValues}: P) {

  const form = useForm({
    mode: "onChange",
    resolver: zodResolver(noteFormSchema),
    defaultValues: defaultValues || DEFAULT_VALUES,
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col space-y-4'>
        <FormTextInput name="title" label="Title" form={form}/>
        <NoteEditor 
          defaultValue={defaultValues?.data}
          onChange={(data: any) => form.setValue('data', data)} />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
