import FormData from 'form-data';

import { Api } from './api';
import {
  CreatePackageRequestPayload,
  CreatePackageResponsePayload,
  DocumentMetadata,
  UploadDocumentRequestPayload,
} from './types';

export class OneSpanSign {
  constructor(private apiKey: string, private apiUrl: string) {}

  public async createPackage(payload: CreatePackageRequestPayload): Promise<CreatePackageResponsePayload> {
    const response = await Api.post(`${this.apiUrl}/api/packages`)
      .withAuthorizationHeader(`Basic ${this.apiKey}`)
      .withBody(payload)
      .fetch();

    return (await response.json()) as CreatePackageResponsePayload;
  }

  public async uploadDocument(
    packageId: string,
    payload: UploadDocumentRequestPayload,
    documentBody: Buffer | ReadableStream
  ): Promise<DocumentMetadata> {
    const formData = new FormData();
    formData.append('file', documentBody, { filename: payload.name });
    formData.append('payload', payload);

    const response = await Api.post(`${this.apiUrl}/api/packages/${packageId}/documents`)
      .withAuthorizationHeader(`Basic ${this.apiKey}`)
      .withBody(formData)
      .fetch();

    return (await response.json()) as DocumentMetadata;
  }
}
