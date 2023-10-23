import { format } from "date-fns";

import prismadb from "@/lib/prismadb";

import { DistrictColumn } from "./components/columns"
import { DistrictClient } from "./components/client";

const DistrictPage = async ({
  params
}: {
  params: { storeId: string }
}) => {
  const district = await prismadb.district.findMany({
    where: {
      storeId: params.storeId
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  const formattedDistrict: DistrictColumn[] = district.map((item: { id: any; name: any; createdAt: number | Date; }) => ({
    id: item.id,
    name: item.name,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <DistrictClient data={formattedDistrict} />
      </div>
    </div>
  );
};

export default DistrictPage;
