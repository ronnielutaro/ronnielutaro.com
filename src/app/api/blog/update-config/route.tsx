// api/blog/update-config.js or .ts
import { NextResponse } from 'next/server';
import { updateBlogConfig } from '@/__samwise/utils/updateBlogConfig';
import { generatePwaIcons } from '@/__samwise/utils/generateIcons';
import { updateManifest } from '@/__samwise/utils/updateManifest';
import { processHeadshotImage } from '@/__samwise/utils/processHeadshotImage'; // Import the new function
import { createSVGFromBase64 } from '@/__samwise/utils/createSVGFromBase64'; // Import the new SVG generation function
import path from 'path';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Handle logo processing
    if (body.logo === null) {
      generatePwaIcons(`public${body.logoData}`);
    } else {
      // Existing logo processing logic...
      // [Your existing code for processing the logo]
    }

    // Handle headshot processing
    if (body.headshotData) {
      const headshotPath = await processHeadshotImage(body.headshotData);
      body.headshotPath = headshotPath; // Update the body with the headshot path
    }

    // Generate and save SVG logo if `useLogoInNavbar` is true
    if (body.useLogoInNavbar && body.logoData) {
      const svgPath = path.join(process.cwd(), 'public', 'icon.svg');
      await createSVGFromBase64(body.logoData, svgPath);
    }

    // Update the configuration file
    await updateBlogConfig(body);

    // Update the manifest file
    await updateManifest({
      websiteURL: body.vercelUrl,
      fullName: body.fullName,
      profileDescription: body.bio,
    });

    return NextResponse.json({
      success: true,
      message: 'Configuration and assets updated successfully.',
    });
  } catch (error) {
    console.error('Error processing request:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to update configuration, icons, or manifest.',
      },
      { status: 500 },
    );
  }
}
