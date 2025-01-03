export interface HttpsAdapter {

  get<T>(url: string, options?: any): Promise<T>;

}