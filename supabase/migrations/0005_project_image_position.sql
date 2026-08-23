-- Let the admin choose which part of a mockup stays visible.
-- Safe to re-run.
--
-- Project cards crop to 16:9 with object-cover, so a tall or wide screenshot
-- loses whatever falls outside the frame - and object-position defaulted to
-- centre, which is the wrong choice for a mockup whose logo sits at the top.
--
-- Stored as a CSS object-position keyword pair rather than a Tailwind class:
-- Tailwind's JIT only sees classes present in the source, so a class name
-- coming out of the database would be stripped from the stylesheet and
-- silently do nothing. The component applies this as an inline style.

alter table public.projects
  add column if not exists image_position text not null default 'center';

-- Keep it to the nine keyword combinations the picker offers, so nothing
-- arbitrary can reach the style attribute.
alter table public.projects
  drop constraint if exists projects_image_position_check;

alter table public.projects
  add constraint projects_image_position_check
  check (image_position in (
    'left top',    'top',    'right top',
    'left',        'center', 'right',
    'left bottom', 'bottom', 'right bottom'
  ));
