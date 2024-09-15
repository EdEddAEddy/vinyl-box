import fs from "fs";
import path from "path";

class LocalStorage {
  constructor(baseDir) {
    this.baseDir = baseDir;
  }

  async save(file, folder) {
    const fileName = `${Date.now()}-${file.originalname}`;
    const filePath = path.join(this.baseDir, folder, fileName);

    return new Promise((resolve, reject) => {
      fs.writeFile(filePath, file.buffer, (err) => {
        if (err) reject(err);
        else resolve(`/uploads/${folder}/${fileName}`);
      });
    });
  }

  async delete(filePath) {
    const fullPath = path.join(this.baseDir, filePath);
    return fs.promises.unlink(fullPath);
  }
}

const storage = new LocalStorage(path.join(process.cwd(), "public", "uploads"));

export default storage;
