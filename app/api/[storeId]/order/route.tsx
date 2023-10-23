import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  const { productIds, info } = await req.json();

  try {
    if (!productIds || productIds.length === 0) {
    return new NextResponse("Product ids are required", { status: 400 });
  }

  const products = await prismadb.product.findMany({
    where: {
      id: {
        in: productIds,
      },
    },
  });

  const district = await prismadb.district.findFirst({
    where:{
      id: info.district
    }
  })

  if (!district) {
    return new NextResponse('')
  }

  const order = await prismadb.order.create({
    data: {
      storeId: params.storeId,
      isPaid: false,
      phone: info.phoneNumber,
      districtId: district.id,
      orderItems: {
        create: productIds.map((productId: string) => ({
          product: {
            connect: {
              id: productId,
            },
          },
        })),
      },
    },
  });
  return NextResponse.json(order);
  } catch (error) {
    console.log(error);   
  }
}
