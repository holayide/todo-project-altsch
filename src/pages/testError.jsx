function TestError() {
  throw new Error("💥 This is a TEST error for Error Boundary!");

  return <div>You shouldn't see this!</div>;
}

export default TestError;
