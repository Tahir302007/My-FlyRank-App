# 📓 Accessibility & Component Analysis: Custom vs. Shadcn/ui

After building the Custom Modal, Tabs, and Disclosure components and comparing them to Shadcn/ui (Radix Primitives), here are the core gaps identified:

### 1. Focus Restoring and Portal Porting (Modal Dialog)
*   **What I Missed:** In my custom modal, the modal is rendered inline within the DOM tree. If the parent container has `overflow: hidden`, the modal can clip. 
*   **How Shadcn Handles It:** Shadcn utilizes `Radix Portal` to render the dialog at the root of the document (`<body>` level) to prevent any CSS layout issues. Additionally, Shadcn handles nested dialogs flawlessly, ensuring focus is stacked and returned correctly to multiple layers of triggers.

### 2. Multi-Directional Navigation & Layout Constraints (Tabs)
*   **What I Missed:** My custom tabs only listen for `ArrowRight` and `ArrowLeft` keys assuming a standard horizontal orientation. It doesn't adjust automatically for vertical layouts.
*   **How Shadcn Handles It:** Shadcn checks the active layout orientation (horizontal or vertical) and automatically maps the correct navigation keys (e.g., using `ArrowUp`/`ArrowDown` for vertical tab lists). It also supports both manual tab activation (clicking/pressing Enter) and automatic activation (just focusing the tab with arrows).