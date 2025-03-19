import Image from "next/image";
import Link from "next/link";
import { RegisterForm } from "@/components/forms/RegisterForm";
import { getUser } from "@/lib/actions/patients.actions";

export default async function Register(props: { params: Promise<{ userId: string }> }) {
  const params = await props.params;
  const userId = params.userId;
  const user = await getUser(userId);

  return (
    <div className="flex h-screen max-h-screen">
      <section className="relative flex-1 overflow-y-auto px-[5%]">
        <div className="mx-auto flex size-full flex-col py-10 max-w-[860px] flex-1 flex-col py-10">
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="medibook"
            className="mb-12 h-10 w-fit"
          />

          <RegisterForm user={user} />

          <div className="text-14-regular mt-20 flex justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left">
              © 2025 MediBook
            </p>
            <Link href="/admin=true" className="text-green-500">
              Admin
            </Link>
          </div>
        </div>
      </section>

      <Image
        src="/assets/images/register-img.png"
        height={1000}
        width={1000}
        alt="register"
        className="hidden h-full object-cover md:block max-w-[390px]"
      />
    </div>
  );
}
