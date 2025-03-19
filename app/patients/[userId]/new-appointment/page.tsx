import Image from "next/image";
import { AppointmentForm } from "@/components/forms/AppointmentForm";
import { getPatient } from "@/lib/actions/patients.actions";

export default async function NewAppointment(props: { params: Promise<{ userId: string }> }) {
    const params = await props.params;
    const userId = params.userId;
    const patient = await getPatient(userId);

    return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar relative flex-1 overflow-y-auto px-[5%] my-auto">
        <div className="mx-auto flex size-full flex-col py-10 max-w-[860px] flex-1 justify-between">
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="patient"
            className="mb-12 h-10 w-fit"
          />

          <AppointmentForm 
            type="create"
            userId={userId}
            patientId={patient.$id}
          />

          <p className="justify-items-end text-dark-600 xl:text-left">
            © 2025 MediBook
          </p>
        </div>
      </section>

      <Image
        src="/assets/images/appointment-img.png"
        height={1000}
        width={1000}
        alt="appointment"
        className="hidden h-full object-cover md:block max-w-[50%]"
      />
    </div>
  );
}
