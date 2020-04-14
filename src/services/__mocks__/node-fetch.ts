export class MockFetchResponse {
  status: number;
  content: string;

  constructor (status: number, content: string) {
    this.status = status;
    this.content = content;
  }

  async text () {
    return this.content;
  }
}

let fetchResponse = new MockFetchResponse(200, '');

export const setResponse = (response: MockFetchResponse) => {
  fetchResponse = response;
};

export default () => fetchResponse;
