export default function AuthLayout(props: WithChildren) {
  return (
    <main className="w-full min-h-svh grid place-items-center p-4">
      <div className="py-3 relative px-5 rounded-lg bg-background flex items-center flex-col gap-3 w-full max-w-96 shadow-lg">
        {props.children}
      </div>
    </main>
  );
}
