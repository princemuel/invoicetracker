import { Avatar, Logo, ThemeButton } from '../atoms';

interface Props {
  userImage?: string | null;
}

const Sidebar = ({ userImage }: Props) => {
  return (
    <aside className='sticky top-0 z-50 flex h-32 flex-row items-center justify-between bg-brand-600 max-sx:max-w-full md:min-h-screen md:w-36 md:flex-col md:rounded-tr-[2rem]'>
      <Logo />

      <div className='flex flex-1 items-center justify-end pr-12 md:flex-col md:p-0 md:pb-12'>
        <ThemeButton />
      </div>

      <div className='grid h-full w-32 place-content-center border-l border-[#494E6E] md:h-32 md:w-full md:border-0 md:border-t'>
        <Avatar src={userImage} />
      </div>
    </aside>
  );
};

export { Sidebar };
