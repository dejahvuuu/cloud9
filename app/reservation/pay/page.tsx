import FormInput from '@/components/form/FormInput';
import FormContainer from '@/components/form/FormContainer';
import { createPropertyAction } from '@/utils/actions';
import { SubmitButton } from '@/components/form/Buttons';

function CreateProperty() {
  return (
    <section>
      <h1 className='text-2xl font-semibold mb-8 capitalize'>
        Pay reservation
      </h1>
      <div className='border p-8 rounded-md'>
        <h3 className='text-lg mb-4 font-medium'>General Info</h3>
        <FormContainer action={createPropertyAction}>
          <div className='grid md:grid-cols-2 gap-8 mb-4'>
            <FormInput
              name='name'
              type='text'
              label='Name (20 limit)'
              defaultValue='Your name'
            />
            <FormInput
              name='checkin'
              type='date'
              label=''
              defaultValue=''
            />
          </div>
          <SubmitButton text='Pay Reservation' className='mt-12' />
        </FormContainer>
      </div>
    </section>
  );
}
export default CreateProperty;