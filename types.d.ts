declare module 'together-ai' {
  export interface TogetherOptions {
    apiKey: string | undefined;
  }

  export interface ImageGenerationOptions {
    model: string;
    prompt: string;
    width?: number;
    height?: number;
    steps?: number;
    n?: number;
    response_format?: string;
  }

  export interface ImageResponse {
    data: Array<{
      b64_json: string;
    }>;
  }

  export default class Together {
    constructor(options: TogetherOptions);
    images: {
      create(options: ImageGenerationOptions): Promise<ImageResponse>;
    };
  }
}