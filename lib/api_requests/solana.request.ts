import { apiResponse, httpRequest } from '../api.helpers'

export const solanaRequests = {
  getTokenMetaData: async (
    token_mint: string,
    setLoading?: (loading: boolean) => void
  ) => {
    try {
      const res = await httpRequest(setLoading).get(
        `/solana/get-token-meta-data`,
        { params: { token_mint } }
      )

      return apiResponse(true, 'Token metadata fetched successfully.', res.data)
    } catch (err: any) {
      return apiResponse(
        false,
        err?.response?.data?.message || err?.message || 'Error occurred.',
        err
      )
    }
  },
}
