import { NextResponse } from 'next/server';

import prismadb from '@/lib/prismadb';
import getSession from '@/actions/getSession';
 
export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const session = await getSession()

    const body = await req.json();

    const { name,} = body;

    if (!session?.user) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
      }
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const district = await prismadb.district.create({
      data: {
        name,
        storeId: params.storeId,
      }
    });
  
    return NextResponse.json(district);
  } catch (error) {
    console.log('[district_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const district = await prismadb.district.findMany({
      where: {
        storeId: params.storeId
      }
    });
  
    return NextResponse.json(district);
  } catch (error) {
    console.log('[district_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};