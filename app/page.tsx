import Image from 'next/image';
import AuthForm from '@/app/components/AuthForm';

export default function Home() {
  return (
    <main>
      <section>
        <div>
          <div
            className='
            flex
            items-center
            justify-center
            flex-col
            bg-gray-50
            h-[100dvh]
            space-y-6'>
            <Image
              src={'/messenger-logo.png'}
              alt='Messenger Logo'
              width={60}
              height={60}
            />

            <h1 className='text-3xl tracking-wide'>Messenger</h1>
            <AuthForm />
          </div>
        </div>
      </section>
    </main>
  );
}
