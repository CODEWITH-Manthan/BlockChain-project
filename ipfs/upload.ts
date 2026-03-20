import { create } from 'ipfs-http-client';

// NOTE: Using a public IPFS gateway node for demonstration purposes.
// For production, use an authenticated Infura, Pinata, or similar IPFS provider.
const client = create({ url: "https://ipfs.infura.io:5001/api/v0" });

export async function uploadFileToIPFS(file: File) {
  try {
    const added = await client.add(file);
    console.log("Uploaded file hash:", added.path);
    return added.path;
  } catch (error) {
    console.error("Error uploading to IPFS", error);
    throw error;
  }
}
