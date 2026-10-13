# Supabase — Method into Impact

The Method into Impact platform is backed by a dedicated Supabase project
in the Ethical Bridge organisation. All MIP tables are prefixed `mip_` so
the project can hold adjacent schemas later without naming collisions.

## Project

| Field | Value |
|---|---|
| Name | Method into Impact |
| Project ref | `itzrnaxfllcztpzrgnoa` |
| URL | `https://itzrnaxfllcztpzrgnoa.supabase.co` |
| Region | `ap-south-1` (Mumbai) |
| Compute | Micro |
| Dashboard | https://supabase.com/dashboard/project/itzrnaxfllcztpzrgnoa |

## Schema (first migration: `mip_core_schema`)

| Table | Purpose |
|---|---|
| `mip_profiles` | One row per `auth.users` — email, name, locale, avatar. |
| `mip_workspaces` | An organisation or individual workspace that owns tool data. |
| `mip_workspace_members` | Join table (workspace × user × role: owner / admin / editor / viewer). |
| `mip_tool_data` | One row per workspace per tool, holding the tool's JSON blob (same shape as the current `localStorage` keys). Upserted on save. |
| `mip_course_progress` | Per-user course + lesson progress across modules. |

### Row-level security

Every table has RLS enabled.

- **Profiles** — a user reads / writes only their own profile row.
- **Workspaces** — a user can read any workspace they are a member of; only
  owners can update or delete.
- **Workspace members** — a user can see fellow members of workspaces they
  belong to; only workspace owners can add or remove members.
- **Tool data** — any workspace member can read, insert, update or delete
  the workspace's tool blobs. (Finer-grained roles come later.)
- **Course progress** — a user reads / writes only their own progress rows.

### Auto-provisioning

Signing up through Supabase Auth fires the `on_auth_user_created` trigger
which:
1. Inserts a `mip_profiles` row,
2. Creates a personal `mip_workspaces` row with the user as owner,
3. Adds the user as the first `mip_workspace_members` row with role `owner`.

The user is signed into a working, writable workspace from their first
session — no empty-state dance needed.

## Client

Browser code loads the Supabase JS SDK from a CDN and talks to this project
through `assets/js/supabase-client.js`, which exports:

- `mip` — the raw `SupabaseClient`
- `currentUser()` — resolves to the signed-in user or `null`
- `activeWorkspace()` — the user's first owned workspace
- `loadToolData(workspaceId, toolSlug)` — read the saved blob for a tool
- `saveToolData(workspaceId, toolSlug, data, schemaVersion?)` — upsert the blob

The publishable key in that file is safe to ship: it grants only the
privileges that RLS policies allow for the `anon` and `authenticated`
roles. The `service_role` key is never used in browser code.

## Migrations

Managed from Claude Code via the Supabase MCP. Apply with
`mcp__Supabase__apply_migration` so the SQL is captured in Supabase's own
migration history (visible under Database → Migrations in the dashboard).

Current migrations:

| Version | Name | Summary |
|---|---|---|
| `*_mip_core_schema` | Core tables, indexes, helper function, triggers and RLS policies. |
| `*_mip_security_hardening` | Pins `search_path` on the trigger helper; revokes `EXECUTE` on `mip_handle_new_user` from `anon` + `authenticated`; revokes `anon` execute on `mip_user_workspace_ids`. |

## Next steps (not done yet)

1. Add a `/account` and `/sign-in` flow in the HTML pages that uses
   `mip.auth.signInWithOtp()` (passwordless email) — currently the account
   page is a preview placeholder.
2. In each tool's `S.store` call site, teach the storage adapter to prefer
   `mip_tool_data` when a user is signed in, falling back to localStorage
   otherwise. Lets anonymous users keep working as today; signed-in users
   see their data on every device.
3. Add workspace switcher UI (users who belong to multiple workspaces).
4. Add email templates in the Supabase dashboard (Auth → Templates) with
   Method into Impact branding.
