import { FastifyRequest } from 'fastify';
import multer from 'fastify-multer';
import { File, FileFilterCallback } from 'fastify-multer/lib/interfaces';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },

  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

const fileFilter = (
  req: FastifyRequest,
  file: File,
  cb: FileFilterCallback,
) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Somente Imagens são permitidas'), false);
  }
};

export const upload = multer({ storage, fileFilter });
