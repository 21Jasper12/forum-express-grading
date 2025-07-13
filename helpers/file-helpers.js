const fs = require("fs"); // 引入 fs 模組
const { S3 } = require("aws-sdk");

const {
  CLOUDFLARE_ACCESS_KEY_ID,
  CLOUDFLARE_SECRET_ACCESS_KEY,
  CLOUDFLARE_BUCKET_NAME,
  CLOUDFLARE_R2_ENDPOINT,
  CLOUDFLARE_BUCKET_REGION,
  CLOUDFLARE_R2_PUBLIC_URL,
} = process.env;

const s3 = new S3({
  accessKeyId: CLOUDFLARE_ACCESS_KEY_ID,
  secretAccessKey: CLOUDFLARE_SECRET_ACCESS_KEY,
  endpoint: CLOUDFLARE_R2_ENDPOINT,
  region: CLOUDFLARE_BUCKET_REGION || "auto",
  signatureVersion: "v4",
});

const r2FileHandler = (file) => {
  return new Promise((resolve, reject) => {
    if (!file) return resolve(null);

    const fileContent = fs.readFileSync(file.path);
    const key = `restaurant-images/${Date.now()}_${file.originalname}`;

    const params = {
      Bucket: CLOUDFLARE_BUCKET_NAME,
      Key: key,
      Body: fileContent,
      ACL: "public-read",
      ContentType: file.mimetype,
    };

    s3.upload(params, (err, data) => {
      if (err) return reject(err);
      fs.unlink(file.path, () => {});
      resolve(`${CLOUDFLARE_R2_PUBLIC_URL}/${data.Key}`); // 回傳圖片 URL
    });
  });
};

/** local上傳至local端資料夾 */
const localFileHandler = (file) => {
  // file 是 multer 處理完的檔案
  return new Promise((resolve, reject) => {
    if (!file) return resolve(null);
    const fileName = `upload/${file.originalname}`;
    return fs.promises
      .readFile(file.path)
      .then((data) => fs.promises.writeFile(fileName, data))
      .then(() => resolve(`/${fileName}`))
      .catch((err) => reject(err));
  });
};

module.exports = {
  localFileHandler,
  r2FileHandler,
};
