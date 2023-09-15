const mockGetRequestSuccess = {
  error: undefined,
  response: [
    {
      id: 'zlpgGWqN7',
      url: 'https://cdn2.thecatapi.com/images/zlpgGWqN7.jpg',
      width: 3840,
      height: 2400,
    },
    {
      id: 'LSaDk6OjY',
      url: 'https://cdn2.thecatapi.com/images/LSaDk6OjY.jpg',
      width: 1080,
      height: 1080,
    },
  ],
};

const mockGetRequestFailed = {
  error: new Error('Should fail'),
  response: undefined,
};

const mockGet = jest.fn()
  .mockResolvedValueOnce(mockGetRequestSuccess)
  .mockResolvedValueOnce(mockGetRequestFailed);

jest.mock('../../../helpers/http-request', () => {
  return {
    HttpRequest: jest.fn().mockImplementation(() => {
      return {
        setBaseUrl: jest.fn().mockReturnThis(),
        setPath: jest.fn().mockReturnThis(),
        addReqParams: jest.fn().mockReturnThis(),
        setLogger: jest.fn().mockReturnThis(),
        get: mockGet,
      };
    }),
  };
});

import { getCats } from '../get-cats';

describe('get_cats_list', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });
  it('should return cats list', async () => {
    const page = 1;
    const limit = 10;

    const params = {
      page,
      limit,
      has_breeds: 1,
    };

    // jest.mock('../../../helpers/http-request', () => {
    //   return {
    //     HttpRequest: jest.fn().mockImplementation(() => {
    //       return {
    //         setBaseUrl: jest.fn().mockReturnThis(),
    //         setPath: jest.fn().mockReturnThis(),
    //         addReqParams: jest.fn().mockReturnThis(),
    //         setLogger: jest.fn().mockReturnThis(),
    //         get: mockGetRequestSuccess,
    //       };
    //     }),
    //   };
    // });

    const expectedResponse = {
      httpStatus: 200,
      apiStatus: 1,
      message: 'success',
      data: {
        totalCount: 10,
        cats: [
          {
            id: 'zlpgGWqN7',
            url: 'https://cdn2.thecatapi.com/images/zlpgGWqN7.jpg',
            width: 3840,
            height: 2400,
          },
          {
            id: 'LSaDk6OjY',
            url: 'https://cdn2.thecatapi.com/images/LSaDk6OjY.jpg',
            width: 1080,
            height: 1080,
          },
        ],
      },
    };

    const result: any = await getCats(params);

    expect(result).toStrictEqual(expectedResponse);
    expect(result.data.cats.length).toBe(2);
  });

  it('should handle error', async () => {
    // jest.mock('../../../helpers/http-request', () => {
    //   return {
    //     HttpRequest: jest.fn().mockImplementation(() => {
    //       return {
    //         setBaseUrl: jest.fn().mockReturnThis(),
    //         setPath: jest.fn().mockReturnThis(),
    //         addReqParams: jest.fn().mockReturnThis(),
    //         setLogger: jest.fn().mockReturnThis(),
    //         get: mockGetRequestFailed,
    //       };
    //     }),
    //   };
    // });

    const page = 1;
    const limit = 10;

    const params = {
      page,
      limit,
      has_breeds: 1,
    };

    const expectedResponse = {
      httpStatus: 200,
      apiStatus: 0,
      message: 'No results found',
      data: {
        totalCount: 0,
        cats: [],
      },
    };

    const result: any = await getCats(params);

    expect(result).toStrictEqual(expectedResponse);
    expect(result.data.cats.length).toBe(0);
  });
});
