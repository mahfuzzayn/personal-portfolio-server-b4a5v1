export const sanitizeFilename = (title: string) => {
    return title.replace(/[^a-zA-Z0-9-_ ]/g, '').replace(/\s+/g, '-')
}
