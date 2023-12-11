import { cn } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "./ui/button";

const Footer = () => {
  return (
    <section className="container max-w-7xl py-6 mt-10">
      {/* <div className="flex flex-wrap gap-4 md:gap-0">
        <div className="w-full md:w-2/3">
          <Link href="/" className="font-semibold text-xl text-primary">
            AI Art Gallery
          </Link>
          <p className="mt-6">
            Explore the AI Art Gallery, where technology and creativity unite to
            redefine the world of art. Immerse yourself in a digital realm
            filled with AI-generated masterpieces, discover new perspectives,
            and collect your favorites.
          </p>
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/3">
          <Link
            href="/"
            className={cn(
              buttonVariants({ variant: "link", size: "default" }),
              "hover:no-underline"
            )}
          >
            Home
          </Link>
          <Link
            href="/#about-us"
            className={cn(
              buttonVariants({ variant: "link", size: "default" }),
              "hover:no-underline"
            )}
          >
            About Us
          </Link>
          <Link
            href="/#contact-us"
            className={cn(
              buttonVariants({ variant: "link", size: "default" }),
              "hover:no-underline"
            )}
          >
            Contact Us
          </Link>
        </div>
      </div> */}
      <div className="flex justify-center items-center text-primary">
        Designed and Developed by{" "}
        <Link
          href="https://aserrar.dev"
          className={cn(
            buttonVariants({ variant: "link", size: "default" }),
            "hover:no-underline p-0 pl-2 font-semibold text-base"
          )}
        >
          Youssef Aserrar
        </Link>
      </div>
    </section>
  );
};

export default Footer;
