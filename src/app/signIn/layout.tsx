function SignInLayout({ children }) {
  return (
    <div className="h-full flex flex-col items-center">
      <div className="h-[15%]"></div>
      <div className="h-[20%] flex justify-center items-center
          lg:text-4xl">
        <p>select method to sign in</p>
      </div>
      <div className="h-[65%]">{children}</div>
    </div>
  );
}

export default SignInLayout;
