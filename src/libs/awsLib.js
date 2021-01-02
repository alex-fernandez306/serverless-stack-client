import { Storage } from "aws-amplify";

const s3Upload = async (file) => {
  const filename = `${Date.now()}-${file.name}`;
  const stored = await Storage.vault.put(filename, file, {
    contentType: file.type
  });
  return stored.key;
}

const s3Delete = async (key) => {

  const removed = await Storage.vault.remove(key);
  return removed;
}

export {
  s3Upload,
  s3Delete
}