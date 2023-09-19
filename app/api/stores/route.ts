import { NextResponse } from 'next/server';

import prismadb from '@/lib/prismadb';
import getSession from '@/actions/getSession';

export async function POST(
  req: Request,
) {
  try {
    const session = await getSession()
    const body = await req.json();

    const { name } = body;

    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    const store = await prismadb.store.create({
      data: {
        name,
      }
    });
  
    return NextResponse.json(store);
  } catch (error) {
    console.log('[STORES_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
