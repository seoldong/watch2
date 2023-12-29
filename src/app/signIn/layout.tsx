
function SignInLayout({ children }) {
  return (
      <div
      style={{ height: "80%" }}
      className="flex flex-col items-center">
        <div
          style={{ height: "30%" }}
          className="flex justify-center items-center text-3xl"
        >
          select method to sign in
        </div>
        <div style={{ height: "70%" }}>{children}</div>
      </div>
  );
}

export default SignInLayout;
