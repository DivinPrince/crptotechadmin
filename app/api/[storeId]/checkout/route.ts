import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import getMomoToken from "@/actions/get-momoToken";
import axios from "axios";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  const { productIds,info } = await req.json();
  const momoHost = "sandbox.momodeveloper.mtn.com";
  const momoTokenUrl = `https://${momoHost}/collection/token`;
  const momoRequestToPayUrl = `https://${momoHost}/collection/v1_0/requesttopay`;
  if (!productIds || productIds.length === 0) {
    return new NextResponse("Product ids are required", { status: 400 });
  }

  let momoToken = await getMomoToken();

  if (!momoToken) {
    return new NextResponse("wait for momo token");
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
  const momoResponse = await axios({
    method: "post",
    url: momoRequestToPayUrl,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });

  return NextResponse.json(order);
}
