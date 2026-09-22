# Production access and commercial launch

## What this implementation is

This branch is a functional **public development preview**, not a secure paid learning platform. Course content is static and readable without authentication. Browser storage is for drafts, not identity, billing or permissions. Do not advertise paid protection or upload paid workbooks to the public repository.

The original repository had no authentication, payment service, database, private file storage, workbook files or videos. Prices and trial terms have not been supplied. These dependencies are left explicit rather than simulated.

## Product model

`products.js` is the product/resource catalogue. `course_planning_system` is a one-time course purchase. Each `software_*` product has separate monthly and annual price configuration. Prices and checkout identifiers remain null until approved. There is no generic PRO grant and no active bundle. A later bundle can map one billing SKU to multiple explicit product grants; individual product access checks stay unchanged.

Course answers belong to `mm.course.planning-system.v1`. Every software demo has its own `mm.software.<slug>.v1` namespace. No software imports course data, requires another tool, or shares records with it. The course may show earlier course answers as read-only context. Shared branding and account identity do not imply shared product data.

## Required service boundary

Implement these routes on an authenticated server before a paid launch:

- `GET /api/session`: verify an HTTP-only session and return the user plus actual product entitlements from the server database. Browser claims are never authority.
- `POST /api/checkout`: accept a product ID and billing interval, look up the approved price server-side, and create the payment-provider checkout. Refuse unconfigured products. Never accept a browser-supplied price.
- `POST /api/billing/webhook`: verify the provider signature, store the event ID with a uniqueness constraint, and update orders, subscriptions and product grants transactionally. Redirects and emailed links must not grant access.
- `GET /api/courses/:id/lessons/:lessonId`: check the course grant before returning protected content. Move full lesson content out of public assets; retain only intentionally public previews.
- `GET /api/course-resources/:resourceId/download`: resolve the course ID through the server-owned resource manifest; check the course grant and file version; issue a short-lived private download URL. Never publish a permanent workbook URL in static HTML or JS.
- `GET/PUT /api/courses/:id/work`: check the user and course grant, validate the same answer schema and use a revision check to prevent overwriting another device's edits.
- `GET/POST/PATCH /api/software/:productId/records`: check that specific software grant, then scope every read/write to both user/workspace and product. Cross-product references are not required or created.

Use CSRF protection where appropriate, rate limits, server-side input limits, authenticated storage rules and ownership checks. A shared login can return both courses and software, but their grants remain separate.

## Grants and lifecycle

Trusted server records should contain: grant ID, user ID, product ID, kind, status, purchase/subscription ID, provider event ID, billing interval, period start/end, revocation timestamp and audit timestamps. `server/entitlements.mjs` is a provider-neutral policy kernel tested for product isolation and expiry. It is **not wired to a service** and cannot secure GitHub Pages.

Course access requires `kind=course`, the exact course product, `status=purchased` and no revocation. Software access requires `kind=software`, the exact software product, `status=active`, monthly/annual billing and a current start/end interval. Cancel-at-period-end remains active through the paid-through date; immediate revocation and expiry deny access. Map provider lifecycle events to these states explicitly. Refunds, disputes, failed renewals and restoration need an agreed policy and tests.

## Files, prices and production inputs still needed

1. Confirmed one-time course price and monthly/annual prices per software product, currencies and applicable commercial terms.
2. Payment provider and verified backend/authentication hosting; existing GitHub Pages alone cannot enforce paid access.
3. The founder's Excel files, versions and instructions. Eight resource manifest entries already identify their course and module. Keep basic workbook functionality fully usable; do not restrict it to sell software.
4. Instructor videos if wanted. Written lessons do not depend on videos and no missing videos are advertised as delivered.
5. Real contact/newsletter delivery endpoints, operating entity, support contact and final privacy/commercial review.
6. Production implementations of software features beyond the explicitly labelled local record demos (cloud saving, collaboration, reminders, advanced reporting, automation and history).

Before going live, test the purchase/refund/renewal matrix, anonymous access, wrong-user access, direct resource URLs, signed-link expiry, cross-product isolation and recovery of saved work. Only then remove the development-preview banners and enable purchase buttons.
