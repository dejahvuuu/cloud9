'use server'

import {
    propertySchema,
    validateWithZodSchema,
  } from './schemas';
  import db from './db';
  import { auth, clerkClient, currentUser } from '@clerk/nextjs/server';
  import { revalidatePath } from 'next/cache';
  import { redirect } from 'next/navigation';


const renderError = (error: unknown): { message: string } => {
    console.log(error);
    return {
      message: error instanceof Error ? error.message : 'An error occurred',
    };
};

export const createPropertyAction = async (
    prevState: any,
    formData: FormData
  ): Promise<{ message: string }> => {

    let propertyIdQuery: null | string = null; 

    try {
      const rawData = Object.fromEntries(formData);
      const validatedFields = validateWithZodSchema(propertySchema, rawData);
      const propertyObject = await db.property.create({
        data: {
          ...validatedFields,
        },
      });
      propertyIdQuery = propertyObject.id
    } catch (error) {
      return renderError(error);
    }
    redirect(`/checkout?propertyIdQuery=${propertyIdQuery}`);
};