import { SignInForm, SocialLoginButtons } from '@/features/auth';

const SignUpPage = () => {
  return (
    <div className="flex flex-col gap-12 w-full">
      <SignInForm />
      <SocialLoginButtons />
    </div>
  );
};

export default SignUpPage;
