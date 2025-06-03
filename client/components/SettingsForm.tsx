"use client"
import { SettingsFormData, settingsSchema } from '@/lib/schemas';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from './ui/form';
import { CustomFormField } from './FormField';
import { Button } from './ui/button';


const SettingsForm = ({
    initialData,
    onSubmit,
    userType
}: SettingsFormProps) => {
  const [editMode, setEditMode] = useState(false)
  const form = useForm<SettingsFormData>({
    resolver: zodResolver(settingsSchema),
    defaultValues: initialData,
  })

  const toggleEditMode = () => {
    setEditMode(!editMode)
    if (editMode) {
      form.reset(initialData);
    }
  }

  const handleSubmit = async (data: SettingsFormData) => {
    console.log("Submitting data:", data);
    await onSubmit(data);
    setEditMode(false);
  }
  return (
    <div className='pt-8 pb-5 px-8'>
        <div className='mb-5'>
          <h1 className='text-xl font-semibold'>
            {userType.charAt(0).toUpperCase() + userType.slice(1)} Settings
          </h1>
          <p className='text-sm text-gray-500'>
            Manage your account settings and preferences.
          </p>
        </div>
        <div className='bg-white rounded-xl'>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className='p-6 space-y-6'
            >
              <CustomFormField name='name'
              label='Name'
              disabled={!editMode} 
              />
              <CustomFormField name='email'
              label='Email'
              type='email'
              disabled={!editMode}
              />
              <CustomFormField 
               name="phoneNumber"
              label="Phone Number"
              disabled={!editMode}
              />
              <div className='pt-4 flex justify-between'>
                <Button
                  type='button'
                  onClick={toggleEditMode}
                  className='bg-sky-500 text-white hover:bg-sky-600'
                >
                  {editMode ? "Cancel" : "Edit Settings"}
                </Button>
                {editMode && (
                  <Button
                    type='submit'
                    className='bg-green-500 text-white hover:bg-green-600'
                  >
                    Save Changes
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </div>
      </div>
  )
}

export default SettingsForm