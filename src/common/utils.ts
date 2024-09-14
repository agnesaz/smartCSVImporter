import { v4 as uuidv4 } from 'uuid';

export function generateDocId(): string {
  return uuidv4();
}