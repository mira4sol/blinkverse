export interface ApiResponse<D = any> {
  success: boolean;
  message: string;
  data?: D;
}
