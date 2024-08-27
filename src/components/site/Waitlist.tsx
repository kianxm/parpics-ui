import { BackgroundBeams } from "../ui/background-beams";
import { Input } from "../ui/input";

export default function Waitlist() {
  return (
    <div className="h-screen w-full bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="relative z-10 text-lg md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold">
          Join the waitlist
        </h1>
        <p></p>
        <p className="text-neutral-500 max-w-lg mx-auto my-2 text-sm text-center relative z-10">
          Welcome to Parpics. The best all-in-one platform for photographers.
          Join the waitlist to get early access.
        </p>
        <Input
          type="text"
          placeholder="kian@parpics.com"
          className="rounded-lg border border-neutral-800 focus:ring-0 focus:ring-black-500  w-full relative z-10 mt-4  bg-neutral-950 placeholder:text-neutral-700 text-white"
        />
      </div>
      <BackgroundBeams />
    </div>
  );
}
