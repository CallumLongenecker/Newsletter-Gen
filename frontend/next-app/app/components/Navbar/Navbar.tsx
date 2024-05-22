import Link from "next/link";
import Button from "../Button/Button";

const Navbar = () => {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1 px-2 mx-2">
        <span className="text-lg text-primary font-bold">
          Newsletter Generator
        </span>
      </div>
      <div className="flex-none">
        <Link href="/properties/addProperty" passHref>
          <Button>Add Property</Button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
