import { FieldErrors, FieldValues, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import supabase from "../../services/supabase";


  function CreateCabinForm({cabinToEdit = {}}) {
    const {id: editId, ...editValues} = cabinToEdit;

    const queryClient = useQueryClient()
    const isEditSession = Boolean(editId)
    const { register, handleSubmit, reset, getValues, formState} = useForm({ defaultValues: isEditSession ? editValues : {}})
    const {errors} = formState;

    const {mutate: createCabin, isLoading: isCreating} = useMutation({
      mutationFn: createEditCabin,
      onSuccess: () => {
        toast.success("New cabin successfully created.")
        queryClient.invalidateQueries({queryKey: ['cabins']})
        reset();
      },
      onError: (err: Error) => toast.error(err.message),
    })

    const {mutate: editCabin, isLoading: isEditting} = useMutation({
      mutationFn: ({newCabinData, id}) => createEditCabin(newCabinData, id),
      onSuccess: () => {
        toast.success("Cabin successfully edited.")
        queryClient.invalidateQueries({queryKey: ['cabins']})
        reset();
      },
      onError: (err: Error) => toast.error(err.message),
    })

    const isWorking = isCreating || isEditting

    function onSubmit(data) {
      
      const image = typeof data.image === 'string' ? data?.image : data?.image[0]
      if (isEditSession) editCabin({newCabinData: {...data, image}, id: editId})
      else createCabin({...data, image: image})
    }
    function onError(errors: FieldErrors<FieldValues>) {
      console.log(errors)
    }
    return (
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
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
          <Button variation="secondary" type="reset">
            Cancel
          </Button>
          <Button disabled={isWorking}>{isEditSession ? 'Edit cabin' : 'Create new cabin'}</Button>
        </FormRow>
      </Form>
    );
  }

  export default CreateCabinForm;
