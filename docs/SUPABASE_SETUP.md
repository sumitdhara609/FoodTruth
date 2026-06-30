# Supabase Setup

FoodTruth uses Supabase for authentication and database-backed saved label reports.

## Environment variables

Create a `.env.local` file in the project root:

## Database schema

FoodTruth uses two initial tables:

- `profiles`
- `saved_label_reports`

The `saved_label_reports` table is user-owned and protected by Row Level Security.

Saved reports must not store:

- original label images
- uploaded file names
- uploaded file sizes

Saved reports may store:

- reviewed label data
- score
- grade
- concern level
- nutrition snapshot
- ingredient snapshot
- claim snapshot
- serving-size snapshot
- better-choice checklist

## Applying migrations

Run the SQL inside:

```txt
supabase/migrations/001_create_profiles_and_saved_reports.sql

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
