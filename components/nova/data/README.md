# Data components

Tables, filters, charts and progress indicators.

30 components. Every file is a self-contained React + TypeScript + Tailwind
component that renders no purple, reserves its own layout box and ships motion. Icons come
from `lucide-react` only.

```bash
# from the repository root
cp -r components/nova/ <your-app>/components/nova/
cp -r lib/ <your-app>/lib/
```

Then import the theme once, before any component renders:

```css
@import "tailwindcss";
@import "../theme/nova-theme.css";
```

## Components

| Name | Kind | What it does | File |
| --- | --- | --- | --- |
| `data-table` | `table` | Table with sticky header, hover rows and actions. | [DataTable](./data-table.tsx) |
| `table-selectable` | `table` | Row selection with tri-state header checkbox. | [TableSelectable](./table-selectable.tsx) |
| `table-virtualized` | `table` | Virtualized table for ten thousand rows. | [TableVirtualized](./table-virtualized.tsx) |
| `table-expandable` | `table` | Rows that expand into a detail panel. | [TableExpandable](./table-expandable.tsx) |
| `table-sortable` | `table` | Sortable columns with three-state cycling. | [TableSortable](./table-sortable.tsx) |
| `table-pinned` | `table` | First column pinned with a scroll fade mask. | [TablePinned](./table-pinned.tsx) |
| `table-pagination` | `table` | Pagination with page size and range summary. | [TablePagination](./table-pagination.tsx) |
| `table-toolbar` | `table` | Toolbar with search, filters and column control. | [TableToolbar](./table-toolbar.tsx) |
| `table-bulk-bar` | `table` | Bulk action bar for a selection. | [TableBulkBar](./table-bulk-bar.tsx) |
| `columns-manager` | `table` | Column visibility and order manager. | [ColumnsManager](./columns-manager.tsx) |
| `filter-bar` | `data` | Active filter chips with counts and clear-all. | [FilterBar](./filter-bar.tsx) |
| `filter-panel` | `data` | Filter rail with groups, ranges and counts. | [FilterPanel](./filter-panel.tsx) |
| `saved-views` | `data` | Saved views as segmented chips with pinning. | [SavedViews](./saved-views.tsx) |
| `sparkline` | `data` | 24-point inline sparkline with gradient fill. | [Sparkline](./sparkline.tsx) |
| `area-chart` | `data` | Area chart with gradient fill and reference line. | [AreaChart](./area-chart.tsx) |
| `bar-chart` | `data` | Sorted horizontal bars with direct labels. | [BarChart](./bar-chart.tsx) |
| `stacked-bar` | `data` | Stacked bars for composition over time. | [StackedBar](./stacked-bar.tsx) |
| `donut-chart` | `data` | Donut limited to three slices with a center total. | [DonutChart](./donut-chart.tsx) |
| `heatmap` | `data` | Day and hour activity heatmap. | [Heatmap](./heatmap.tsx) |
| `funnel-chart` | `data` | Funnel with step conversion percentages. | [FunnelChart](./funnel-chart.tsx) |
| `bullet-chart` | `data` | Progress against a target with a marker. | [BulletChart](./bullet-chart.tsx) |
| `scatter-plot` | `data` | Scatter with trend line and hover tooltip. | [ScatterPlot](./scatter-plot.tsx) |
| `gauge` | `data` | Radial gauge for a single bounded metric. | [Gauge](./gauge.tsx) |
| `progress-bar` | `data` | Progress with label and percentage. | [ProgressBar](./progress-bar.tsx) |
| `progress-ring` | `data` | Circular progress for compact spaces. | [ProgressRing](./progress-ring.tsx) |
| `stat-compare` | `data` | Two metrics compared with direction emphasis. | [StatCompare](./stat-compare.tsx) |
| `delta-chip` | `data` | Up or down chip with inverted-good support. | [DeltaChip](./delta-chip.tsx) |
| `chart-legend` | `data` | Legend that toggles series visibility. | [ChartLegend](./chart-legend.tsx) |
| `chart-tooltip` | `data` | Glass tooltip with series dot and tabular values. | [ChartTooltip](./chart-tooltip.tsx) |
| `chart-empty` | `data` | Empty chart with axes, grid and a centered hint. | [ChartEmpty](./chart-empty.tsx) |

## Hand-authored files

- [DataTable](./data-table.tsx) - hand-authored in this category.

These files are maintained by hand because they define the contract the rest of
the category follows. Regenerating the folder never overwrites them.

## Data shape

`values: number[]` plus optional `labels: string[]` and `format?: (value: number) => string`.

## Motion contract

Every component in this folder animates, and it animates the same way:

- Bars and lines draw once at 760ms when 40 percent visible; hover raises opacity, never position.
- Rows tint over 120ms on hover; tables never stagger on entry, and bulk actions slide up 8px.

Full ladder, easing and reduced-motion rules: spec sections 3.5, 3.13, 7.5 in
[`design.md`](https://raw.githubusercontent.com/Pedro21062014/nova-design/main/design.md).

## Colors

Import `theme/nova-theme.css` first. It remaps the shadcn semantic variables, so `bg-primary`
is indigo `#7c8cff`, not the default purple, and `bg-accent` is a warm neutral instead of a
fifth accent. Never hardcode `violet`, `purple`, `fuchsia`, `indigo-500` or `oklch(0.6 0.25 ...)`.

## Anti-patterns

- Pie charts with more than three slices; use bars instead.
- Legends that repeat the axis labels.
- Zero baselines removed from bar charts.

## Related

- [Category index](../README.md)
- [Frontend templates](../../templates/README.md)
- [Full spec](https://raw.githubusercontent.com/Pedro21062014/nova-design/main/design.md)
