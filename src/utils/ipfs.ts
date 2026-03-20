'use client';

// Real IPFS upload via Pinata API
// No deprecated ipfs-http-client needed — uses native fetch

const PINATA_API_KEY = process.env.NEXT_PUBLIC_PINATA_API_KEY || '';
const PINATA_SECRET = process.env.NEXT_PUBLIC_PINATA_SECRET_KEY || '';
const PINATA_URL = 'https://api.pinata.cloud/pinning/pinFileToIPFS';

export async function uploadFileToIPFS(file: File): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);

  const metadata = JSON.stringify({
    name: file.name,
    keyvalues: {
      uploadedBy: 'NexusProcurement',
      date: new Date().toISOString(),
    },
  });
  formData.append('pinataMetadata', metadata);

  const options = JSON.stringify({ cidVersion: 1 });
  formData.append('pinataOptions', options);

  const response = await fetch(PINATA_URL, {
    method: 'POST',
    headers: {
      pinata_api_key: PINATA_API_KEY,
      pinata_secret_api_key: PINATA_SECRET,
    },
    body: formData,
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Pinata upload failed: ${response.status} - ${errText}`);
  }

  const data = await response.json();
  return data.IpfsHash; // e.g. "bafybeig..."
}

export function getIPFSGatewayURL(hash: string): string {
  return `https://gateway.pinata.cloud/ipfs/${hash}`;
}
