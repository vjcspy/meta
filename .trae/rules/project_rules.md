#### **General Rules**

- **Strictly Follow Working Protocol**: Always read and adhere to the protocol in `devdocs\WORKING_PROTOCOL.instructions.md` before any task.

- **Use MCP Server Tools and Assets**: For any UI development or modification involving shadcn-ui, **must** leverage provided tools (e.g., list_components, get_block) and assets. Avoid custom implementations if equivalents exist.

- Shared Modules Best Practices

  - ❌ **NEVER** create duplicate configs or use relative paths (e.g., `../../../shared/module`).
  - ✅ **ALWAYS** import directly from module name (e.g., `import config from 'module-name'`).
  - **Why?**: Shared modules are resolved via Node.js module resolution for consistency and maintainability.

- Plan and Execution Discipline

  - ✅ Read the entire plan before starting.
  - ✅ Update the plan for any significant changes (e.g., new requirements or issues).
  - ✅ Test thoroughly after each step, including edge cases and integration tests.
  - **Error Handling**: If a tool fails (e.g., get_component returns error), log it, suggest alternatives, and update the plan before proceeding.

------

### **Planning Rules for UI Builds with Shadcn-UI**

Follow this strict workflow to map user requirements to shadcn-ui assets. Prioritize efficiency by using blocks for complex patterns.

1. **Asset Discovery**:
   - Call `list_components` to view all available components.
   - Call `list_blocks` to see blocks and their categories (e.g., dashboards, forms).
2. **Requirement Mapping**:
   - Analyze the user's full requirements.
   - Map each UI element to the most suitable component or block from the lists.
   - **Prioritize Blocks**: Always use `get_block` for common/complex patterns (e.g., login pages, calendars) over individual components. Fall back to `get_component` only for specific, simple needs.
   - Consider accessibility (a11y), performance, and responsiveness in mapping (e.g., ensure mobile-friendly blocks).
3. **Repository Navigation (If Needed)**:
   - Use `get_directory_structure` to understand the shadcn-ui repository's hierarchy and decide code placement.
   - Check for dependencies (e.g., Tailwind CSS) and note any versioning requirements.
4. **Plan Checkpoint**: Document the mapping in the plan, including rationale and potential customizations. Confirm with user if ambiguities arise.

------

### **Implementation Rules for UI with Shadcn-UI**

Build on the planning phase. Always preview and test before integration.

1. **Preview and Review**:
   - **Before using any asset**, call `get_component_demo(component_name)` (for components) or review `get_block` structure (for blocks) to understand usage, props, and examples.
   - Gather additional info: Call `get_component_metadata(component_name)` for dependencies, props, or caveats.
2. **Retrieve Source Code**:
   - For single components: Call `get_component(component_name)`.
   - For composite blocks: Call `get_block(block_name)`.
3. **Integrate and Customize**:
   - Integrate the code into the application's appropriate location (based on directory structure).
   - Customize with user-specific props, data, logic, styling (e.g., Tailwind classes), and state management.
   - Ensure best practices: Add a11y attributes (e.g., aria-labels), optimize for performance (e.g., lazy loading), and avoid security risks (e.g., no hardcoding secrets).
   - **Integration Tip**: Use git for changes; avoid overwriting existing files without backups.
4. **Test and Iterate**:
   - Test the integrated UI for functionality, responsiveness, and user requirements.
   - If issues arise, update the plan and iterate (e.g., fallback to custom code only if no asset fits).