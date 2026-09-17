export const SLUG_TO_PROJECT_UUID: Record<string, string> = {
  'black-holes': 'bbbbbbbb-0000-0000-0000-000000000001',
  'ai-healthcare': 'bbbbbbbb-0000-0000-0000-000000000002',
  'roman-republic': 'bbbbbbbb-0000-0000-0000-000000000003',
  'crispr-genetics': 'bbbbbbbb-0000-0000-0000-000000000004',
  'habit-psychology': 'bbbbbbbb-0000-0000-0000-000000000005',
  'podcast-12': 'bbbbbbbb-0000-0000-0000-000000000001',
};

export const SLUG_TO_SOURCE_UUID: Record<string, string> = {
  'bh-1': 'aaaaaaaa-0000-0000-0000-000000000001',
  'bh-2': 'aaaaaaaa-0000-0000-0000-000000000002',
  'bh-3': 'aaaaaaaa-0000-0000-0000-000000000003',
  'bh-4': 'aaaaaaaa-0000-0000-0000-000000000004',
  'ai-1': 'aaaaaaaa-0000-0000-0000-000000000005',
  'ai-2': 'aaaaaaaa-0000-0000-0000-000000000006',
  'ai-3': 'aaaaaaaa-0000-0000-0000-000000000007',
  'ai-4': 'aaaaaaaa-0000-0000-0000-000000000008',
  'rr-1': 'aaaaaaaa-0000-0000-0000-000000000009',
  'rr-2': 'aaaaaaaa-0000-0000-0000-000000000010',
  'rr-3': 'aaaaaaaa-0000-0000-0000-000000000011',
  'rr-4': 'aaaaaaaa-0000-0000-0000-000000000012',
  'cg-1': 'aaaaaaaa-0000-0000-0000-000000000013',
  'cg-2': 'aaaaaaaa-0000-0000-0000-000000000014',
  'cg-3': 'aaaaaaaa-0000-0000-0000-000000000015',
  'cg-4': 'aaaaaaaa-0000-0000-0000-000000000016',
  'hp-1': 'aaaaaaaa-0000-0000-0000-000000000017',
  'hp-2': 'aaaaaaaa-0000-0000-0000-000000000018',
  'hp-3': 'aaaaaaaa-0000-0000-0000-000000000019',
  'hp-4': 'aaaaaaaa-0000-0000-0000-000000000020',
  'src-3': 'aaaaaaaa-0000-0000-0000-000000000002',
};

export const SLUG_TO_SCRIPT_UUID: Record<string, string> = {
  'black-holes': 'ffffffff-0000-0000-0000-000000000001',
  'ai-healthcare': 'ffffffff-0000-0000-0000-000000000002',
  'roman-republic': 'ffffffff-0000-0000-0000-000000000003',
  'crispr-genetics': 'ffffffff-0000-0000-0000-000000000004',
  'habit-psychology': 'ffffffff-0000-0000-0000-000000000005',
  'podcast-12': 'ffffffff-0000-0000-0000-000000000001',
};

export function resolveProjectId(idOrSlug?: string): string {
  if (!idOrSlug) return 'bbbbbbbb-0000-0000-0000-000000000001';
  return SLUG_TO_PROJECT_UUID[idOrSlug] || idOrSlug;
}

export function resolveSourceId(idOrSlug?: string): string {
  if (!idOrSlug) return 'aaaaaaaa-0000-0000-0000-000000000001';
  return SLUG_TO_SOURCE_UUID[idOrSlug] || idOrSlug;
}

export function resolveScriptId(idOrSlug?: string): string {
  if (!idOrSlug) return 'ffffffff-0000-0000-0000-000000000001';
  return SLUG_TO_SCRIPT_UUID[idOrSlug] || idOrSlug;
}

export const SLUG_TO_REPORT_UUID: Record<string, string> = {
  'black-holes': '11111111-0000-0000-0000-000000000001',
  'ai-healthcare': '11111111-0000-0000-0000-000000000002',
  'roman-republic': '11111111-0000-0000-0000-000000000003',
  'crispr-genetics': '11111111-0000-0000-0000-000000000004',
  'habit-psychology': '11111111-0000-0000-0000-000000000005',
  'podcast-12': '11111111-0000-0000-0000-000000000001',
};

export function resolveReportId(idOrSlug?: string): string {
  if (!idOrSlug) return '11111111-0000-0000-0000-000000000001';
  return SLUG_TO_REPORT_UUID[idOrSlug] || idOrSlug;
}
