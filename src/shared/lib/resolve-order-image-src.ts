export function resolveOrderImageSrc(path: string): string {
	const trimmed = path.trim();
	if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) return trimmed;

	const base = String(import.meta.env.VITE_API_URL ?? '').replace(/\/$/, '');
	const relative = trimmed.replace(/^\//, '');

	if (relative.startsWith('uploads/')) {
		return `${base}/${relative}`;
	}

	return `${base}/uploads/${relative}`;
}
