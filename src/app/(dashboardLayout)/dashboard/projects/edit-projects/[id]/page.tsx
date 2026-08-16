import EditProjects from "@/src/components/Ui/Dashboard/Projects/EditProjects";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

const Page = async ({ params }: PageProps) => {
  const { id } = await params;

  return (
    <div>
      <EditProjects id={id} />
    </div>
  );
};

export default Page;
