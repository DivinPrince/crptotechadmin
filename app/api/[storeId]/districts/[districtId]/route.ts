import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import getSession from "@/actions/getSession";

export async function GET(
  req: Request,
  { params }: { params: { districtId: string } }
) {
  try {
    if (!params.districtId) {
      return new NextResponse("district id is required", { status: 400 });
    }

    const district = await prismadb.district.findUnique({
      where: {
        id: params.districtId
      },
    });
  
    return NextResponse.json(district);
  } catch (error) {
    console.log('[district_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function DELETE(
  req: Request,
  { params }: { params: { districtId: string, storeId: string } }
) {
  try {
    const session = await getSession()

    if (!session?.user) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.districtId) {
      return new NextResponse("district id is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
      }
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const district = await prismadb.district.delete({
      where: {
        id: params.districtId,
      }
    });
  
    return NextResponse.json(district);
  } catch (error) {
    console.log('[district_DELETE]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};


export async function PATCH(
  req: Request,
  { params }: { params: { districtId: string, storeId: string } }
) {
  try {   
    const session = await getSession()

    const body = await req.json();
    
    const { name, billboardId } = body;
    
    if (!session?.user) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!billboardId) {
      return new NextResponse("Billboard ID is required", { status: 400 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!params.districtId) {
      return new NextResponse("district id is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
      }
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const district = await prismadb.district.update({
      where: {
        id: params.districtId,
      },
      data: {
        name,
      }
    });
  
    return NextResponse.json(district);
  } catch (error) {
    console.log('[district_PATCH]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
