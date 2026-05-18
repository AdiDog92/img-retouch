import JSZip from 'jszip';

async function fetchFileBlob(url: string): Promise<Blob> {
	const token = localStorage.getItem('token');
	const response = await fetch(url, {
		headers: token ? { Authorization: `Bearer ${token}` } : {},
	});

	if (!response.ok) {
		throw new Error(`Не удалось загрузить файл (${response.status})`);
	}

	return response.blob();
}

function zipEntryName(filePath: string, index: number): string {
	const baseName = filePath.split('/').pop()?.trim();
	if (baseName) return baseName;
	return `file_${index + 1}`;
}

export async function downloadFilesAsZip(
	filePaths: string[],
	resolveUrl: (path: string) => string,
	archiveName: string,
): Promise<void> {
	if (filePaths.length === 0) return;

	const zip = new JSZip();
	const usedNames = new Set<string>();

	await Promise.all(
		filePaths.map(async (filePath, index) => {
			const blob = await fetchFileBlob(resolveUrl(filePath));
			let name = zipEntryName(filePath, index);
			if (usedNames.has(name)) {
				name = `${index + 1}_${name}`;
			}
			usedNames.add(name);
			zip.file(name, blob);
		}),
	);

	const zipBlob = await zip.generateAsync({ type: 'blob' });
	const url = URL.createObjectURL(zipBlob);
	const anchor = document.createElement('a');
	anchor.href = url;
	anchor.download = archiveName;
	anchor.click();
	URL.revokeObjectURL(url);
}
