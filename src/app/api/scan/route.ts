import { NextResponse } from "next/server";
import { WhatWebEngineService } from "@/service/whatweb.service";
import { WhatWebParser } from "@/utils/whatweb-paster"; // Fixed typo: paster -> parser

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.url) {
      return NextResponse.json(
        { error: "URL target wajib diisi!" },
        { status: 400 }
      );
    }

    // Filter customPlugins agar jika kosong ([]) tidak terkirim sebagai flag --plugins
    const customPlugins =
      Array.isArray(body.customPlugins) && body.customPlugins.length > 0
        ? body.customPlugins
        : undefined;

    // 1. Eksekusi Engine WhatWeb via Service
    const scanResult = await WhatWebEngineService.executeScan({
      url: body.url,
      aggression: body.aggression || 1,
      verbose: body.verbose ?? true, // Set default true jika undefined
      followRedirects: body.followRedirects || "always",
      maxRedirects: body.maxRedirects,
      userAgent: body.userAgent,
      customHeaders: body.customHeaders,
      cookie: body.cookie,
      httpMethod: body.httpMethod,
      postData: body.postData,
      httpAuth: body.httpAuth,
      proxy: body.proxy,
      maxThreads: body.maxThreads || 15,
      waitDelay: body.waitDelay,
      customPlugins: customPlugins,
      ignoreSslErrors: body.ignoreSslErrors ?? true,
    });

    // 2. Parsed data menggunakan WhatWebParser
    const parsedData = WhatWebParser.parse(scanResult.rawData);

    if (!parsedData) {
      return NextResponse.json(
        { error: "Gagal memproses hasil scan dari WhatWeb." },
        { status: 500 }
      );
    }

    // 3. Kirim response terstruktur ke Frontend
    return NextResponse.json({
      success: true,
      commandExecuted: scanResult.commandExecuted,
      data: parsedData,
    });
  } catch (error: any) {
    console.error("[API Scan Route Error]:", error);
    return NextResponse.json(
      { error: error.message || "Gagal melakukan scan pada target." },
      { status: 500 }
    );
  }
}