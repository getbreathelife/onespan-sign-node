import { Api } from './api';
import { CreatePackageRequestPayload, CreatePackageResponsePayload } from './types';

export class OneSpanSign {
  constructor(private apiKey: string, private apiUrl: string) {}

  public async createPackage(payload: CreatePackageRequestPayload): Promise<CreatePackageResponsePayload> {
    const response = await Api.post(`${this.apiUrl}/api/packages`)
      .withAuthorizationHeader(`Basic ${this.apiKey}`)
      .withBody(payload)
      .fetch();

    return (await response.json()) as CreatePackageResponsePayload;
  }
}
