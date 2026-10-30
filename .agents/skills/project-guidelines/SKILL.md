---
name: project-guidelines
description: Follow this repository's development and coding conventions when building or editing its Next.js and MUI application.
metadata:
  short-description: Project development guidelines
---

# Project guidelines

Use these conventions when creating or editing this project. Keep changes focused on the requested work, and follow established local patterns where these guidelines do not specify a choice. Add new conventions when the user defines them; do not generalize a one-off example into a project-wide rule.

## UI components

- Prefer Material UI (MUI) components when a suitable component exists.
- When a MUI component meets most of the need, use it as the base and customize its appearance with CSS.
- Build a component from scratch only when MUI does not provide a suitable option.

## Styling

- Use JSX styling props such as `sx` or `style` for small, local adjustments.
- When a component's styles become numerous or complex, move them into a colocated CSS Module (for example, `Component.module.css`) and apply its classes with `className`.
- Keep MUI as the component foundation when applying CSS Modules; use the module to customize the appearance, not to recreate a suitable MUI component.

## JSX and TSX

### Attribute order

Sort explicit attributes in every JSX opening tag using these keys, in order:

1. Attribute name length, shortest first.
2. Attributes without an assigned value before attributes with a value.
3. Attribute name alphabetically, ignoring case.

For example, `required` has no assigned value, while `type="email"` and `onClick={handler}` do. Compare the full attribute name, including prefixes such as `aria-` and `data-`; do not count the value. For attributes tied on the first two keys, use the alphabetical order in key 3.

A spread attribute (such as `{...props}`) has no explicit attribute name, so leave it in its existing position relative to the named attributes. Preserve the file's existing single-line or multiline tag layout where practical. Reordering must not change behavior, values, or unrelated formatting.
