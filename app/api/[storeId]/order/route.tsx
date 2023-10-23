import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

const corsHeaders = {
  "Access-Control-Allow-Origin": "https://crptotech.com",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, Content-Length, X-Requested-With",
  "Access-Control-Allow-Credentials": "true"
};
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  
  try {
    const body = await req.json();

    const { productIds, info } = body
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
      where: {
        id: info.district,
      },
    });

    if (!district) {
      return new NextResponse("district is required", { status: 403 });
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
    console.log('[ORDER_ERR]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
