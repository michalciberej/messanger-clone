'use client';

import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import { useState } from 'react';
import { AiFillGithub, AiFillGoogleCircle } from 'react-icons/ai';
import { signIn } from 'next-auth/react';
import clsx from 'clsx';
import axios from 'axios';

const AuthForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [variant, setVariant] = useState<'LOGIN' | 'REGISTER'>('LOGIN');
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: { name: '', email: '', password: '' },
  });

  const onSubmit: SubmitHandler<FieldValues> = (credentials) => {
    setIsLoading(true);

    if (variant === 'LOGIN') {
      signIn('credentials', { ...credentials, redirect: false })
        .then((callback) => {
          if (callback?.error) throw new Error('invalid credentials');
        })
        .finally(() => setIsLoading(false));
    }

    if (variant === 'REGISTER') {
      axios.post('/api/register', credentials).then(() => setIsLoading(false));
    }
  };

  const providerSignIn = (action: string) => {
    setIsLoading(true);

    signIn(action, { redirect: false })
      .then((callback) => {
        if (callback?.error) {
          throw new Error('something went wrong ');
        }
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className='bg-white p-8 rounded-lg shadow-md'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div
            className='
              flex
              flex-col
              space-y-4
              w-full
              md:max-w-md
              mb-4'>
            {variant === 'REGISTER' && (
              <input
                type='name'
                {...register('name', {
                  required: true,
                  disabled: isLoading ? true : false,
                })}
                placeholder='Name*'
                className={clsx(
                  `
                form-input
                rounded-md
                outline-none
                `,
                  errors.email && 'ring-1 ring-rose-400',
                  isLoading && 'opacity-75 cursor-default'
                )}
              />
            )}
            <input
              type='email'
              {...register('email', {
                required: true,
                disabled: isLoading ? true : false,
              })}
              placeholder='Email*'
              className={clsx(
                `
                form-input
                rounded-md
                outline-none
                `,
                errors.email && 'ring-1 ring-rose-400',
                isLoading && 'opacity-75 cursor-default'
              )}
            />
            <input
              type='password'
              {...register('password', {
                required: true,
                disabled: isLoading ? true : false,
              })}
              placeholder='Password*'
              className={clsx(
                `
                form-input
                rounded-md
                outline-none
                `,
                errors.password && 'ring-1 ring-rose-400',
                isLoading && 'opacity-75 cursor-default'
              )}
            />
          </div>
          <button
            disabled={isLoading ? true : false}
            className={clsx(
              `
              w-full
              py-2
              px-2
              rounded-md
              font-semibold
              bg-blue-400
              text-white
              `,
              isLoading && 'opacity-75 cursor-default'
            )}>
            {variant === 'LOGIN' ? 'Login' : 'Create Account'}
          </button>
        </div>
      </form>
      <div
        className='
        relative
        flex
        justify-center
        items-center
        my-2'>
        <div
          className='
        absolute
        border-t-2
        border-gray-300
        w-full'
        />
        <span
          className='
        text-gray-400
        text-sm
        leading-6
        bg-white
        relative
        z-10
        px-2'>
          Or sign in with
        </span>
      </div>
      <div className='flex justify-center items-center gap-4'>
        <button
          type='button'
          aria-label='Login in with Github account'
          onClick={() => providerSignIn('github')}
          className={clsx(
            `
          w-full
          flex
          items-center
          justify-center
          text-xl
          rounded-md
          border
          border-gray-500
          py-1`,
            !isLoading && 'hover:bg-gray-50',
            isLoading && 'opacity-75 cursor-default'
          )}>
          <AiFillGithub />
        </button>
        <button
          type='button'
          aria-label='Login in with Google account'
          onClick={() => providerSignIn('google')}
          className={clsx(
            `
          w-full
          flex
          items-center
          justify-center
          text-xl
          rounded-md
          border
          border-gray-500
          py-1`,
            !isLoading && 'hover:bg-gray-50',
            isLoading && 'opacity-75 cursor-default'
          )}>
          <AiFillGoogleCircle />
        </button>
      </div>
      <div
        className='
      flex
      justify-center
      items-center
      text-sm
      mt-3
      space-x-2
      text-gray-400'>
        <button
          onClick={
            variant === 'LOGIN'
              ? () => setVariant('REGISTER')
              : () => setVariant('LOGIN')
          }>
          {variant === 'LOGIN'
            ? 'Dont have account yet?'
            : 'Already have an account?'}
        </button>
      </div>
    </div>
  );
};

export default AuthForm;
