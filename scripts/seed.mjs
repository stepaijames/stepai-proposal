import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://yihgjkfyaynfjbodefzm.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlpaGdqa2Z5YXluZmpib2RlZnptIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAwNjQ4NTQsImV4cCI6MjA4NTY0MDg1NH0.KS6L2v3UtB3QJdYeW1tW-Kna_wlHO_37Ykq6jiueIMg'
);

const { data, error } = await supabase
  .from('gov_projects')
  .insert({
    name: '2026 K-Culture 대중소 공동도약',
    agency: 'KOCCA (한국콘텐츠진흥원)',
    status: '제안서 작성중',
    deadline: '2026-02-25',
    budget: '77억(3년)',
    progress: 30
  })
  .select();

if (error) {
  console.error('Error:', error.message);
} else {
  console.log('Success:', data);
}
