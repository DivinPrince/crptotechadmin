import prismadb from "@/lib/prismadb";

import { DistrictForm } from "./components/district-form";

const DistrictPage = async ({
  params
}: {
  params: { district: string, storeId: string }
}) => {
  let district = null
  if (params.district != 'new') {
    district = await prismadb.district.findFirst({
      where: {
        id: params.district
      }
    });
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <DistrictForm initialData={district} />
      </div>
    </div>
  );
}

export default DistrictPage;
