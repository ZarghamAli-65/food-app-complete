export function absoluteUrl(path: string) {
    const baseUrl =
        process.env.NEXT_PUBLIC_BASE_URL || "https://vercel.com/zarghamali/food-app-complete/3Ua67mhmEcKSnfXtpZbwGd9m4Tuz";
    return `${baseUrl}${path}`;
}