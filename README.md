# Christmas gift budget calculator (budget per person, weekly savings)

Free, single-file browser tool: enter one Christmas total and a weight per person (3 for a partner or child, 1 for a colleague), and it splits the total in round amounts that add up exactly (largest remainder). Add non-gift costs (dinner, decorations, cards, postage) at a fixed amount, track spent against planned per line, and see what is still to pay and what to set aside each week until your last shopping day. Print and CSV export.

Live: https://ricco020.github.io/christmas-gift-budget-calculator/

Printable gift list with a budget per person: [Christmas holiday planner](https://tidysheets.shop/p/christmas-holiday-planner).

MIT licence. No network calls, the list stays in localStorage. Arithmetic in core.js, tested against an independent Python implementation (300 random plans, 1 947 lines, 0 mismatch on shares, totals, still to pay, weeks and weekly amount).
