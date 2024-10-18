declare module "html-to-docx" {
    const htmlToDocx: (html: string, options?: any) => Promise<Blob>;
    export default htmlToDocx;
}
