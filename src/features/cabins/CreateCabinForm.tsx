import { FieldErrors, FieldValues, useForm } from "react-hook-form";
import { useCreateCabin } from "./useCreateCabin";


import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import { useEditCabin } from "./useEditCabin";


  function CreateCabinForm({cabinToEdit = {}, onCloseModal} : {cabinToEdit: {}, onCloseModal?: () => void }) {
    const {isEditting, editCabin} = useEditCabin();
    const {isCreating, createCabin} = useCreateCabin();
    const {id: editId, ...editValues} = cabinToEdit;

    const isEditSession = Boolean(editId)
    const { register, handleSubmit, reset, getValues, formState} = useForm({ defaultValues: isEditSession ? editValues : {}})
    const {errors} = formState;
    
    const isWorking = isCreating || isEditting

    function onSubmit(data) {
      
      const image = typeof data.image === 'string' ? data?.image : data?.image[0]
      if (isEditSession) editCabin({newCabinData: {...data, image}, id: editId},{ onSuccess: () => {
        reset()
        onCloseModal?.()
        }})
      else createCabin({...data, image: image},{ onSuccess: () => {
    reset()
    }})
    }
    function onError(errors: FieldErrors<FieldValues>) {
      console.log(errors)
    }
    return (
      <Form onSubmit={handleSubmit(onSubmit, onError)} type={onCloseModal ? 'modal' : 'regular'}>
        <FormRow label="name" errorMessage={errors?.name?.message}>
          <Input type="text" id="name" {...register('name',  {required: 'This field is required'})} disabled={isWorking}/>
        </FormRow>

        <FormRow label="max capacity" errorMessage={errors?.maxCapacity?.message}>
          <Input type="text" id="maxCapacity" {...register('maxCapacity',  {required: 'This field is required', min: {
            value: 1,
            message: 'Max Capacity should be at least 1'
          }})} disabled={isWorking}/>
        </FormRow>


        <FormRow label="Regular price" errorMessage={errors?.regularPrice?.message}>
          <Input type="text" id="regularPrice"  {...register('regularPrice',  {required: 'This field is required', min: {
            value: 1,
            message: 'Regular should at least be 1'
          }})} disabled={isWorking}/>
        </FormRow>
        


        <FormRow label="Discount" errorMessage={errors?.discount?.message}>
          <Input type="number" id="discount" defaultValue={0} {...register('discount',  {required: 'This field is required', validate: (value: number) => value <= +getValues().regularPrice || 'Discount should be less than regular price'})} disabled={isWorking}/>
        </FormRow>

        <FormRow label="Description for website" errorMessage={errors?.description?.message}>
          <Textarea type="number" id="description" defaultValue="" {...register('description',  {required: 'This field is required'})} disabled={isWorking}/>
        </FormRow>

        <FormRow label="Cabin photo" errorMessage={errors?.image?.message}>
          <FileInput id="image" accept="image/*" disabled={isWorking} {...register('image', {
          required: isEditSession ? false : "This field is required",
        })} type="file"/>
        </FormRow>

        <FormRow>
          <Button variation="secondary" type="reset" onClick={() => onCloseModal?.()}>
            Cancel
          </Button>
          <Button disabled={isWorking}>{isEditSession ? 'Edit cabin' : 'Create new cabin'}</Button>
        </FormRow>
      </Form>
    );
  }

  export default CreateCabinForm;
