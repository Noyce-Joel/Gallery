export type SearchResult = {
    public_id: string
    tags: string[]
    height: number // Numeric value for image height
    width: number  // Numeric value for image width
    url: string    // URL for the image
    [key: string]: any // Allow other optional properties if needed
}
