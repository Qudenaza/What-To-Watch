type Props = {
  message: string;
};

function LoginMessage({ message }: Props): JSX.Element {
  return (
    <div className="sign-in__message">
      <p>{message}</p>
    </div>
  );
}

export default LoginMessage;
