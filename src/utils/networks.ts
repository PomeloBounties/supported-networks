import fs from "fs";
import path from "path";
import { Network } from "../types/registry";

export function getAllJsonFiles(dir: string): string[] {
  let files: string[] = [];

  for (const file of fs.readdirSync(dir)) {
    const fullPath = path.join(dir, file);

    if (fs.statSync(fullPath).isDirectory()) {
      files = [...files, ...getAllJsonFiles(fullPath)];
    } else if (fullPath.endsWith(".json")) {
      files.push(fullPath);
    }
  }

  return files;
}

export function loadNetworks(dir: string): Network[] {
  const files = getAllJsonFiles(dir);
  const res: Network[] = [];
  for (const file of files) {
    const content = JSON.parse(fs.readFileSync(file, "utf-8")) as Network;
    res.push(content);
  }

  return res;
}
