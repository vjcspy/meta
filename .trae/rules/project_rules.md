### **General Rule**

1. You MUST follow working protocol `devdocs\WORKING_PROTOCOL.instructions.md`
2. Whenever a task involves UI development or modification, you **must** use the MCP server’s provided tools and assets (shadcn-ui).

------

### **Planning Rules**

#### When planning a UI build with shadcn-ui, strictly follow this workflow:

1. **Asset Discovery:**
   - Use `list_components` to view all available components.
   - Use `list_blocks` to see all blocks, along with their categories.
2. **Request Mapping:**
   - Analyze the user’s requirements.
   - Map each required UI element to available components or blocks from the lists above.
3. **Block Priority:**
   - **Always prioritize blocks** (`get_block`) for common or complex UI patterns (e.g., dashboards, calendars, login pages).
   - Use individual components (`get_component`) only for smaller or highly specific needs.
4. **Repository Navigation (as needed):**
   - If you need to understand the project’s folder structure or where to place code, use `get_directory_structure` for a hierarchical view of the shadcn/ui repository.

------

### **Implementation Rules**

#### When implementing UI with shadcn-ui:

1. **Always Preview with Demo:**
   - **Before using any component**, you **must** call `get_component_demo(component_name)` to review usage examples, required props, and structural details.
   - For blocks, reviewing their structure via `get_block` also serves as a reference.
2. **Gather Metadata:**
   - If additional context or dependency information is needed, call `get_component_metadata(component_name)`.
3. **Retrieve Source Code:**
   - For a single component, call `get_component(component_name)`.
   - For a composite block, call `get_block(block_name)`.
4. **Integrate and Customize:**
   - Integrate the retrieved code into the application.
   - Adapt and customize with required props, data, and logic to precisely fulfill the user’s request.